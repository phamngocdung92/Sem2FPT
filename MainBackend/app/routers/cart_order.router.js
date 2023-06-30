module.exports = function(app){
    var cart = require('../controllers/cart.controller')

    var middleware = require("../commons/Author_middleware");

    // thêm sản phẩm vào cart
    app.post('/add-to-cart',  cart.handle_add_to_cart); //

    // xóa all sản phẩm ở trong cart của user
    app.post('/remove/all/product',  cart.remove_all_p);

    // giảm sản phẩm trong cart
    app.post('/decrease/product',  cart.decrease_product);

    // xóa 1 sản phẩm trong cart!
    app.post('/delete/one/product',  cart.delete_a_product);


    // lấy all cart theo id của user
    app.get('/cart/:id', cart.get_all_cart);//, middleware.verifyTokenIsAdminOrIsUser

    // lay ra all history cho admin:
    app.get('/getall/history',cart.getHistory);

    // toggle status
    app.post('/toggle/status', cart.toggle_status);

    app.get('/history/user/:id', cart.getHistory_user);
}
