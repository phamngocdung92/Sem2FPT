module.exports = function(app){
    var paymentController = require('../controllers/payment.controller');
    var middleware = require("../commons/Author_middleware");

    app.post('/payment',  paymentController.payment); //middleware.verifyToken,

    app.get('/success', paymentController.payment_success);

    app.get('/cancel', paymentController.payment_cancel);

    app.post('/payment_cash', paymentController.pay_cash)
}