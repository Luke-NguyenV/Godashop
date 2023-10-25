const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');
const InformationController = require('../controllers/InformationController');
const ContactController = require('../controllers/ContactController');
const AuthController = require('../controllers/AuthController');
const CustomerController = require('../controllers/CustomerController');
const CartController = require('../controllers/CartController');
// Hiển thị trang chủ
router.get('/', HomeController.index);

// Hiển thị danh sách sản phâm
router.get('/san-pham.html', ProductController.index);

// Hiển thị danh sách sản phẩm
// slug và category_id là do ta đặt
// danh-muc/kem-chong-nang/c3.html
router.get('/danh-muc/:slug/c:category_id.html', ProductController.index);

// Tìm kiếm
router.get('/search', ProductController.index);

// /chinh-sach-doi-tra.html
router.get('/chinh-sach-doi-tra.html', InformationController.returnPolicy);

// /chinh-sach-thanh-toan.html
router.get('/chinh-sach-thanh-toan.html', InformationController.paymentPolicy);

// /chinh-sach-giao-hang.html
router.get('/chinh-sach-giao-hang.html', InformationController.deliveryPolicy);

// /lien-he.html
router.get('/lien-he.html', ContactController.form);

// gởi email
router.post('/contact/sendEmail', ContactController.sendEmail);

// chi tiết sản phẩm
router.get('/san-pham/:slug.html', ProductController.detail);

// lưu đánh giá (ajax)
router.post('/comments', ProductController.storeComment);

router.post('/login', AuthController.login);

// thông tin tài khoản
router.get('/thong-tin-tai-khoan.html', CustomerController.show);

// thông tin tài khoản
router.get('/dia-chi-giao-hang-mac-dinh.html', CustomerController.shippingDefault);

// cart
router.get('/cart/add', CartController.add);
// hok dùng tới
router.get('/cart/get', CartController.get);

router.get('/cart/update', CartController.update);
router.get('/cart/delete', CartController.delete);

module.exports = router;