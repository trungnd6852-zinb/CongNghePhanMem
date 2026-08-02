# Hệ thống phản hồi 
# 1. Tổng quan
LivingDocs là hệ thống hỗ trợ quản lý và duy trì tài liệu phần mềm bằng trí tuệ nhân tạo. Hệ thống không chỉ phát hiện sự thay đổi của mã nguồn mà còn phản hồi cho người dùng về tình trạng tài liệu, các tài liệu bị ảnh hưởng, đề xuất cập nhật và trạng thái phê duyệt.
Mỗi khi người dùng thực hiện một thao tác hoặc mã nguồn của hệ thống thay đổi, LivingDocs sẽ xử lý sự kiện tương ứng và trả về kết quả thông qua giao diện web, thông báo, trạng thái workflow hoặc cảnh báo documentation drift.
Mục tiêu của cơ chế phản hồi là giúp người dùng biết rõ:
•	Hệ thống đã nhận và xử lý yêu cầu hay chưa.
•	Mã nguồn thay đổi có ảnh hưởng đến tài liệu hay không.
•	Tài liệu nào đang bị lỗi thời.
•	AI đề xuất thay đổi tài liệu như thế nào.
•	Thay đổi đó dựa trên bằng chứng nào từ mã nguồn.
•	Tài liệu đang ở trạng thái nào trong quy trình kiểm duyệt.
•	Ai đã thực hiện hoặc phê duyệt thay đổi.
# 2. Phản hồi khi người dùng kết nối GitHub
Khi Developer kết nối tài khoản GitHub, hệ thống thực hiện xác thực và yêu cầu quyền truy cập repository.
Sau khi kết nối thành công, hệ thống phản hồi bằng cách hiển thị:
•	Trạng thái kết nối GitHub.
•	Danh sách repository mà người dùng có quyền truy cập.
•	Branch mặc định.
•	Thời gian đồng bộ gần nhất.
•	Danh sách Pull Request và commit đã được hệ thống tiếp nhận.
Nếu GitHub Token hoặc webhook không còn hợp lệ, hệ thống phải thông báo cho người dùng và yêu cầu thực hiện lại quá trình cấp quyền.
# 3. Phản hồi khi AI tạo tài liệu
Khi Developer yêu cầu AI tạo tài liệu cho một file, module hoặc toàn bộ repository, LivingDocs tiến hành phân tích mã nguồn và tạo tài liệu theo template được lựa chọn.
Kết quả phản hồi bao gồm:
•	Nội dung tài liệu do AI tạo.
•	Cấu trúc tài liệu theo template.
•	Các class, method, endpoint, parameter, return value và dependency được phân tích.
•	Các code entity chưa có tài liệu.
•	Grounding evidence cho nội dung được tạo.
•	Confidence score của đề xuất AI.
Grounding evidence giúp người dùng kiểm tra nguồn gốc của thông tin được AI sử dụng, chẳng hạn như đường dẫn source code, code entity và commit tương ứng.
Sau khi xem kết quả, Developer có thể:
Preview → Edit → Submit for Review
Tài liệu sau khi gửi sẽ chuyển sang quy trình kiểm duyệt.
# 4. Phản hồi khi mã nguồn thay đổi
Đây là chức năng phản hồi quan trọng nhất của LivingDocs.
Khi Developer tạo Pull Request hoặc commit làm thay đổi source code, GitHub Actions sẽ kích hoạt quá trình kiểm tra tài liệu.
Hệ thống sẽ:
-	Code thay đổi → Phân tích AST → Xác định code entity bị ảnh hưởng → Tìm tài liệu liên quan → Phân tích documentation drift → Đưa ra phản hồi
Nếu không phát hiện vấn đề, hệ thống có thể thông báo rằng tài liệu hiện tại vẫn phù hợp với mã nguồn.
Nếu phát hiện sự không nhất quán, hệ thống tạo Documentation Drift Alert.
# 5. Phản hồi khi phát hiện Documentation Drift
Khi phát hiện tài liệu lỗi thời, hệ thống phải hiển thị rõ:
-	Code change gây ra vấn đề.
-	Document bị ảnh hưởng.
-	Loại documentation drift:
•	Referential
•	Signature
•	Semantic
-	Mức độ nghiêm trọng:
•	Low
•	Medium
•	High
•	Critical
-	Commit và Pull Request liên quan.
-	Diff của mã nguồn.
-	Grounding evidence.
-	Đề xuất cập nhật của AI.
# Ví dụ:
Documentation Drift Detected
File: UserService.java
Code Change: getUserById() → findUserById()

Affected Document:
User Service Documentation

Drift Type: Referential
Severity: Medium

AI Suggestion:
Cập nhật nội dung tài liệu để sử dụng
findUserById() thay cho getUserById().

 
Evidence:
Source: UserService.java
Commit: abc123
Người dùng có thể lựa chọn:
Accept | Edit | Dismiss
# 6. Phản hồi khi AI tự động cập nhật tài liệu
Khi source code thay đổi, LivingDocs có thể tự động tạo một phiên bản tài liệu mới.
Hệ thống hiển thị:
•	Phiên bản tài liệu mới.
•	Phiên bản hiện tại đang được publish.
•	Diff giữa hai phiên bản.
•	Commit hoặc Pull Request gây ra thay đổi.
•	Code entity liên quan.
•	Nội dung AI đã thay đổi.
Developer có thể:
•	Accept.
•	Edit.
•	Dismiss.
•	Regenerate.
•	Rollback.
Việc này giúp người dùng kiểm soát nội dung trước khi tài liệu được đưa vào quy trình phê duyệt.
# 7. Phản hồi trong quy trình Review và Approval
LivingDocs sử dụng quy trình kiểm duyệt nhiều cấp:
Draft → In Review → Approved → Published
 
# 7.1. Staff Review
Khi tài liệu được gửi review, Staff nhận được thông báo và tài liệu xuất hiện trong review queue.
Staff có thể:
•	Xem tài liệu.
•	Xem source code và grounding evidence.
•	So sánh với phiên bản trước.
•	Thêm comment.
•	Chỉnh sửa.
•	Approve.
•	Reject.
Nếu Staff approve:
In Review → Manager Approval
Nếu Staff reject:
In Review → Returned to Developer
# 7.2. Manager Approval
Manager thực hiện bước phê duyệt cuối cùng.
Manager có thể:
•	Approve.
•	Reject.
•	Yêu cầu chỉnh sửa.
•	Rollback về phiên bản trước.
Nếu được duyệt:
Approved → Published/Committed
Nếu bị từ chối:
Rejected → Staff/Developer Revision
# 8. Phản hồi về lịch sử thay đổi
Mọi thay đổi đối với tài liệu đều được ghi vào Change Log.
Hệ thống phải cho phép người dùng xem:
•	Phiên bản tài liệu.
•	Thời gian thay đổi.
•	Người hoặc role thực hiện thay đổi.
•	Trigger gây ra thay đổi.
•	Commit hoặc Pull Request liên quan.
•	Nội dung thay đổi giữa các phiên bản.
Role thực hiện thay đổi có thể là:
AI → Staff → Manager
Người dùng cũng có thể so sánh hai phiên bản bất kỳ và rollback về phiên bản trước khi cần thiết.
# 9. Tổng quát cơ chế phản hồi
Có thể mô tả cơ chế phản hồi của LivingDocs theo sơ đồ:
                Developer thay đổi Code
                         │
                         ▼
                  GitHub Pull Request
                         │
                         ▼
                   GitHub Actions
                         │
                         ▼
                 AI phân tích mã nguồn
                         │
                         ▼
             Phát hiện Documentation Drift
                    /              \
                  Không             Có
                   │                │
                   ▼                ▼
              Không cảnh báo    Drift Alert
                                    │
                                    ▼
                           AI tạo đề xuất cập nhật
                                    │
                                    ▼
                              Developer Review
                                    │
                                    ▼
                              Staff Review
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                      Reject                Approve
                         │                     │
                         ▼                     ▼
                    Chỉnh sửa           Manager Review
                                               │
                                      ┌────────┴────────┐
                                      │                 │
                                   Reject            Approve
                                      │                 │
                                      ▼                 ▼
                                  Chỉnh sửa         Published

