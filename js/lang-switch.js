// Language dropdown. One state model drives both the visible menu and aria-expanded:
// open = (tapped open) or (hovered / focused and not dismissed). Escape, a second tap
// or an outside tap closes it; leaving the control re-arms hover and focus.
(function () {
  var box = document.querySelector('.lang-switch');
  if (!box) return;
  var toggle = box.querySelector('.lang-toggle');
  if (!toggle) return;

  var hover = false;
  var dismissed = false;
  var small = window.matchMedia ? window.matchMedia('(max-width: 600px), (max-width: 960px) and (orientation: landscape) and (max-height: 500px)') : { matches: false };

  function isOpen() {
    if (box.classList.contains('open')) return true;
    if (small.matches || dismissed) return false;
    return hover || box.contains(document.activeElement);
  }
  function sync() {
    box.classList.toggle('lang-dismissed', dismissed);
    toggle.setAttribute('aria-expanded', isOpen() ? 'true' : 'false');
  }
  function close(returnFocus) {
    box.classList.remove('open');
    dismissed = true;
    if (returnFocus) toggle.focus();
    sync();
  }
  function rearm() {
    dismissed = false;
    sync();
  }

  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isOpen()) {
      close(false);
    } else {
      dismissed = false;
      box.classList.add('open');
      sync();
    }
  });
  box.addEventListener('mouseenter', function () { hover = true; sync(); });
  box.addEventListener('mouseleave', function () { hover = false; box.classList.remove('open'); rearm(); });
  box.addEventListener('focusin', sync);
  box.addEventListener('focusout', function (e) {
    if (!e.relatedTarget || !box.contains(e.relatedTarget)) {
      box.classList.remove('open');
      rearm();
    }
  });
  document.addEventListener('click', function (e) {
    if (!box.contains(e.target) && (box.classList.contains('open') || dismissed)) {
      box.classList.remove('open');
      rearm();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) close(true);
  });
  if (small.addEventListener) small.addEventListener('change', function () { box.classList.remove('open'); rearm(); });
})();
