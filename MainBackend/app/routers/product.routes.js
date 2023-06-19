module.exports = function(app){
    var productController = require("../controllers/product.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/product/list", productController.listProduct);//middleware.verifyToken, 

    app.get("/product/list/:id", productController.product_id);

    app.post("/product/add", productController.add_product);//middleware.verifyTokenIsAdmin, 

    app.delete("/product/delete/:id", productController.delete_product);//middleware.verifyTokenIsAdmin, 

    app.put("/product/update", productController.update_product); //middleware.verifyTokenIsAdmin, 
    
}