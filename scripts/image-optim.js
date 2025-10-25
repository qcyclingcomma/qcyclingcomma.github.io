// 自動為頁面圖片標記 lazy / decoding，並在載入後補 width/height（若缺）
// 請於 index.html 底部以 <script src="/scripts/image-optim.js" defer></script> 引入
document.addEventListener('DOMContentLoaded', function () {
  try {
    // 可視情況調整 headerSelector，避免對首屏 logo / hero 圖做 lazy
    const headerSelector = '#nav, .header-top, .logo-area, .logo-are a';
    const headerImgs = new Set();
    document.querySelectorAll(headerSelector + ' img').forEach(i => headerImgs.add(i));

    document.querySelectorAll('img').forEach(img => {
      // 跳過 header / logo（若為首屏重要元素，可不 lazy）
      if (headerImgs.has(img)) return;

      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');

      // 若缺寬高，嘗試在載入後補上，減少 CLS
      const setDimensions = () => {
        try {
          if (img.naturalWidth && img.naturalHeight) {
            // 改寫成像素寬高（也可改為使用 CSS aspect-ratio）
            img.setAttribute('width', img.naturalWidth);
            img.setAttribute('height', img.naturalHeight);
          }
        } catch (e) {
          // 忽略錯誤
        }
      };

      if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
        if (img.complete && img.naturalWidth) {
          setDimensions();
        } else {
          img.addEventListener('load', setDimensions, { once: true });
        }
      }
    });
  } catch (e) {
    // 留錯誤於 console 方便 debug
    console.error('image-optim error', e);
  }
});