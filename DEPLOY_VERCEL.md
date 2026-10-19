# Đưa Love Surprise lên Vercel miễn phí

Vercel Hobby miễn phí cho dự án cá nhân, phi thương mại như website quà tặng này. Không cần backend hoặc tên miền riêng. Tài liệu chính thức: https://vercel.com/docs/plans/hobby

## Cách ưu tiên: GitHub → Vercel

1. Đăng nhập GitHub, tạo repository mới tên `love-surprise`. Có thể chọn **Private**. Để repository trống: không chọn tạo README, .gitignore hoặc license.
2. Trong terminal VS Code tại thư mục dự án, chạy:

```bash
git init -b main
git add .
git commit -m "Build Love Surprise experience"
git remote add origin https://github.com/TEN_GITHUB/love-surprise.git
git push -u origin main
```

Thay `TEN_GITHUB` bằng tên tài khoản thực tế hoặc dùng URL repository bạn vừa tạo. Nếu Git yêu cầu đăng nhập, hoàn tất qua trình duyệt/Git Credential Manager. Nếu Git báo thiếu tên/email tác giả, cấu hình `git config user.name "Tên của bạn"` và `git config user.email "Email GitHub của bạn"`, rồi chạy lại lệnh commit và push.

`.gitignore` đã loại node_modules, dist, cấu hình IDE, biến môi trường và các bản ảnh/video tham chiếu trùng lặp. Video cần chạy trên website tại **public/videos/love.mp4** vẫn được đưa lên GitHub.

3. Đăng nhập Vercel bằng GitHub, chọn tài khoản cá nhân gói Hobby.
4. Chọn **Add New → Project → Import Git Repository**, chọn repository vừa đẩy lên. Nếu chưa thấy repo, cấp quyền cho Vercel truy cập đúng repository đó.
5. Chọn cấu hình sau rồi nhấn **Deploy**:

| Mục | Giá trị |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | Thư mục gốc có package.json |
| Build Command | npm run build |
| Output Directory | dist |
| Install Command | Giữ mặc định |
| Environment Variables | Không cần |

6. Chờ trạng thái Ready, vào **Domains**, mở tên miền Production dạng `https://ten-project.vercel.app` bằng cửa sổ ẩn danh và điện thoại trước khi gửi cho người yêu.

Khi sửa nội dung hoặc thay video, cập nhật bằng:

```bash
git add .
git commit -m "Update love surprise"
git push
```

Vercel sẽ tự build và cập nhật khi push vào nhánh Production (thường là main). Hướng dẫn chính thức: https://vercel.com/docs/deployments

## Cách thay thế: triển khai trực tiếp, không cần GitHub

1. Mở https://vercel.com/signup và tạo tài khoản cá nhân. Chọn Hobby cho dự án cá nhân.
2. Trong VS Code mở đúng thư mục Love Surprise có `package.json`, `index.html` và `vercel.json`.
3. Đặt video cuối cùng tại `public/videos/love.mp4`. Giữ đúng chữ thường trong tên file. MP4 H.264/AAC là lựa chọn phù hợp cho trình duyệt điện thoại.
4. Mở Terminal → New Terminal, chạy:

```bash
npm install
npm run build
npx vercel@latest login
```

Chấp nhận cài CLI nếu npm hỏi; làm theo hướng dẫn đăng nhập trong terminal/trình duyệt.

5. Triển khai Production:

```bash
npx vercel@latest --prod
```

Nếu CLI hỏi thiết lập:

| Câu hỏi | Chọn |
| --- | --- |
| Set up and deploy? | Y |
| Which scope? | Tài khoản cá nhân / Hobby của bạn |
| Link to existing project? | N cho lần đầu |
| Project name? | Tên bạn thích, ví dụ `love-surprise-hieu` |
| Directory containing code? | `./` |
| Framework | Vite nếu được hỏi |
| Modify settings? | Giữ cấu hình đã nhận diện |

File `vercel.json` đã khai báo build `npm run build`, output `dist`. Không cần Environment Variables. `.vercelignore` bỏ thư mục phân tích, ảnh chụp và bản gốc tham chiếu khỏi upload CLI; video trong `public/videos/love.mp4` vẫn được tải lên.

6. Khi hoàn tất, mở Vercel Dashboard → project → Domains, sao chép **tên miền Production** dạng `https://ten-project.vercel.app`. Không lấy URL Local của Vite hoặc URL deployment Preview.

Tài liệu CLI và Vite: https://vercel.com/docs/cli/deploying-from-cli và https://vercel.com/docs/frameworks/frontend/vite

## Kiểm tra đường link trước khi gửi

- Mở tên miền Production trong cửa sổ ẩn danh hoặc trên điện thoại dùng 4G/5G để bảo đảm không cần đăng nhập Vercel.
- Nếu trang yêu cầu đăng nhập: trong project mở Settings → Deployment Protection. Kiểm tra phạm vi bảo vệ; Standard Protection không bảo vệ production domains, trong khi All Deployments có bảo vệ. Hãy dùng tên miền Production có thể truy cập công khai. Tài liệu: https://vercel.com/docs/deployment-protection
- Thử từ hộp quà đến hết 5 vòng rồi video. Nếu trình duyệt chặn autoplay có âm thanh, nhấn “❤️ Nhấn để xem điều bất ngờ”.
- Kiểm tra cả âm thanh và nút phát lại. Nên mở bằng Chrome hoặc Safari nếu trình duyệt bên trong ứng dụng nhắn tin hạn chế video.

Sau đó gửi tên miền Production đó cho người yêu. Đây là website public; bạn không cần gửi source hoặc chạy máy tính liên tục.

## Cập nhật sau này

Thay video hoặc nội dung trong dự án, rồi chạy lại:

```bash
npx vercel@latest --prod
```

Giữ thư mục `.vercel` do CLI tạo để tiếp tục triển khai đúng project. Tên miền Production giữ nguyên khi cập nhật cùng project.

## Nếu thích dùng GitHub

Đưa source và `public/videos/love.mp4` lên repository của tài khoản cá nhân; không đưa `node_modules`, `dist`, `.vercel`. Trong Vercel chọn Add New → Project → Import repository, preset Vite, build `npm run build`, output `dist`, rồi Deploy. Sau đó mỗi lần push sẽ tạo deployment mới. Hướng dẫn: https://vercel.com/docs/deployments

Website chưa được triển khai tự động trong lần kiểm tra này; các bước đăng nhập và deploy ở trên do bạn thực hiện bằng tài khoản của mình.
