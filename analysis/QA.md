# Kết quả kiểm tra

Ngày thực hiện: 20/10/2026. Môi trường: Windows, Node 24.13, Chrome headless qua Playwright. WebGL được kiểm thử với SwiftShader.

| Kiểm tra | Kết quả |
| --- | --- |
| `npm test` | 2/2 pass: hợp đồng góc/thời gian và geometry hữu hạn, liên tục, có chiều sâu |
| `npm run build` | Pass; output `dist/`. Có cảnh báo kích thước chunk 3D ~991 kB trước gzip (~272 kB gzip), đã lazy-load và prefetch ở màn trước. |
| `npm run test:e2e` | Pass |
| Desktop 1440 × 1000 | Đi hết luồng, 5 vòng, tốc độ đo ~3,140 rad/s, video, mute, replay, fullscreen, restart |
| Mobile viewport 390 × 844 | Đi hết luồng, 5 vòng, tốc độ đo ~3,142 rad/s, video, mute, replay, fullscreen, restart |
| Góc cuối | Đúng `10 * Math.PI`, kiểm tra sai số < 1e-9 |
| Thời gian quay | Khoảng 10.000 ms, dung sai kiểm thử 500 ms cho lịch render headless |
| Video trước khi quay xong | Không mount trong lúc quay và giai đoạn dissolve ban đầu |
| Autoplay bị chặn | Giả lập `NotAllowedError`, hiển thị nút phát, nhấn phát được |
| Không có WebGL | Giả lập getContext trả null, có thông báo và nút đi tiếp hoạt động |
| Thiếu video | Giả lập HTTP 404, hiển thị lỗi thân thiện và quay về đầu được |
| Runtime JavaScript | Không có `pageerror` trong bài kiểm thử |
| Responsive | Không tràn ngang ở 320, 390 và 1440 px |

Ảnh chụp đầy đủ ở `test-results/`; ảnh xem trước và khung hình tham chiếu ở `analysis/`.

Chưa chạy trên Safari/iOS, Android hay màn hình 120Hz thật. Edge được kiểm tra bổ sung ở lần rà soát cuối bên dưới. Kiểm thử kích thước điện thoại là giả lập viewport Chromium, không thay thế kiểm tra thiết bị thật. Chưa xuất bản hosting.

Rà soát bổ sung: đã khôi phục index.html, vite.config.js, README.md và netlify.toml; điều chỉnh chiều sâu tim và nền rose theo ảnh PNG mới. Chạy lại npm test, npm run build và npm run test:e2e đều đạt. Desktop đo 3,141 rad/s, mobile 3,142 rad/s. Ảnh mới: analysis/heart-updated.png.

## Rà soát cuối theo yêu cầu

- Đã chạy toàn bộ luồng bằng Chrome trên Vite và Edge trên bản build production (`vite preview`). Cả hai đều pass desktop/mobile, autoplay dự phòng, thiếu WebGL, thiếu video và kiểm tra console.
- Chrome: góc cuối chính xác 31,41592653589793 rad (10π); X/Z = 0; desktop 9997,3 ms, mobile 10002 ms; tốc độ khoảng 3,14163 rad/s.
- Video không xuất hiện ở bất kỳ frame được lấy mẫu trong thời gian quay; video chỉ mount sau khi timeline quay và dissolve kết thúc. Video trong bản build có đầy đủ tại `dist/videos/love.mp4`.
- Đã kiểm tra nút phát/tạm dừng, mute/unmute, mute từ native video controls, phát lại, toàn màn hình và khởi động lại từ đầu.
- Đã kiểm tra thêm Web Audio của tiếng chuông: AudioContext ở trạng thái running, tạo 3 oscillator đúng các tần số 523,25 / 659,25 / 783,99 Hz; bật/tắt tiếng hiệu ứng hoạt động. Đây là kiểm tra tự động tín hiệu/trạng thái, không phải nghe thử qua loa thiết bị thật.
- Kiểm tra quay về đầu ngay khi hộp quà đang mở: timer bị hủy, không tự nhảy sang màn thư sau đó.
- Responsive không tràn ngang tại 320, 375, 390, 430, 768 và 1440 px. Đã xem screenshot điện thoại nhỏ và màn video; video dọc giữ tỷ lệ.
- Không có console error hoặc JavaScript pageerror trong luồng bình thường. Nhánh thiếu video cố ý giả lập HTTP 404. Còn cảnh báo deprecation `THREE.Clock` từ R3F/Three.js; giữ nguyên thư viện để không thay đổi hành vi đang hoạt động. Build vẫn có cảnh báo kích thước chunk 3D, không phải build failure.
- Lỗi đã sửa: native video controls có thể đổi mute mà biểu tượng loa riêng chưa đồng bộ; thêm `onVolumeChange` để đồng bộ trạng thái. Thêm favicon cục bộ để tránh request icon mặc định bị thiếu.
- Không đổi thiết kế hoặc thứ tự các chức năng đang chạy tốt. Ảnh trái tim và các khung hình MP4 đã được đối chiếu lại; phần mở quà/hộp thoại vẫn chỉ dựa trên mô tả vì MP4 không có những cảnh đó. Lưới trái tim là tái tạo phong cách, không phải bản sao hình học tuyệt đối của ảnh.
- Thêm `vercel.json`, `.vercelignore`, hướng dẫn `DEPLOY_VERCEL.md`; chưa đăng nhập hoặc triển khai bằng tài khoản người dùng.

Số đo đầy đủ: `analysis/final-audit-chrome.json`, `analysis/final-audit-edge-production.json`. Ảnh responsive và video mới nhất: `test-results/`.
