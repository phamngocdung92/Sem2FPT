module.exports = function(app){
    var genderController = require("../controllers/gender.controller");

    app.get("/gender/list", genderController.list_gender);

    app.get("/gender/list/:id", genderController.gender_id);

    app.post("/gender/add", genderController.add_gender);

    app.delete("/gender/delete/:id", genderController.delete_gender);

    app.put("/gender/update", genderController.update_gender); 

    // lay ra all san pham va menu 
    app.get("/genderProduct/list", genderController.genderProduct);
    
    app.get("/genderProduct/list/:id", genderController.genderProduct_id);
}