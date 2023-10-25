class CustomerController {
    // thong tin tai khoan
    static show = async (req, res) => {
        try {
            res.render('customer/show', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // thong tin tai khoan
    static shippingDefault = async (req, res) => {
        try {
            res.render('customer/shippingDefault', {

            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


}
module.exports = CustomerController;