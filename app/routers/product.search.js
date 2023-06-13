module.exports = function(app){
    var productController = require("../controllers/product.controller");
    // lam o search
    app.get("/product/search", productController.listProductSearch);

    app.get("/product/filter", productController.price_5k);
}