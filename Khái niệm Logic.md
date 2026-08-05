# Khái niệm Logic
Có 4 bước cơ bản:
[1. Phát hiện] ────> [2. So sánh] ────> [3. Viết nháp] ────> [4. Duyệt bài]
 Lập trình viên        AI đo độ            AI soạn thảo          Sếp & Reviewer
 vừa sửa Code          "lệch pha"           kèm bằng chứng         duyệt để đăng
# 1. Báo động khi có thay đổi (Code Event)
- Cách hiểu: Mỗi khi Lập trình viên (Developer) sửa xong một đoạn code và đẩy lên GitHub, hệ thống sẽ thông báo ngay lập tức: “Code vừa đổi rồi, AI kiểm tra ngay!”.
# 2. Tự đo độ “lệch pha” (Documentation Drift)
- Cách hiểu: AI sẽ nhảy vào xem đoạn code vừa sửa và so với cuốn sách hướng dẫn hiện tại.
- Nếu nó thấy code đã đổi (ví dụ: đổi tên hàm, thêm tính năng) mà sách chưa đổi, nó sẽ tính ra một điểm lệch pha (Ví dụ: “Sách cũ mất 80% rồi!”).
# 3. AI Tự viết bản thảo và Đưa bằng chứng (AI Draft and Evidence)
- Cách hiểu: AI sẽ tự gõ một bản nháp tài liệu mới. Để không ai nghi ngờ là nó “bịa” ra, AI sẽ chỉ rõ: “Em sửa dòng này trong tài liệu là vì anh Dev vừa sửa dòng 50 ở file X vào lúc 9h sáng đấy nhé” (Đó gọi là Bằng chứng / Grounding Evidence).
# 4. Luồng kiểm duyệt và Chặn code lỗi (Pipeline and Gatekeeper)
Cách hiểu:
- Bản nháp của AI không được xuất bản ngay.
- Nó phải gửi cho Staff (Người kiểm duyệt) xem trước  Chuyển qua Manager (Sếp) bấm duyệt cuối cùng.
- Nếu tài liệu bị “lệch pha” quá nặng mà Dev cố tình bỏ qua, Rào chắn (Gatekeeper) sẽ chặn lại, không cho gộp đoạn code đó vào hệ thống chính cho đến khi tài liệu được cập nhật xong.

