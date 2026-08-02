# Dựa trên tài liệu tả yêu cầu hệ thống LivingDocs, hệ thống được chia thành 5 tác nhân chính (Actors) với các vai trò và trách nhiệm riêng biệt trong luồng tạo, kiểm duyệt và quản trị tài liệu:
# 1. Developer (Author / Lập trình viên — Tác giả)
-	Vai trò: Người trực tiếp viết mã nguồn và khởi tạo/sử dụng tài liệu.
-	Trách nhiệm chính:
  
-Kết nối và quản lý liên kết tài khoản GitHub/Workspace/Repository.

-Yêu cầu AI đọc mã nguồn (File, Module, Repo) để tự động sinh tài liệu bản thảo theo Mẫu (Template).

-Nhận cảnh báo trôi tài liệu (Documentation Drift) khi có thay đổi code trong Commit/PR.

-Xem bằng chứng liên kết (Grounding Evidence), so sánh bản diff giữa code và tài liệu.

-Phản hồi các gợi ý cập nhật từ AI: Chấp nhận (Accept), Chỉnh sửa (Edit), hoặc Bỏ qua (Dismiss) bản thảo trước khi đưa vào luồng kiểm duyệt.

# 2. Staff (Reviewer / Kiểm duyệt viên vòng 1)
-	Vai trò: Kỹ sư/Kiểm duyệt viên chuyên môn chịu trách nhiệm đánh giá chất lượng tài liệu ở vòng đầu tiên.
-	Trách nhiệm chính:
  
-Quản lý hàng chờ (Review Queue) các tài liệu do AI sinh ra hoặc tự động cập nhật.

-Kiểm tra tính chính xác của tài liệu so với mã nguồn thực tế (Code Diff, Commit, Ticket) và cấu trúc Mẫu chuẩn.

-Thêm nhận xét, yêu cầu sửa đổi (Request Changes) hoặc trực tiếp chỉnh sửa các lỗi nhỏ.

-Phê duyệt tài liệu để chuyển tiếp lên Manager hoặc từ chối (Reject) để trả về cho Developer.

# 3. Manager (Approver / Người phê duyệt cuối)
-	Vai trò: Người quản lý có thẩm quyền quyết định việc xuất bản hoặc lưu lưu trữ tài liệu chính thức.
-	Trách nhiệm chính:
  
-Duyệt các tài liệu đã qua vòng kiểm duyệt của Staff.

-Quyết định xuất bản (Publish) hoặc commit trực tiếp tài liệu vào GitHub Repository.

-Từ chối hoặc yêu cầu Staff/Developer chỉnh sửa lại.

-Cấu hình chính sách gộp nhánh (Merge Policies) trên GitHub (Cảnh báo Warn hoặc Chặn Block PR nếu tài liệu chưa đạt yêu cầu).

-Thực hiện rollback (khôi phục) tài liệu về các phiên bản đã phê duyệt trước đó.

# 4. Technical Lead / Documentation Owner (Trưởng nhóm kỹ thuật / Chủ sở hữu tài liệu)
-	Vai trò: Người chịu trách nhiệm về chiến lược, chất lượng và chuẩn mực tài liệu của dự án.
-	Trách nhiệm chính:
  
-Quản lý các bộ sưu tập tài liệu và phân quyền sở hữu tài liệu.

-Cấu hình ngưỡng phát hiện trôi tài liệu (Drift Detection Policies) và chính sách tự động cập nhật.

-Theo dõi Dashboard sức khỏe tài liệu (độ phủ, độ tươi mới, biểu đồ phụ thuộc Doc-to-Code).

-Quản lý Mẫu tài liệu (Template Management): Tạo, chỉnh sửa các mẫu (README, API Reference, Architecture Decision Record - ADR, v.v.) và định nghĩa các biến (placeholders) kết nối với mã nguồn.

# 5. Administrator (Quản trị viên hệ thống)
-	Vai trò: Quản trị toàn bộ hạ tầng, phân quyền người dùng và tích hợp hệ thống.
-	Trách nhiệm chính:
  
-Quản lý tài khoản, vai trò và phân quyền truy cập (RBAC) cho 5 nhóm tác nhân.

-Quản lý cấu hình Workspace, kết nối GitHub App, OAuth2, Webhooks và các dịch vụ bên ngoài (Jira, Slack,...).

-Quản trị AI Engine: Cấu hình mô hình LLM, Embedding model, Confidence threshold (ngưỡng tin cậy),Token budget và thiết lập 
Indexing/Retrieval.

-Giám sát các tác vụ xử lý AI (AI processing jobs), đường ống sự kiện (Event pipelines) và xem Audit Logs/System Analytics.

