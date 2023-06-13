module.exports = function(app){
    var cart = require('../controllers/cart.controller')

    var middleware = require("../commons/Author_middleware");

    // thêm sản phẩm vào cart 
    app.post('/add-to-cart', middleware.verifyToken, cart.handle_add_to_cart);

    // lấy all cart theo id của user
    app.get('/cart/:user_id', middleware.verifyToken, cart.get_all_cart);

    // xóa all sản phẩm ở trong cart của user 
    app.post('/remove/all/product', middleware.verifyToken, cart.remove_all_p);

    // giảm sản phẩm trong cart
    app.post('/decrease/product', middleware.verifyToken, cart.decrease_product);

    // xóa 1 sản phẩm trong cart!
    app.post('/delete/one/product', middleware.verifyToken, cart.delete_a_product);
}