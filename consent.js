/* =============================================================
   DSGVO Consent Manager — Orthopädie-Schuhtechnik Adelmann
   Blockiert externe Dienste (Google Maps, Vimeo) bis Zustimmung.
   ============================================================= */
(function () {
  'use strict';

  var COOKIE = 'oa_consent';
  var consent = getConsent();

  // — Initialisierung —
  if (consent === 'all') {
    activateEmbeds();
  } else if (consent === 'essential') {
    showPlaceholders();
  } else {
    showPlaceholders();
    showBanner();
  }

  // — Cookie lesen —
  function getConsent() {
    var m = document.cookie.match('(?:^|; )' + COOKIE + '=([^;]*)');
    return m ? m[1] : null;
  }

  // — Cookie setzen (180 Tage) —
  function setConsent(value) {
    var d = new Date();
    d.setTime(d.getTime() + 180 * 24 * 60 * 60 * 1000);
    document.cookie = COOKIE + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  // — Alle blockierten iframes aktivieren —
  function activateEmbeds() {
    var frames = document.querySelectorAll('iframe[data-src]');
    for (var i = 0; i < frames.length; i++) {
      frames[i].src = frames[i].getAttribute('data-src');
      frames[i].removeAttribute('data-src');
    }
    // Platzhalter entfernen
    var ph = document.querySelectorAll('.consent-placeholder');
    for (var j = 0; j < ph.length; j++) {
      ph[j].style.display = 'none';
      // Iframe sichtbar machen
      var iframe = ph[j].parentElement.querySelector('iframe');
      if (iframe) iframe.style.display = '';
    }
  }

  // — Platzhalter über blockierten iframes anzeigen —
  function showPlaceholders() {
    var frames = document.querySelectorAll('iframe[data-src]');
    for (var i = 0; i < frames.length; i++) {
      var iframe = frames[i];
      iframe.style.display = 'none';

      // Prüfe ob Platzhalter schon existiert
      if (iframe.parentElement.querySelector('.consent-placeholder')) continue;

      var src = iframe.getAttribute('data-src') || '';
      var service = src.indexOf('vimeo') > -1 ? 'Vimeo' : 'Google Maps';

      var ph = document.createElement('div');
      ph.className = 'consent-placeholder';
      ph.innerHTML =
        '<div class="consent-placeholder-inner">' +
        '<p><strong>Externer Inhalt blockiert</strong></p>' +
        '<p>' + service + ' wird erst nach Ihrer Zustimmung geladen. ' +
        'Dabei werden Daten an ' + (service === 'Vimeo' ? 'Vimeo Inc.' : 'Google LLC') + ' übertragen.</p>' +
        '<button class="btn btn-dark consent-placeholder-btn">Inhalt laden</button>' +
        '</div>';

      iframe.parentElement.insertBefore(ph, iframe);

      // Einzelner Consent-Button
      (function (btn) {
        btn.querySelector('.consent-placeholder-btn').addEventListener('click', function () {
          setConsent('all');
          activateEmbeds();
          hideBanner();
        });
      })(ph);
    }
  }

  // — Banner anzeigen —
  function showBanner() {
    if (document.getElementById('consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Hinweis');
    banner.innerHTML =
      '<div class="consent-banner-inner">' +
      '<div class="consent-banner-text">' +
      '<strong>Datenschutz-Einstellungen</strong>' +
      '<p>Wir nutzen Cookies und externe Dienste (Google Maps, Vimeo), um Ihnen die bestmögliche Erfahrung zu bieten. ' +
      'Dabei können Daten an Drittanbieter in den USA übertragen werden. ' +
      '<a href="/datenschutz.html">Mehr erfahren</a></p>' +
      '</div>' +
      '<div class="consent-banner-actions">' +
      '<button class="btn btn-primary" id="consent-accept">Alle akzeptieren</button>' +
      '<button class="btn btn-ghost" id="consent-essential">Nur essenzielle</button>' +
      '</div>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('consent-accept').addEventListener('click', function () {
      setConsent('all');
      activateEmbeds();
      hideBanner();
    });

    document.getElementById('consent-essential').addEventListener('click', function () {
      setConsent('essential');
      hideBanner();
    });
  }

  function hideBanner() {
    var b = document.getElementById('consent-banner');
    if (b) b.remove();
  }
})();
