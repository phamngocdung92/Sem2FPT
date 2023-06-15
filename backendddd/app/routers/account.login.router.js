module.exports = function(app){
    var userController = require("../controllers/user.controller"); // controller
    var middleware = require("../commons/Author_middleware");


    app.post("/account/login", userController.login);
    app.post("/account/create", userController.add_user);
    app.post("/account/refresh", userController.refreshToken);
    app.post("/account/logout", userController.logout);
}