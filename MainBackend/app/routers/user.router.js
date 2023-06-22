module.exports = function(app){
    var userController = require("../controllers/user.controller"); // controller
    var middleware = require("../commons/Author_middleware");

    app.get("/users/list", userController.list_user); //middleware.verifyTokenIsAdmin, 
    app.get("/users/detail/:id",  userController.detail_user);
    app.delete("/users/delete/:id", userController.delete_user);
    app.put("/users/update",  userController.change_password);
}
