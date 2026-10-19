# A little love · Gửi người thương

React + Vite, Three.js / React Three Fiber, GSAP và Motion. Không cần backend.

## Chạy bằng VS Code

1. Cài Node.js 24 LTS.
2. Trong VS Code chọn File → Open Folder, mở thư mục này.
3. Mở Terminal → New Terminal và chạy:

```bash
npm install
npm run dev
```

Mở địa chỉ Local do Vite in ra. Nếu PowerShell chặn npm.ps1, dùng `npm.cmd install` và `npm.cmd run dev`. Điện thoại cùng Wi-Fi có thể mở địa chỉ Network của Vite; cho phép Node qua Windows Firewall cho mạng riêng khi cần.

## Luồng trải nghiệm

Hộp quà → lá thư → lựa chọn → lời chúc 20/10 → trái tim 3D → video. Nút suy nghĩ không khóa luồng; người xem có thể đồng ý sau.

Trái tim hiện trong 1,5 giây, quay chính xác từ 0 đến 10π quanh trục Y trong 10 giây với `ease: none`, sau đó sáng lên, tan thành hạt và chuyển sang video. Timeline được dọn khi unmount, tương thích React StrictMode. Geometry có chiều sâu thật và được tái sử dụng trong từng frame. Nếu thiếu WebGL, có thông báo và nút xem video thay cho animation.

## Thay video

Thay `public/videos/love.mp4` bằng video cá nhân, giữ nguyên tên. File hiện có là bản sao video được cung cấp. Ưu tiên MP4 H.264 + AAC để hỗ trợ Safari/iPhone. Video giữ nguyên tỷ lệ gốc, hỗ trợ dọc/ngang, âm thanh, phát lại, toàn màn hình. Khi autoplay có âm thanh bị chặn, nút “❤️ Nhấn để xem điều bất ngờ” xuất hiện. Thiếu file có thông báo và nút thử lại.

Nút loa trên header điều khiển tiếng chuông tương tác. Âm thanh video có nút riêng dưới video.

## Chỉnh nội dung

- `src/pages/IntroPage.jsx`: mở đầu.
- `src/pages/ExperiencePage.jsx`: lá thư và lời chúc.
- `src/components/heartGeometry.js`: phương trình hình học và hằng số quay.
- `src/components/Heart3D.jsx`: timeline 3D.
- `src/components/LoveVideo.jsx`: giao diện phát video.
- `src/styles/`: màu sắc, bố cục, animation và responsive.

## Build và hosting

```bash
npm run build
npm run preview
```

Vercel: preset Vite, build `npm run build`, output `dist`. Netlify: cùng build/output, đã có `netlify.toml`. Chưa xuất bản hosting. Three.js được lazy-load; cảnh báo chunk 3D lớn khi build không phải lỗi build.

## Kiểm tra

```bash
npm test
npm run test:e2e
```

E2E yêu cầu dev server đang chạy ở port 5173. Mặc định dùng Chrome trên Windows; đặt `BROWSER_PATH` nếu cần chỉ định Chrome/Edge khác. Trên macOS/Linux có thể cài Chromium bằng `npx playwright install chromium`.

Nếu server dùng cổng khác, đặt `BASE_URL` trước khi chạy kiểm thử. Ví dụ PowerShell: `$env:BASE_URL='http://localhost:5174'`. Báo cáo số đo và console được lưu tại `test-results/final-audit.json`.

Hướng dẫn triển khai Vercel từng bước, không cần GitHub: [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md). Dự án đã có `vercel.json` và `.vercelignore`.

Kiểm tra bao gồm góc quay, chiều quay, tốc độ, video chỉ xuất hiện sau animation, âm thanh, replay, fullscreen, thiếu WebGL, thiếu video và autoplay bị chặn. Screenshot nằm trong `test-results/`. Kiểm tra mobile là viewport Chromium; chưa xác nhận Safari/iOS, Android và màn hình 120Hz thật.

## Tham chiếu

Xem `analysis/REFERENCE.md`. Video 13,42 giây hiện có chỉ chứa lời chúc và chân dung, không có cảnh mở quà/hộp thoại. Các cảnh tương tác được xây theo mô tả, không thể xác nhận là bản sao video gốc. Ảnh trái tim PNG bổ sung được dùng để điều chỉnh wireframe và nền màn kết thúc.
