/* 城市生活派对 deck — navigation & interactions */
(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var total = slides.length;
  var cur = 0;
  var progress = document.getElementById('progress');
  var curNum = document.getElementById('curNum');
  var hudChap = document.getElementById('hudChap');
  var dotsWrap = document.getElementById('dots');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var toast = document.getElementById('toast');
  var video = document.getElementById('kv');
  var vwrap = document.getElementById('vwrap');
  var vplay = document.getElementById('vplay');

  /* ---------- dots ---------- */
  slides.forEach(function (s, i) {
    var d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' on' : '');
    d.setAttribute('aria-label', '第 ' + (i + 1) + ' 页');
    d.addEventListener('click', function () { go(i); });
    dotsWrap.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  /* ---------- navigation ---------- */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function go(n, skipHash) {
    if (!skipHash && isModalOpen()) return;
    n = Math.max(0, Math.min(total - 1, n));
    // 按钮位置：封面/致谢页上移（先于早退判断执行）
    document.body.classList.toggle(
      'hud-raised',
      slides[n].classList.contains('s-cover') || slides[n].classList.contains('s-thanks')
    );
    if (n === cur && slides[n].classList.contains('active')) return;
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === n);
      s.classList.toggle('passed', i < n);
    });
    // pause video when leaving its slide
    if (video && cur === 6 && n !== 6) {
      video.pause();
    }
    cur = n;
    progress.style.width = ((cur + 1) / total * 100) + '%';
    curNum.textContent = pad(cur + 1);
    hudChap.textContent = slides[cur].dataset.chap || '';
    dots.forEach(function (d, i) { d.classList.toggle('on', i === cur); });
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur === total - 1;
    // reset inner scroll (mobile)
    slides[cur].scrollTop = 0;
    if (!skipHash) {
      try {
        history.replaceState(Object.assign({}, history.state, { redtestSlide: cur }), '', '#/' + (cur + 1));
      } catch (e) {}
    }
  }

  function next() { go(cur + 1); }
  function prev() { go(cur - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  var startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.addEventListener('click', next);
  var restartBtn = document.getElementById('restartBtn');
  if (restartBtn) restartBtn.addEventListener('click', function () { go(0); });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    if (isModalOpen()) {
      if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
      return;
    }
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(total - 1); break;
      case 'f': case 'F': toggleFs(); break;
      case 'Escape': closeModal(); break;
    }
  });

  /* ---------- wheel (uniform page flip on every slide) ---------- */
  var wheelLock = 0, wheelAcc = 0;
  document.addEventListener('wheel', function (e) {
    if (isModalOpen()) return;
    var now = Date.now();
    if (now < wheelLock) { e.preventDefault(); return; }
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) > 70) {
      var dir = wheelAcc > 0 ? 1 : -1;
      wheelLock = now + 1100;
      wheelAcc = 0;
      dir > 0 ? next() : prev();
    }
  }, { passive: false });

  /* ---------- touch swipe ---------- */
  var tx = 0, ty = 0;
  document.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (isModalOpen()) return;
    if (e.changedTouches.length !== 1) return;
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

  /* ---------- hash routing ---------- */
  function fromHash() {
    var m = location.hash.match(/^#\/(\d+)/);
    if (m) { var n = parseInt(m[1], 10) - 1; if (n >= 0 && n < total) return n; }
    return 0;
  }
  window.addEventListener('hashchange', function () {
    var n = fromHash();
    if (n !== cur) go(n, true);
  });
  window.addEventListener('popstate', function () {
    modalClosing = false;
    go(fromHash(), true);
    syncModalWithHistory();
  });

  /* ---------- fullscreen ---------- */
  var fsBtn = document.getElementById('fsBtn');
  function toggleFs() {
    if (document.fullscreenElement) {
      document.exitFullscreen && document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    }
  }
  fsBtn.addEventListener('click', toggleFs);

  /* ---------- video ---------- */
  function setPlaying(p) {
    if (vwrap) vwrap.classList.toggle('playing', p);
  }
  function playVideo(target, onFailure) {
    if (!target) return;
    var playback = target.play();
    if (playback && playback.catch) playback.catch(function () {
      if (onFailure) onFailure();
    });
  }
  if (video) {
    vplay.addEventListener('click', function () { playVideo(video); });
    video.addEventListener('click', function () {
      video.paused ? playVideo(video) : video.pause();
    });
    video.addEventListener('play', function () { setPlaying(true); });
    video.addEventListener('pause', function () { setPlaying(false); });
    video.addEventListener('ended', function () { setPlaying(false); });
  }

  /* ---------- palette copy ---------- */
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1500);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('已复制 ' + text);
      }).catch(function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;left:-999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('已复制 ' + text);
    } catch (e) {
      showToast(text);
    }
    document.body.removeChild(ta);
  }
  document.querySelectorAll('.swatch').forEach(function (sw) {
    sw.addEventListener('click', function () { copyText(sw.dataset.hex); });
  });

  /* ---------- cover video modal ---------- */
  var vmodal = document.getElementById('vmodal');
  var coverVideo = document.getElementById('coverVideo');
  var coverVideoBtn = document.getElementById('coverVideoBtn');
  var vmodalMask = document.getElementById('vmodalMask');
  var vmodalClose = document.getElementById('vmodalClose');
  var modalClosing = false;

  function isModalOpen() {
    return !!vmodal && vmodal.classList.contains('open');
  }
  function hideModal() {
    if (!isModalOpen()) return;
    vmodal.classList.remove('open');
    vmodal.setAttribute('aria-hidden', 'true');
    if (coverVideo) coverVideo.pause();
    if (coverVideoBtn) coverVideoBtn.focus({ preventScroll: true });
  }
  function showModal(autoplay) {
    if (!vmodal) return;
    vmodal.classList.add('open');
    vmodal.setAttribute('aria-hidden', 'false');
    if (vmodalClose) vmodalClose.focus({ preventScroll: true });
    if (coverVideo) {
      // Forward/reload restores a paused player with controls: history traversal
      // does not grant user activation for unmuted autoplay.
      coverVideo.controls = !autoplay;
      if (autoplay) playVideo(coverVideo, function () { coverVideo.controls = true; });
    }
  }
  function closeModal() {
    if (!isModalOpen() || modalClosing) return;
    hideModal();
    if (history.state && history.state.redtestVideoModal) {
      modalClosing = true;
      history.back();
    }
  }
  function openModal() {
    if (!vmodal || isModalOpen() || modalClosing) return;
    history.pushState(Object.assign({}, history.state, {
      redtestVideoModal: true,
      redtestSlide: cur
    }), '', location.href);
    showModal(true);
  }
  function syncModalWithHistory() {
    if (history.state && history.state.redtestVideoModal) showModal(false);
    else hideModal();
  }
  if (coverVideoBtn) coverVideoBtn.addEventListener('click', openModal);
  if (vmodalMask) vmodalMask.addEventListener('click', closeModal);
  if (vmodalClose) vmodalClose.addEventListener('click', closeModal);
  if (coverVideo) coverVideo.addEventListener('click', function () {
    if (!coverVideo.controls) coverVideo.paused ? playVideo(coverVideo) : coverVideo.pause();
  });

  /* ---------- init ---------- */
  if (new URLSearchParams(location.search).get('export') === '1') {
    document.body.classList.add('export');
  }
  go(fromHash(), true);
  syncModalWithHistory();
})();
