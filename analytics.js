if (location.origin === 'https://mengzijian451-cloud.github.io' &&
    location.pathname.startsWith('/resume/')) {
  const trackerReady = new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.dataset.goatcounter = 'https://mengzijian451-resume.goatcounter.com/count';
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
    script.addEventListener('load', () => resolve(window.goatcounter), { once: true });
    script.addEventListener('error', () => resolve(null), { once: true });
    document.head.append(script);
  });

  function recordHit(hit) {
    trackerReady.then(tracker => tracker?.count?.({ ...hit, no_session: true }));
  }

  recordHit({ path: location.pathname.replace(/\/index\.html$/, '/') });

  for (const link of document.querySelectorAll('a[data-resume-download]')) {
    link.addEventListener('click', () => recordHit({
      path: 'resume-pdf-download',
      title: '简历 PDF 下载',
      event: true,
    }));
  }
}
