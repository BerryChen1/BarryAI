import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import { transformSync } from 'esbuild';

// Run the actual hook effects against a small DOM/event model. These tests cover
// focus and inert ownership, not real-browser rendering or layout.
function harness() {
  const listeners = new Map();
  const frames = new Map();
  let frameId = 0;
  let effect;
  const document = {
    fullscreenElement: null,
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
    },
    removeEventListener(type, callback) { listeners.get(type)?.delete(callback); },
    emit(type, event) {
      for (const callback of [...(listeners.get(type) ?? [])]) callback(event);
    },
  };
  class Element {
    static DOCUMENT_POSITION_FOLLOWING = 4;
    constructor(name, { focusable = false, close = false, inert = false } = {}) {
      Object.assign(this, { name, focusable, close, inert, parentElement: null, children: [], focusCalls: 0 });
    }
    append(child) { child.parentElement = this; this.children.push(child); return child; }
    remove() {
      this.parentElement.children = this.parentElement.children.filter(child => child !== this);
      this.parentElement = null;
    }
    get isConnected() { return this === document.body || Boolean(this.parentElement?.isConnected); }
    contains(other) { return this === other || this.children.some(child => child.contains(other)); }
    closest() { return this.inert ? this : this.parentElement?.closest() ?? null; }
    getClientRects() { return this.isConnected ? [{}] : []; }
    descendants() { return this.children.flatMap(child => [child, ...child.descendants()]); }
    querySelector() { return this.descendants().find(child => child.close) ?? null; }
    querySelectorAll() { return this.descendants().filter(child => child.focusable); }
    compareDocumentPosition(other) {
      const order = document.body.descendants();
      return order.indexOf(other) > order.indexOf(this) ? Element.DOCUMENT_POSITION_FOLLOWING : 2;
    }
    focus() {
      if (!this.isConnected || this.closest('[inert]')) return;
      this.focusCalls += 1;
      document.activeElement = this;
      document.emit('focusin', { target: this });
    }
  }
  document.body = new Element('body');
  document.activeElement = document.body;
  const root = document.body.append(new Element('root'));
  const home = root.append(new Element('home'));
  const opener = home.append(new Element('opener', { focusable: true }));
  const preserved = root.append(new Element('already-inert', { inert: true }));
  opener.focus();

  const module = { exports: {} };
  const code = transformSync(readFileSync(new URL('../src/utils/useModalFocus.ts', import.meta.url), 'utf8'), { loader: 'ts', format: 'cjs' }).code;
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: () => ({ useRef: value => ({ current: value }), useEffect: callback => { effect = callback; } }),
    document, HTMLElement: Element, Node: Element,
    requestAnimationFrame(callback) { const id = ++frameId; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  function dialog(name, parent = root) {
    const node = parent.append(new Element(name));
    const close = node.append(new Element(`${name}-close`, { focusable: true, close: true }));
    const last = node.append(new Element(`${name}-last`, { focusable: true }));
    return { node, close, last };
  }
  function mount(item, priority = 300) {
    const calls = { close: 0 };
    module.exports.useModalFocus({ current: item.node }, true, () => { calls.close += 1; }, priority);
    const cleanup = effect();
    return { calls, cleanup };
  }
  function flush() {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback());
  }
  function key(key, shiftKey = false) {
    const event = { key, shiftKey, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() {} };
    document.emit('keydown', event);
    return event;
  }
  return { document, root, home, opener, preserved, dialog, mount, flush, key };
}

test('restored project and lightbox stay usable when child effect mounts before parent', () => {
  const page = harness();
  const project = page.dialog('project');
  const lightbox = page.dialog('lightbox');
  const inner = page.mount(lightbox, 400);
  const outer = page.mount(project);
  page.flush();
  assert.equal(project.node.inert, true);
  assert.equal(lightbox.node.inert, false);
  assert.equal(page.document.activeElement, lightbox.close);
  page.key('Escape');
  assert.equal(inner.calls.close, 1);
  assert.equal(outer.calls.close, 0);

  inner.cleanup();
  lightbox.node.remove();
  assert.equal(project.node.inert, false);
  assert.equal(page.document.activeElement, project.close);
  outer.cleanup();
  assert.equal(page.home.inert, false);
  assert.equal(page.preserved.inert, true);
  assert.equal(page.document.activeElement, page.opener);
});

test('rapid double Back restores homepage after delayed lightbox exit cleanup', () => {
  const page = harness();
  const project = page.dialog('project');
  const outer = page.mount(project);
  page.flush();
  const lightbox = page.dialog('lightbox');
  const inner = page.mount(lightbox, 400);
  page.flush();
  outer.cleanup(); // App closes now while AnimatePresence retains the lightbox.
  project.node.remove();
  assert.equal(page.home.inert, true);
  assert.equal(page.document.activeElement, lightbox.close);
  inner.cleanup(); // The child unmounts after its exit animation.
  lightbox.node.remove();
  assert.equal(page.home.inert, false);
  assert.equal(page.preserved.inert, true);
  assert.equal(page.document.activeElement, page.opener);
});

test('nested DOM dialog alone owns Escape and Tab; lower cleanup never steals focus', () => {
  const page = harness();
  const project = page.dialog('project');
  const outer = page.mount(project);
  page.flush();
  const lightbox = page.dialog('lightbox', project.node);
  const inner = page.mount(lightbox, 400);
  page.flush();
  lightbox.last.focus();
  page.key('Tab');
  assert.equal(page.document.activeElement, lightbox.close);
  page.key('Tab', true);
  assert.equal(page.document.activeElement, lightbox.last);
  page.key('Escape');
  assert.equal(inner.calls.close, 1);
  assert.equal(outer.calls.close, 0);
  outer.cleanup();
  assert.equal(page.document.activeElement, lightbox.last);
  inner.cleanup();
  assert.equal(page.home.inert, false);
  assert.equal(page.preserved.inert, true);
  assert.equal(page.document.activeElement, page.opener);
});

test('StrictMode setup-cleanup-setup cancels stale focus frames and preserves original inert', () => {
  const page = harness();
  const project = page.dialog('project');
  const first = page.mount(project);
  first.cleanup();
  const second = page.mount(project);
  page.flush();
  assert.equal(page.document.activeElement, project.close);
  assert.equal(project.close.focusCalls, 1);
  assert.equal(page.home.inert, true);
  second.cleanup();
  assert.equal(page.home.inert, false);
  assert.equal(page.preserved.inert, true);
  assert.equal(page.document.activeElement, page.opener);
});

test('closing a lightbox returns focus to the prior control inside the still-open project', () => {
  const page = harness();
  const project = page.dialog('project');
  const outer = page.mount(project);
  page.flush();
  project.last.focus();
  const lightbox = page.dialog('lightbox');
  const inner = page.mount(lightbox, 400);
  page.flush();
  inner.cleanup();
  lightbox.node.remove();
  assert.equal(page.document.activeElement, project.last);
  outer.cleanup();
  assert.equal(page.document.activeElement, page.opener);
});

test('removing the whole modal DOM before passive cleanups still restores page focus', () => {
  const page = harness();
  const project = page.dialog('project');
  const outer = page.mount(project);
  page.flush();
  const lightbox = page.dialog('lightbox', project.node);
  const inner = page.mount(lightbox, 400);
  page.flush();
  project.node.remove();
  inner.cleanup();
  outer.cleanup();
  assert.equal(page.home.inert, false);
  assert.equal(page.preserved.inert, true);
  assert.equal(page.document.activeElement, page.opener);
});
