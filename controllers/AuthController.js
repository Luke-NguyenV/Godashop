const customerModel = require('../models/Customer');
const bcrypt = require('bcrypt');
class AuthController {
    // chính sách trả hàng
    static login = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const customer = await customerModel.findEmail(email);
            if (!customer) {
                // req.app.locals.session.message_error = `Lỗi: không tồn tại ${email} trong hệ thống`;
                req.session.message_error = `Lỗi: không tồn tại ${email} trong hệ thống`;
                // sau khi session được lưu, thì sẽ điều hướng đến trang chủ
                req.session.save(() => {
                    res.redirect('/')
                });
                return;
            }

            if (!bcrypt.compareSync(password, customer.password)) {
                req.session.message_error = `Lỗi: mật khẩu không đúng`;
                // sau khi session được lưu, thì sẽ điều hướng đến trang chủ
                req.session.save(() => {
                    res.redirect('/')
                });
                return;
            }

            if (!customer.is_active) {
                req.session.message_error = `Lỗi: Tài khoản chưa được kích hoạt, vui lòng kiểm tra email`;
                // sau khi session được lưu, thì sẽ điều hướng đến trang chủ
                req.session.save(() => {
                    res.redirect('/')
                });
                return;
            }
            req.session.name = customer.name;
            req.session.email = customer.email;
            req.session.message_success = 'Đã đăng nhập thành công';
            req.session.save(() => {
                // điều hướng vào trang thông tin cá nhân (làm sau)
                res.redirect('/')
            });


        } catch (error) {
            res.status(500).send(error.message);
        }
    }



}
module.exports = AuthController;