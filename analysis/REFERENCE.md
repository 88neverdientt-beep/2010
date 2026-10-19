# Phân tích tài liệu tham chiếu

## File thực tế

`1792431623294_108328106240936870_7694169259115194337.mp4`

- Thời lượng 13,42 giây; 720 × 1280, dọc 9:16, 30fps.
- H.264 video, AAC stereo audio.
- Đã trích ảnh theo từng giây tại `timeline.jpg`; `contact-sheet.jpg` là bản trích mỗi 3 giây.
- Lần rà soát mới có ảnh `0dc54c17-7f4c-468e-ab0c-10a77f389209.png` (415 × 739): trái tim trắng wireframe trên nền hồng rose mờ, sáng hơn ở các góc. Hình khối tròn, lưới mảnh bao quanh mặt cong, nhìn hơi nghiêng nên thấy rõ độ sâu. Đã tăng chiều sâu geometry và điều chỉnh nền gradient theo ảnh này. Trục X/Z giữ nguyên theo yêu cầu; tim quay quanh Y để bộc lộ các mặt.

## Những cảnh quan sát được

| Thời gian gần đúng | Nội dung quan sát |
| --- | --- |
| 0–2 giây | Chữ viết tay trắng “Happy Women’s Day”, ngày 20.10.2025 kèm hoa hồng. Lời chúc 20/10 nhỏ phía dưới. Nền là ảnh làm mờ, ảnh chân dung rõ bo góc chiếm phần lớn nửa dưới. |
| 2–4 giây | Giữ nguyên bố cục, dòng chúc đổi sang nội dung vui vẻ và hạnh phúc. |
| 4–7 giây | Chữ chúc tiếp tục đổi; chân dung và tiêu đề giữ nguyên. |
| 7–10 giây | Các câu nhắn nhủ và lời yêu lần lượt xuất hiện phía trên ảnh. |
| 10–13,42 giây | Dòng ngắn cuối hiện rồi mờ dần; khung ảnh chân dung vẫn hiện tới cuối. |

Chữ nhỏ trong bản nén không đủ rõ để khẳng định toàn bộ câu nguyên văn. Video gốc được phát trực tiếp ở màn kết thúc để giữ nguyên bố cục, nội dung, âm thanh và nhịp của tài liệu được cung cấp.

## Phần bổ sung theo yêu cầu bằng văn bản

Video này không có hộp quà, click, hộp thoại, nút lựa chọn, giao diện pixel-art hay chuyển cảnh sang trái tim. Không thể suy ra thứ tự/thời điểm những cảnh đó từ file hiện tại. Website bổ sung đầy đủ luồng mô tả: quà → thư → lựa chọn → lời chúc → trái tim → video. Bảng màu pastel hồng, kem, rose và serif nghiêng mang tinh thần lãng mạn; cửa sổ lựa chọn có thanh tiêu đề monospace và bóng viền vuông gợi pixel UI.

Trái tim bổ sung là wireframe trắng thật trong Three.js: xuất hiện 1,5 giây, quay 5 × 360° quanh Y trong 10 giây, sau đó flash/dissolve khoảng 1,6 giây rồi fade sang video. Không có nút bỏ qua animation trong nhánh WebGL hoạt động.

Để đối chiếu chính xác luồng tương tác gốc vẫn cần video tham chiếu có các cảnh mở quà và hộp thoại. Ảnh PNG đã đủ làm tham chiếu cho phong cách trái tim.
