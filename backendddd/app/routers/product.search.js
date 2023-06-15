module.exports = function(app){
    var productController = require("../controllers/product.controller");
    // lam o search
    app.get("/product/search", productController.listProductSearch);

    // filter price
    app.get("/product/search/price5", productController.price_5k); // >5k

    app.get("/product/search/price4", productController.price_4k);// 4k -> 5k

    app.get("/product/search/price3", productController.price_3k);// 3k -> 4k

    app.get("/product/search/price2", productController.price_2k); // 2k -> 3k

    app.get("/product/search/price1", productController.price_1k); // <2k
}