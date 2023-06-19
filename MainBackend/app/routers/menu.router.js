module.exports = function(app){
    var menuController = require("../controllers/menu.controller");
    var middleware = require("../commons/Author_middleware"); 

    app.get("/menu/list", menuController.list_menu);

    app.get("/menu/list/:id", menuController.menu_id);

    app.post("/menu/add", menuController.add_menu);//middleware.verifyTokenIsAdmin, 

    app.delete("/menu/delete/:id", menuController.delete_menu);//middleware.verifyTokenIsAdmin, 

    app.put("/menu/update", menuController.update_menu); //middleware.verifyTokenIsAdmin, 

    // lay ra all san pham va menu 
    app.get("/menuProduct/list", menuController.menuProduct);
    
    app.get("/menuProduct/list/:id", menuController.menuProduct_id);
}