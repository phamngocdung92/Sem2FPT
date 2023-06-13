module.exports = function(app){
    var genderController = require("../controllers/gender.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/gender/list", genderController.list_gender);

    app.get("/gender/list/:id", genderController.gender_id);

    app.post("/gender/add", middleware.verifyTokenIsAdmin, genderController.add_gender);

    app.delete("/gender/delete/:id", middleware.verifyTokenIsAdmin, genderController.delete_gender);

    app.put("/gender/update", middleware.verifyTokenIsAdmin, genderController.update_gender); 

    // lay ra all san pham va menu 
    app.get("/genderProduct/list", genderController.genderProduct);
    
    app.get("/genderProduct/list/:id", genderController.genderProduct_id);
}