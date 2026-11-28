if (location.origin === 'https://mengzijian451-cloud.github.io' &&
    location.pathname.startsWith('/resume/')) {
  const goatCounter = 'https://mengzijian451-resume.goatcounter.com';
  const downloadEvent = 'resume-pdf-download';
  const trackerReady = new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.dataset.goatcounter = goatCounter + '/count';
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
      path: downloadEvent,
      title: '简历 PDF 下载',
      event: true,
    }));
  }

  const stats = document.querySelector('[data-site-stats]');
  if (stats) {
    const views = stats.querySelector('[data-site-views]');
    const downloads = stats.querySelector('[data-site-downloads]');
    const initialViews = 128;
    const initialDownloads = 17;
    const format = new Intl.NumberFormat('zh-CN');

    async function readCount(path) {
      const response = await fetch(`${goatCounter}/counter/${encodeURIComponent(path)}.json`, {
        credentials: 'omit',
      });
      if (!response.ok && response.status !== 404) {
        throw new Error('GoatCounter counts are unavailable');
      }
      const { count } = await response.json();
      const digits = String(count).replace(/[\s,.'’]/g, '');
      const value = Number(digits);
      if (!/^\d+$/.test(digits) || !Number.isSafeInteger(value)) {
        throw new Error('GoatCounter returned an invalid count');
      }
      return value;
    }

    Promise.all([readCount('TOTAL'), readCount(downloadEvent)]).then(([total, downloadCount]) => {
      // The site total includes the PDF click event.
      const pageviews = Math.max(0, total - downloadCount);
      views.textContent = format.format(initialViews + pageviews);
      downloads.textContent = format.format(initialDownloads + downloadCount);
    }).catch(() => {
      // Leave the placeholders visible if public counts are unavailable.
    });
  }
}
