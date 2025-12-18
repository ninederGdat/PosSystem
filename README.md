# Hệ thống POS đơn giản với Realtime Orders

Bài test tuyển dụng Full-stack .NET + React

## Chức năng chính
- Màn hình POS: hiển thị sản phẩm, thêm vào giỏ, tính tổng tiền, thanh toán
- Màn hình Realtime Orders: hiển thị danh sách đơn hàng, tự động cập nhật qua SignalR (không reload)
- Backend: ASP.NET Core Web API + SignalR + in-memory storage

## Cách chạy local

### Backend (.NET)
1. Mở terminal tại folder `Pos.Api`
2. Chạy:
   ```bash
   dotnet restore
   dotnet run

API chạy tại https://localhost:7191 (port có thể thay đổi)
Swagger: mở https://localhost:7191/swagger để test API


Frontend (React + Vite)

Mở terminal tại folder pos-frontend
Chạy:Bashnpm install
npm run dev
Mở http://localhost:5173

Dockerfile
Build & run backend
Bashcd Pos.Api
docker build -t pos-api .
docker run -p 8080:80 pos-api
Build & run frontend
Bashcd pos-frontend
docker build -t pos-frontend .
docker run -p 3000:80 pos-frontend
Lưu ý

Backend dùng in-memory → dữ liệu mất khi restart
CORS đã config cho localhost:5173
Realtime sử dụng SignalR (push từ server khi có đơn mới)
