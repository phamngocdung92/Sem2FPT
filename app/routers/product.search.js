module.exports = function(app){
    var productController = require("../controllers/product.controller");
    // lam o search
    app.get("/product/search", productController.listProductSearch);

    // filter price
    app.get("/product/filter", productController.price_5k); // filter price & gender
}