module.exports = function(app){
    var cart = require('../controllers/cart.controller')

    var middleware = require("../commons/Author_middleware");

    // thêm sản phẩm vào cart 
    app.post('/add-to-cart', cart.handle_add_to_cart); //middleware.verifyToken,

    // lấy all cart theo id của user
    app.get('/cart/:user_id', cart.get_all_cart); //middleware.verifyTokenIsAdminOrIsUser,

    // xóa all sản phẩm ở trong cart của user 
    app.post('/remove/all/product', cart.remove_all_p);//middleware.verifyToken, 

    // giảm sản phẩm trong cart
    app.post('/decrease/product', cart.decrease_product);//middleware.verifyToken, 

    // xóa 1 sản phẩm trong cart!
    app.post('/delete/one/product', cart.delete_a_product);//middleware.verifyToken, 
}