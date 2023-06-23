module.exports = function(app){
    var menuController2 = require("../controllers/menu2.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/menu2/list", menuController2.list_menu2);

    app.get("/menu2/list/:id", menuController2.menu_id2);

    app.post("/menu2/add", menuController2.add_menu2);

    app.delete("/menu2/delete/:id", menuController2.delete_menu2);

    app.put("/menu2/update", menuController2.update_menu2); 

    // lay ra all san pham va menu 
    app.get("/menuProduct2/list", menuController2.menuProduct2);
    
    app.get("/menuProduct2/list/:id", menuController2.menuProduct_id2);
}