module.exports = function(app){
    var productController = require("../controllers/product.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/product/list", middleware.verifyToken, productController.listProduct);

    app.get("/product/list/:id", productController.product_id);

    app.post("/product/add", middleware.verifyTokenIsAdmin ,productController.add_product);  //middleware.verifyTokenIsAdmin,

    app.delete("/product/delete/:id", middleware.verifyTokenIsAdmin, productController.delete_product);

    app.put("/product/update", middleware.verifyTokenIsAdmin, productController.update_product); 
    
}