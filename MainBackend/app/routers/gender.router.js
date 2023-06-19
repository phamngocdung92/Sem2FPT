module.exports = function(app){
    var genderController = require("../controllers/gender.controller");
    var middleware = require("../commons/Author_middleware");

    app.get("/gender/list", genderController.list_gender);

    app.get("/gender/list/:id", genderController.gender_id);

    app.post("/gender/add", genderController.add_gender);//middleware.verifyTokenIsAdmin, 

    app.delete("/gender/delete/:id", genderController.delete_gender);//middleware.verifyTokenIsAdmin, 

    app.put("/gender/update", genderController.update_gender); //middleware.verifyTokenIsAdmin, 

    // lay ra all san pham va menu 
    app.get("/genderProduct/list", genderController.genderProduct);
    
    app.get("/genderProduct/list/:id", genderController.genderProduct_id);
}