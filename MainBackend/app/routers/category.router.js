module.exports = function(app){
    var categoryController = require("../controllers/category.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/category/list", categoryController.list_category);

    app.get("/category/list/:id", categoryController.category_id);

    app.post("/category/add", categoryController.add_category);//middleware.verifyTokenIsAdmin, 

    app.delete("/category/delete/:id", categoryController.delete_category);//middleware.verifyTokenIsAdmin, 

    app.put("/category/update", categoryController.update_category); //middleware.verifyTokenIsAdmin, 

    // lay ra all san pham va menu 
    app.get("/categoryProduct/list", categoryController.categoryProduct);
    
    app.get("/categoryProduct/list/:id", categoryController.categoryProduct_id);
}

