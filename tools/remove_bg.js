(function () {
  function removeSolidBg(img, tolerance = 40) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const w = img.naturalWidth;
    const h = img.naturalHeight;

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);

    try {
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      function getPixel(x, y) {
        const i = (y * w + x) * 4;
        return [data[i], data[i + 1], data[i + 2]];
      }

      const corners = [
        getPixel(0, 0),
        getPixel(w - 1, 0),
        getPixel(0, h - 1),
        getPixel(w - 1, h - 1)
      ];

      const bg = corners
        .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
        .map(v => v / 4);

      const [bgR, bgG, bgB] = bg;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const diff =
          Math.abs(r - bgR) +
          Math.abs(g - bgG) +
          Math.abs(b - bgB);

        if (diff < tolerance && r > 200 && g > 200 && b > 200) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (e) {
      return img.src;
    }
  }

  function processImages() {
    if (!window.matchMedia('(prefers-color-scheme: dark)').matches) return;

    const images = document.querySelectorAll('img');

    images.forEach(img => {
      if (img.dataset.processed) return;

      img.crossOrigin = 'anonymous';

      const apply = () => {
        try {
          const newSrc = removeSolidBg(img, 40);
          if (newSrc) {
            img.src = newSrc;
            img.dataset.processed = 'true';
          }
        } catch (e) {}
      };

      if (img.complete) {
        apply();
      } else {
        img.onload = apply;
      }
    });
  }

  window.addEventListener('load', processImages);

  const observer = new MutationObserver(processImages);
  observer.observe(document.body, { childList: true, subtree: true });
})();