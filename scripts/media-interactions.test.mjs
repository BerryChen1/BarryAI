import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import { transformSync } from 'esbuild';

// These are code-level event tests, not a replacement for real-browser UI QA.
function element(classes = []) {
  const names = new Set(classes);
  const handlers = new Map();
  return {
    style: {}, dataset: {}, children: [], paused: true, playCalls: 0, pauseCalls: 0,
    classList: {
      contains: name => names.has(name),
      add: name => names.add(name),
      remove: name => names.delete(name),
      toggle(name, value) {
        const next = value ?? !names.has(name);
        next ? names.add(name) : names.delete(name);
      },
    },
    addEventListener(name, fn) { handlers.set(name, fn); },
    removeEventListener(name) { handlers.delete(name); },
    hasListener(name) { return handlers.has(name); },
    emit(name, event = {}) { handlers.get(name)?.(event); },
    setAttribute(name, value) { this[name] = value; },
    appendChild(child) { this.children.push(child); },
    focus() {},
    pause() { this.paused = true; this.pauseCalls += 1; },
    play() { this.paused = false; this.playCalls += 1; return Promise.resolve(); },
  };
}

function deckHarness() {
  const slides = Array.from({ length: 12 }, (_, index) => element(index ? [] : ['s-cover']));
  const ids = Object.fromEntries([
    'progress', 'curNum', 'hudChap', 'dots', 'prevBtn', 'nextBtn', 'toast', 'kv',
    'vwrap', 'vplay', 'startBtn', 'restartBtn', 'fsBtn', 'vmodal', 'coverVideo',
    'coverVideoBtn', 'vmodalMask', 'vmodalClose',
  ].map(name => [name, element()]));
  const document = Object.assign(element(), {
    body: element(),
    querySelectorAll: selector => selector === '.slide' ? slides : [],
    getElementById: id => ids[id],
    createElement: () => element(),
  });
  const window = element();
  const location = { hash: '#/1', href: 'http://localhost/projects/redtest/index.html#/1', search: '' };
  const entries = [{ state: { unrelated: 'preserved' }, hash: '#/1' }];
  let index = 0;
  function navigate(next) {
    index = next;
    location.hash = entries[index].hash;
    window.emit('popstate', { state: entries[index].state });
  }
  const history = {
    get state() { return entries[index].state; },
    pushState(state, unused, url) {
      entries.splice(index + 1);
      entries.push({ state, hash: new URL(url, location.href).hash });
      index += 1;
    },
    replaceState(state, unused, url) {
      const hash = new URL(url, location.href).hash;
      entries[index] = { state, hash };
      location.hash = hash;
      location.href = new URL(url, location.href).href;
    },
    back() { if (index) navigate(index - 1); },
    forward() { if (index + 1 < entries.length) navigate(index + 1); },
  };
  vm.runInNewContext(readFileSync(new URL('../public/projects/redtest/deck.js', import.meta.url), 'utf8'), {
    document, window, history, location, navigator: {}, URLSearchParams, setTimeout, clearTimeout,
  });
  return { ids, document, history, entries, slides, location, get index() { return index; } };
}

test('deck modal owns one history step; Back closes and Forward restores paused', () => {
  const deck = deckHarness();
  deck.ids.coverVideoBtn.emit('click');
  deck.ids.coverVideoBtn.emit('click');
  assert.equal(deck.entries.length, 2);
  assert.equal(deck.history.state.unrelated, 'preserved');
  assert.equal(deck.ids.coverVideo.playCalls, 1);
  assert.equal(deck.ids.vmodal.classList.contains('open'), true);

  deck.history.back();
  assert.equal(deck.index, 0);
  assert.equal(deck.ids.vmodal.classList.contains('open'), false);
  assert.equal(deck.ids.coverVideo.paused, true);
  assert.equal(deck.slides[0].classList.contains('active'), true);

  deck.history.forward();
  assert.equal(deck.ids.vmodal.classList.contains('open'), true);
  assert.equal(deck.ids.coverVideo.playCalls, 1);
  assert.equal(deck.ids.coverVideo.controls, true);
  deck.ids.vmodalClose.emit('click');
  assert.equal(deck.index, 0);
  assert.equal(deck.ids.vmodal.classList.contains('open'), false);
});

test('deck navigation preserves unrelated history and does not move behind the modal', () => {
  const deck = deckHarness();
  deck.ids.nextBtn.emit('click');
  assert.equal(deck.history.state.unrelated, 'preserved');
  assert.equal(deck.history.state.redtestSlide, 1);
  assert.equal(deck.entries.length, 1);
  deck.ids.prevBtn.emit('click');
  deck.ids.coverVideoBtn.emit('click');
  deck.document.emit('keydown', { key: 'ArrowRight', preventDefault() {} });
  deck.document.emit('wheel', { deltaY: 100, preventDefault() {} });
  assert.equal(deck.slides[0].classList.contains('active'), true);
  assert.equal(deck.history.state.redtestVideoModal, true);
  deck.document.emit('keydown', { key: 'Escape', preventDefault() {} });
  assert.equal(deck.index, 0);
});

function playerHarness() {
  let stateIndex = 0;
  let refIndex = 0;
  let firstRender = true;
  const states = [];
  const refs = [];
  const effects = [];
  const timers = new Map();
  let timerId = 0;
  let observer;
  const react = {
    createElement(type, props, ...children) { return { type, props: { ...props, children } }; },
    useRef(initial) { const i = refIndex++; return refs[i] ??= { current: initial }; },
    useState(initial) {
      const i = stateIndex++;
      if (firstRender) states[i] = initial;
      return [states[i], value => { states[i] = value; }];
    },
    useEffect(fn) { if (firstRender) effects.push(fn); },
  };
  const document = Object.assign(element(), { fullscreenElement: null, hidden: false });
  const code = transformSync(readFileSync(new URL('../src/components/CustomVideoPlayer.tsx', import.meta.url), 'utf8'), {
    loader: 'tsx', format: 'cjs', jsx: 'transform',
  }).code;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: name => name === 'react' ? react : {},
    document, console,
    setTimeout(fn) { const id = ++timerId; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
    IntersectionObserver: class {
      constructor(callback, options) { this.callback = callback; this.options = options; observer = this; }
      observe() {}
      disconnect() {}
    },
  });
  function render() {
    stateIndex = 0;
    refIndex = 0;
    const tree = module.exports.CustomVideoPlayer({ src: '/test.mp4' });
    firstRender = false;
    return tree.props.children.find(child => child?.type === 'video').props;
  }
  const initial = render();
  const video = Object.assign(element(), { getAttribute: () => '/test.mp4' });
  const container = Object.assign(element(), {
    fullscreenCalls: 0,
    requestFullscreen() { this.fullscreenCalls += 1; return Promise.resolve(); },
  });
  refs[0].current = video;
  refs[1].current = container;
  const cleanups = effects.map(effect => effect()).filter(Boolean);
  return { initial, render, video, container, document, timers, cleanups, get observer() { return observer; } };
}

test('player double-click dispatches fullscreen once and cancels the pending single click', async () => {
  const player = playerHarness();
  player.initial.onClick({ detail: 1 });
  player.initial.onClick({ detail: 2 });
  player.initial.onDoubleClick();
  assert.equal(player.container.fullscreenCalls, 1);
  assert.equal(player.timers.size, 0);
  assert.equal(player.video.playCalls, 0);
  await Promise.resolve();
  player.initial.onClick({ detail: 1 });
  assert.equal(player.timers.size, 1);
  player.cleanups.forEach(cleanup => cleanup());
  assert.equal(player.timers.size, 0);
});

test('player loads only metadata near viewport and pauses offscreen or in a hidden tab', () => {
  const player = playerHarness();
  assert.equal(player.initial.src, undefined);
  assert.equal(player.initial.preload, 'none');
  assert.equal(player.observer.options.rootMargin, '200px 0px');
  player.observer.callback([{ isIntersecting: true }]);
  const loaded = player.render();
  assert.equal(loaded.src, '/test.mp4');
  assert.equal(loaded.preload, 'metadata');
  player.video.paused = false;
  player.observer.callback([{ isIntersecting: false }]);
  assert.equal(player.video.paused, true);
  player.video.paused = false;
  player.document.hidden = true;
  player.document.emit('visibilitychange');
  assert.equal(player.video.pauseCalls, 2);
});

function loopHarness({ paused = false, deferPlayback = false } = {}) {
  const hooks = [];
  const pendingPlayback = [];
  let cursor = 0;
  let dirty = true;
  let effects = [];
  let observer;
  let output;
  let props = { src: '/loop.mp4', paused };
  const document = Object.assign(element(), { visibilityState: 'visible' });
  const video = Object.assign(element(), {
    getAttribute: name => output?.props[name] ?? null,
    play() {
      this.playCalls += 1;
      if (deferPlayback) return new Promise(resolve => {
        pendingPlayback.push(() => { this.paused = false; resolve(); });
      });
      this.paused = false;
      return Promise.resolve();
    },
  });
  const react = {
    useRef(initial) { return hooks[cursor++] ??= { current: initial }; },
    useState(initial) {
      const index = cursor++;
      const state = hooks[index] ??= { value: typeof initial === 'function' ? initial() : initial };
      return [state.value, next => {
        const value = typeof next === 'function' ? next(state.value) : next;
        if (!Object.is(value, state.value)) { state.value = value; dirty = true; }
      }];
    },
    useEffect(callback, deps) {
      const index = cursor++;
      const previous = hooks[index];
      if (!previous || deps.some((value, i) => !Object.is(value, previous.deps[i]))) {
        effects.push(() => {
          previous?.cleanup?.();
          hooks[index] = { deps, cleanup: callback() };
        });
      }
    },
  };
  class IntersectionObserver {
    disconnectCalls = 0;
    constructor(callback) { this.callback = callback; observer = this; }
    observe() {}
    disconnect() { this.disconnectCalls += 1; }
  }
  const module = { exports: {} };
  const code = transformSync(readFileSync(new URL('../src/components/VisibleLoopVideo.tsx', import.meta.url), 'utf8'), {
    loader: 'tsx', format: 'cjs', jsx: 'automatic',
  }).code;
  vm.runInNewContext(code, {
    module, exports: module.exports, document, window: { IntersectionObserver }, IntersectionObserver,
    require: name => name === 'react' ? react : { jsx: (type, attributes) => ({ type, props: attributes }) },
  });
  function flush() {
    let renderCount = 0;
    while (dirty) {
      assert.ok(++renderCount < 20, 'effects should settle without a render loop');
      dirty = false;
      cursor = 0;
      effects = [];
      output = module.exports.VisibleLoopVideo(props);
      output.props.ref.current = video;
      effects.forEach(effect => effect());
    }
  }
  flush();
  return {
    video, pendingPlayback, document,
    get observer() { return observer; },
    get output() { return output.props; },
    setInView(value) {
      observer.callback([{ isIntersecting: value, intersectionRatio: value ? 1 : 0 }]);
      flush();
    },
    setHidden(value) {
      document.visibilityState = value ? 'hidden' : 'visible';
      document.emit('visibilitychange');
      flush();
    },
    setPaused(value) { props = { ...props, paused: value }; dirty = true; flush(); },
    canPlay() { output.props.onCanPlay(); },
    cleanup() {
      output.props.ref.current = null;
      hooks.forEach(hook => hook.cleanup?.());
    },
  };
}

test('homepage loop attaches its source on first visibility, then pauses and resumes with visibility', () => {
  const loop = loopHarness();
  assert.equal(loop.output.src, undefined);
  assert.equal(loop.output.preload, 'none');
  assert.equal(loop.video.playCalls, 0);
  loop.setInView(true);
  assert.equal(loop.output.src, '/loop.mp4');
  assert.equal(loop.video.playCalls, 1);
  assert.equal(loop.video.paused, false);
  loop.setInView(false);
  assert.equal(loop.video.paused, true);
  loop.canPlay();
  assert.equal(loop.video.playCalls, 1);
  loop.setInView(true);
  assert.equal(loop.video.playCalls, 2);
  loop.setHidden(true);
  assert.equal(loop.video.paused, true);
  loop.canPlay();
  assert.equal(loop.video.playCalls, 2);
  loop.setHidden(false);
  assert.equal(loop.video.playCalls, 3);
  loop.cleanup();
});

test('homepage loop stays unloaded or paused under an overlay until the overlay closes', () => {
  const loop = loopHarness({ paused: true });
  loop.setInView(true);
  assert.equal(loop.output.src, undefined);
  assert.equal(loop.video.playCalls, 0);
  loop.setPaused(false);
  assert.equal(loop.output.src, '/loop.mp4');
  assert.equal(loop.video.playCalls, 1);
  loop.setPaused(true);
  assert.equal(loop.video.paused, true);
  loop.canPlay();
  loop.setInView(false);
  loop.setInView(true);
  loop.setHidden(true);
  loop.setHidden(false);
  assert.equal(loop.video.playCalls, 1);
  loop.setPaused(false);
  assert.equal(loop.video.playCalls, 2);
  assert.equal(loop.video.paused, false);
  loop.cleanup();
});

test('homepage loop cancels a late playback start after leaving the viewport', async () => {
  const loop = loopHarness({ deferPlayback: true });
  loop.setInView(true);
  assert.equal(loop.pendingPlayback.length, 1);
  loop.setInView(false);
  const pausesBeforeResolution = loop.video.pauseCalls;
  loop.pendingPlayback.shift()();
  await Promise.resolve();
  assert.equal(loop.video.paused, true);
  assert.equal(loop.video.pauseCalls, pausesBeforeResolution + 1);
  loop.cleanup();
});

test('homepage loop unmount pauses playback and detaches visibility observers', () => {
  const loop = loopHarness();
  loop.setInView(true);
  assert.equal(loop.video.paused, false);
  assert.equal(loop.document.hasListener('visibilitychange'), true);
  loop.cleanup();
  assert.equal(loop.video.paused, true);
  assert.equal(loop.document.hasListener('visibilitychange'), false);
  assert.equal(loop.observer.disconnectCalls, 1);
});

test('homepage loop unmount cancels a pending playback start after refs are detached', async () => {
  const loop = loopHarness({ deferPlayback: true });
  loop.setInView(true);
  assert.equal(loop.pendingPlayback.length, 1);
  loop.cleanup();
  const pausesBeforeResolution = loop.video.pauseCalls;
  loop.pendingPlayback.shift()();
  await Promise.resolve();
  assert.equal(loop.video.paused, true);
  assert.equal(loop.video.pauseCalls, pausesBeforeResolution + 1);
});
