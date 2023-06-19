module.exports = function(app){
    var seasonController = require("../controllers/season.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/season/list", seasonController.list_season);

    app.get("/season/list/:id", seasonController.season_id);

    app.post("/season/add", seasonController.add_season); //middleware.verifyTokenIsAdmin, 

    app.delete("/season/delete/:id", seasonController.delete_season); //middleware.verifyTokenIsAdmin, 

    app.put("/season/update", seasonController.update_season); //middleware.verifyTokenIsAdmin, 

    // lay ra all san pham va menu 
    app.get("/seasonProduct/list", seasonController.seasonProduct);
    
    app.get("/seasonProduct/list/:id", seasonController.seasonProduct_id);
}