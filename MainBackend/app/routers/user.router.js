module.exports = function(app){
    var userController = require("../controllers/user.controller"); // controller
    var middleware = require("../commons/Author_middleware");

    app.get("/users/list", middleware.verifyTokenIsAdmin, userController.list_user); //middleware.verifyTokenIsAdmin, 
    app.get("/users/detail/:id",  middleware.verifyTokenIsAdminOrIsUser, userController.detail_user);
    app.delete("/users/delete/:id", middleware.verifyTokenIsAdmin, userController.delete_user);
    app.put("/users/update", middleware.verifyToken, userController.change_password);
}
