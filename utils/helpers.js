const numeral = require('numeral');
const slugify = require('slugify')
//Hỗ trợ phân cách hàng ngàn tại việt nam
// 1.000.000
require('numeral/locales/vi');
numeral.locale('vi');

exports.formatMoney = (money) => {
    return numeral(money).format('0,0');
}

exports.genRouteCategory = (category) => {
    // /danh-muc/kem-chong-nang/c3.html
    const slug = slugify(category.name, { lower: true });
    const category_id = category.id;
    return `/danh-muc/${slug}/c${category_id}.html`;

}

// Hàm này trả về tên route
exports.getCurrentRoute = (path) => {
    // xóa dấu / đằng trước path
    // vd: /san-pham.html => san-pham.html
    // vd: /  => rỗng
    // path.slice(1) là lấy cắt chuỗi từ vị trí 1 trở đi, vì trị 0 là ký tự đầu tiên của chuỗi
    path = path.startsWith('/') ? path.slice(1) : path;
    // trang chủ
    if (path === '') {
        return 'home';
    }

    // trang danh sách sản phẩm
    // Dấu // là biểu thức chính quy (regular expression)
    // Dấu ^ là bắt đầu, dấu $ là kết thúc chuỗi
    // giả sử path là: san-pham.html thì path.match(...) trả về true
    if (path.match(/^san-pham.html$/)) {
        return 'product';
    }

    // tìm kiếm theo danh mục
    if (path.match(/^danh-muc/)) {
        return 'category';
    }

    // liên hệ
    if (path.match(/^lien-he.html$/)) {
        return 'contact';
    }

    // tìm kiếm theo từ khóa
    if (path.match(/^search/)) {
        return 'search';
    }

    if (path.match(/^chinh-sach-doi-tra.html$/)) {
        return 'returnPolicy';
    }

    if (path.match(/^chinh-sach-thanh-toan.html$/)) {
        return 'paymentPolicy';
    }

    if (path.match(/^chinh-sach-giao-hang.html$/)) {
        return 'deliveryPolicy';
    }
}


// Hàm này dùng đê gởi email
exports.sendEmail = async (to, subject, content) => {
    const nodemailer = require("nodemailer");
    // cấu hình
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_SECRET,//không phải mật khẩu đăng nhập
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USERNAME, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content, // html body
    });
}


exports.genRouteProductDetail = (product) => {
    // /danh-muc/kem-chong-nang/c3.html
    const slug = slugify(product.name, { lower: true });
    const id = product.id;
    // /san-pham/kem-lam-trang-da-5-in-1-cream-127.html
    return `/san-pham/${slug}-${id}.html`;

}

exports.santitizeData = (data) => {
    const createDOMPurify = require('dompurify');
    const { JSDOM } = require('jsdom');

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(data);
    return clean;

}

exports.getCurrentDateTime = () => {
    const { format } = require("date-fns");
    // 2023-09-16 10:04:17
    return format(new Date(), 'yyyy-MM-dd H:i:s');
}