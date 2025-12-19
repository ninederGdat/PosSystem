# Hệ thống POS đơn giản với Realtime Orders

Bài test tuyển dụng Full-stack .NET + React

## Chức năng chính
- **Màn hình POS**: hiển thị danh sách sản phẩm, thêm vào giỏ hàng, tính tổng tiền, nút Thanh toán (POST order, thông báo thành công, clear giỏ).
- **Màn hình Realtime Orders**: hiển thị danh sách đơn hàng, tự động cập nhật realtime qua SignalR (không reload).
- Backend sử dụng in-memory storage (seed sẵn sản phẩm).

## Công nghệ
- Backend: ASP.NET Core Web API + SignalR
- Frontend: React (Vite) + React Router + @microsoft/signalr + axios
- Docker: multi-stage build cho cả backend và frontend

### Backend

cd Pos.Api
dotnet restore
dotnet run

API chạy tại https://localhost:7191
Swagger: https://localhost:7191/swagger

Frontend
cd pos-frontend
npm install
npm run dev

Mở http://localhost:5173

Cách chạy bằng Docker (khuyến khích để test production)
Backend
cd Pos.Api
docker build -t pos-api:latest .
docker run -d -p 8080:80 --name pos-api pos-api:latest

Swagger: http://localhost:8080/swagger

Frontend
cd pos-frontend
docker build -t pos-frontend:latest .
docker run -d -p 3000:80 --name pos-frontend pos-frontend:latest

Mở http://localhost:3000

Test full flow Docker

Run backend Docker (-p 8080:80)
Run frontend Docker (-p 3000:80)
Frontend production tự động gọi backend tại http://localhost:8080

Stop container
docker stop pos-api pos-frontend
docker rm pos-api pos-frontend
Lưu ý

Backend dùng in-memory → dữ liệu mất khi restart container.
CORS đã config cho localhost:5173 (dev) và production Docker.
Realtime sử dụng SignalR push từ backend khi có đơn mới.

Cảm ơn đã xem repo!
