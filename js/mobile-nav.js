// Phone menu: only the top-level items show; items with a submenu have a chevron button that opens it.
// Collapses every submenu when the menu closes, on Escape, and when the layout leaves the phone width.
(function () {
  var links = document.getElementById('navLinks');
  if (!links) return;
  var items = Array.prototype.slice.call(links.querySelectorAll('.nav-dropdown'));
  if (!items.length) return;

  function setOpen(item, open) {
    item.classList.toggle('submenu-open', open);
    var button = item.querySelector('.nav-sub-toggle');
    if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeAll() {
    items.forEach(function (item) { setOpen(item, false); });
  }

  items.forEach(function (item) {
    var button = item.querySelector('.nav-sub-toggle');
    if (!button) return;
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(item, button.getAttribute('aria-expanded') !== 'true');
    });
  });

  // The hamburger toggles the "open" class on the menu; reset the submenus whenever it closes.
  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (!links.classList.contains('open')) closeAll();
    }).observe(links, { attributes: true, attributeFilter: ['class'] });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openItem = items.filter(function (item) { return item.classList.contains('submenu-open'); })[0];
    if (!openItem) return;
    setOpen(openItem, false);
    var button = openItem.querySelector('.nav-sub-toggle');
    if (button) button.focus();
  });

  var phone = window.matchMedia ? window.matchMedia('(max-width: 600px), (max-width: 960px) and (orientation: landscape) and (max-height: 500px)') : null;
  if (phone) {
    var reset = function () { closeAll(); };
    if (phone.addEventListener) phone.addEventListener('change', reset); else if (phone.addListener) phone.addListener(reset);
  }
})();
