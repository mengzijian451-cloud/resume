if (location.origin === 'https://mengzijian451-cloud.github.io' &&
    location.pathname.startsWith('/resume/')) {
  const counterBase = 'https://hits.sh/mengzijian451-cloud.github.io/resume/';

  function recordHit(counter) {
    fetch(counterBase + counter + '.svg', {
      mode: 'no-cors',
      credentials: 'omit',
      cache: 'no-store',
      keepalive: true,
      referrerPolicy: 'no-referrer',
    }).catch(() => {
      // Analytics should never interrupt the page or a download.
    });
  }

  recordHit('pageviews');

  for (const link of document.querySelectorAll('a[data-resume-download]')) {
    link.addEventListener('click', () => recordHit('pdf-downloads'));
  }
}
