<div align="center">

# PAYMENT SYSTEM - COVID PROJECT

## ĐỒ ÁN CUỐI KỲ MÔN PHÁT TRIỂN ỨNG DỤNG WEBSITE

</div>

## Thông tin thành viên

- 18120144 - Nguyễn Đình Thiên Phúc
- 18120606 - Trần Thị Trang
- 18120609 - Hồ Khắc Minh Trí
- 18120634 - Nguyễn Lê Anh Tuấn (Nhóm trưởng)

---

## Công nghệ sử dụng

- Server: NodeJS, ExpressJS WebAPI
- Dependencies:

  - NodeJs framework - [ExpressJs v4.17.1](https://expressjs.com/en/4x/api.html)
  - Read, write cookie - [Cookie-parser v1.4.6](https://www.npmjs.com/package/cookie-parser)
  - Connect PostgreSQL database
    - [Sequelize v6.12.0](https://www.npmjs.com/package/sequelize)
    - [pg v8.7.1](https://www.npmjs.com/package/pg)
    - [pg-hstore v2.3.4](https://www.npmjs.com/package/pg-hstore)
  - Read env file - [dotenv v10.0.0](https://www.npmjs.com/package/dotenv)
  - Encrypt password - [bcryptjs v2.4.3](https://www.npmjs.com/package/bcryptjs)
  - Server logging - [Morgan v1.10.0](https://www.npmjs.com/package/morgan)
  - Hot reload - [nodemon](https://www.npmjs.com/package/nodemon) (devDep)

- Database: PostgreSQL
- Môi trường phát triển:
  - IDE - Text Editor: Visual Stuido Code ( Format code với Pritter )
  - Nodejs version 16.x hoặc 14.x [Download](https://nodejs.org/en/)
  - PostgreSQL v14.1 [Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads), [Tutorial](https://www.postgresqltutorial.com/)
  - Node package manager: Yarn 1.22.x hoặc npm 6+
  - Development Browser: Chrome
- Team work:
  - Slack
  - Github, Github Project
- Cloud, Hosting
  - Hosting: Vercel.
  - Photo Cloud: Cloudinary.

---

## Yêu cầu đồ án

&nbsp;

<h1 align="center"> Hệ thống Quản lý Thanh toán </h1>

### Khởi tạo hệ thống

- Hệ thống khởi tạo với 1 tài khoản chính để nhận thanh toán từ Người được
  quản lý.

### Tài khoản

- Tài khoản chỉ gồm ID và số dư hiện tại.

### Chức năng

- Thiết kế database để hệ thống thực hiện được chức năng thanh toán (chuyển khoản) từ các tài khoản Người được quản lý sang tài khoản chính.
- Cần có chức năng thêm tài khoản cho Người được quản lý mới (tương ứng khi được đưa vào hệ thống quản lý).
- Khi người dùng đã được tạo tài khoản, đăng nhập lần đầu sẽ yêu cầu tạo mật khẩu (có chức năng thay đổi mật khẩu với quy trình hợp lý)
- Chức năng nạp tiền, kiểm soát số dư
- Cần có giải pháp để có thể đối soát giao dịch thanh toán

## Liên kết hệ thống Quản lý và Thanh toán

- Sử dụng WebAPI
- Cần đề xuất quy trình hợp lý.
