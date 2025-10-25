# 圖片最佳化與部署說明

說明：
1. scripts/convert-images-to-webp-folder.sh：使用 cwebp 批次將 repo 中的 PNG/JPG 轉為 .webp（不會覆蓋原檔），輸出到 assets/webp/。  
   - 安裝（Debian/Ubuntu）：sudo apt install webp  或 sudo apt install webp -y（libwebp-tools）。  
   - 執行：chmod +x scripts/convert-images-to-webp-folder.sh && ./scripts/convert-images-to-webp-folder.sh . 80

2. 將 WebP 加入 HTML 的建議（保留 fallback）：
   ```html
   <picture>
     <source type="image/webp" srcset="/assets/webp/path/to/image.webp">
     <img src="/path/to/image.jpg" alt="..." loading="lazy" width="..." height="...">
   </picture>
   ```

3. 建議流程（推薦保守做法）：
   - 在本地建立 branch（例如 edit-images-xxx），執行 convert script 產生 .webp 檔到 assets/webp/。
   - 手動或用 script 把重要圖（hero/logo）保留原檔並加 preload；其餘改為 webp 或 picture。
   - commit 到 branch，發 PR，觀察 Lighthouse/Pagespeed 改善。

4. 部署建議：
   - GitHub Pages 的 Cache-Control 無法細緻調整（github.io），推薦配合 Cloudflare（自訂域名）或把大型資產放 CDN（jsDelivr 等）。
   - 啟用壓縮（Brotli/gzip）與資源快取能顯著提升載入速度。

5. 注意事項：
   - 腳本只會產生 webp，不會刪除原始檔。若要替換 HTML，請先在 branch 做修改並測試。
   - 若你希望把 webp 放回原目錄（非 assets/webp/），腳本也可改為在同目錄產出（現 repository 內已有 convert 腳本）。