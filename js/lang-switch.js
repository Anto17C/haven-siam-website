// Language dropdown: tap to open on touch screens, close on outside tap or Escape.
(function () {
  var box = document.querySelector('.lang-switch');
  if (!box) return;
  var toggle = box.querySelector('.lang-toggle');
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', 'false');
  function setOpen(open) {
    box.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!box.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!box.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
