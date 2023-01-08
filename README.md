
# Ứng dụng web hệ thống quản lý phòng khám tư Group21 - Clinic Management System Group21

## Giới thiệu - Introduction

Xã hội ngày càng phát triển, trong khi môi trường sống ngày càng ô nhiễm, sức khỏe con người cũng đối mặt với nhiều nguy cơ bệnh tật hơn. Minh chứng là những dịch bệnh trong các năm gần đây như Covid-19, bệnh đậu mùa khỉ, … Vì nhu cầu khám chữa bệnh hiện nay rất lớn, nhưng số lượng bệnh viện lại không đủ đáp ứng nhu cầu đó, nên ngày càng nhiều phòng khám tư được mở ra. Do đó nhu cầu để có ứng dụng web để quản lý cũng trở nên thiết yếu.

## Nhóm 21 - Group 21
20120454-Lê Công Đắt

20120490-Hoàng Hải Hưng

20120493-Huỳnh Trần Quang Huy

20120495-Lê Xuân Huy

## Local installation - Cài đặt để chạy local
Đầu tiên tải project về:
```bash
git clone https://github.com/Dat-TG/NMCNPM-20_4-Group21-Clinic_Management.git
```
Tiếp theo mở project bằng Visual Studio Code, có thể download tại: https://code.visualstudio.com/download
Sau đó cài đặt Extension Live Server cho Visual Studio Code

![](https://nentang.vn/wp-content/uploads/2021/11/VisualStudioCode_CaiDat_TienIchMoRong_LiveServer_Extension.png)

Mở terminal và cài đặt node modules bằng lệnh 
```bash
npm install 
```
Sau đó chạy server bằng lệnh
```bash
npm start
```
Cuối cùng mở trình duyệt và nhập đường dẫn
```bash
http://localhost:20454
```
để truy cập vào trang web

## Deploy
Truy cập vào trang web tại địa chỉ
```bash
https://nmcnpm-group21.onrender.com/
```
## Hướng dẫn deploy lên Render
Truy cập https://render.com/ để tạo tài khoản

![sign_up_render](https://www.freecodecamp.org/news/content/images/2022/08/sign_up_render.png)

Chọn ```New Web Service```

![dashboard](https://www.freecodecamp.org/news/content/images/2022/08/dashboard.png)

Kết nối với tài khoản GitHub 

![new_web_service](https://www.freecodecamp.org/news/content/images/2022/08/new_web_service.png)

Chọn Resposity của project sau đó nhấn ```Connect```

![connected_repository](https://www.freecodecamp.org/news/content/images/2022/08/connected_repository.png)

Nhập các thông tin cần thiết

![details](https://www.freecodecamp.org/news/content/images/2022/08/details.png)

Chọn dịch vụ bạn muốn sử dụng sau đó nhấn ```Create Web Service```

![advanced_options](https://www.freecodecamp.org/news/content/images/2022/08/advanced_options.png)

Cuối cùng là chờ cho đến khi trang web deploy xong

Chi tiết hướng dẫn xem tại: https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/
## Current status
Tính năng chung cho cả bác sĩ và bệnh nhân
- Truy cập trang chủ, xem thông tin giới thiệu phòng khám
- Tra cứu danh sách bác sĩ
- Tra cứu thuốc
- Tra cứu dịch vụ
- Tải bảng dữ liệu thành file Excel, PDF
- Ẩn/hiện các cột của bảng 
- Copy bảng vào clipboard

Đối với riêng bệnh nhân
- Tạo tài khoản, chỉnh sửa thông tin cá nhân
- Đăng nhập, đăng xuất
- Đặt lịch hẹn khám bệnh
- Xem lịch sử khám bệnh

Đối với riêng bác sĩ
- Đăng nhập, đăng xuất tài khoản bác sĩ
- Chỉnh sửa lịch làm việc
- Tra cứu bệnh nhân
- Tra cứu hồ sơ bệnh án
- Chỉnh sửa thuốc, dịch vụ
- Xóa thuốc/dịch vụ
- Chỉnh sửa số bệnh nhân tối đa trong ngày
- Báo cáo doanh thu
- Báo cáo sử dụng thuốc
- Xem các báo cáo trước đây
- Lập và in phiếu khám bệnh
- Chỉnh sửa danh sách khám bệnh
- Chấp nhận/hủy phiếu hẹn khám bệnh



## Future works
Đối với cả bác sĩ và bệnh nhân:
- Đăng ký tài khoản bằng tài khoản Facebook, Google, Twitter, ...
- Nâng cao bảo mật của trang web

Đối với bệnh nhân
- Xóa tài khoản
- Đánh giá bác sĩ/dịch vụ/phòng khám (1-5 sao)
- Đăng ký những dịch vụ chăm sóc sức khỏe thường niên

Đối với bác sĩ
- Đăng bài viết chia sẻ về sức khỏe, kiến thức, ...
## Video demo
https://drive.google.com/drive/folders/13C8DbPHM5C5svDsbEf9bbXTN8SwaOl_x
