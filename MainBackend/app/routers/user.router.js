module.exports = function(app){
    var userController = require("../controllers/user.controller"); // controller
    var middleware = require("../commons/Author_middleware");

    app.get("/users/list",userController.list_user); //middleware.verifyTokenIsAdmin, 
    app.get("/users/detail/:id",  userController.detail_user);// middleware.verifyTokenIsAdmin,
    app.delete("/users/delete/:id", middleware.verifyTokenIsAdmin, userController.delete_user);// middleware.verifyTokenIsAdmin
    app.put("/users/update", userController.change_password);// middleware.verifyTokenIsAdmin,
}