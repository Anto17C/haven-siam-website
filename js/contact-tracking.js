// Pushes a dataLayer event whenever a visitor clicks a WhatsApp, LINE, phone or email link.
// GTM (GTM-KLZZW3B8) turns these into GA4 events; no Measurement ID is needed here.
document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href]');
  if (!link) return;
  var href = link.getAttribute('href');
  var method = null;
  if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) method = 'whatsapp';
  else if (href.indexOf('line.me') !== -1) method = 'line';
  else if (href.indexOf('tel:') === 0) method = 'phone';
  else if (href.indexOf('mailto:') === 0) method = 'email';
  if (!method) return;

  // Where on the page the link sits, based on Haven Siam's own markup.
  function locationFor(el) {
    if (el.closest('.sticky-whatsapp, .sticky-line')) return 'sticky';
    if (el.closest('.site-footer')) return 'footer';
    if (el.closest('.navbar')) return 'header';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('.contact-alt')) return 'contact_page';
    return 'body';
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: method + '_click',
    link_location: locationFor(link),
    link_url: href
  });
});
