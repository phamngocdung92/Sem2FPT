var express = require('express');
var app = express();
var cors = require('cors');
var cookieParser = require("cookie-parser");

// cau hinh body-parser
var bodyParser = require('body-parser');
var _Authentication = require('./app/commons/Author_middleware');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors());
app.use(cookieParser());


require("./app/routers/account.login.router")(app);
require("./app/routers/user.router")(app);
require("./app/routers/product.routes")(app);
require("./app/routers/product.search")(app);
require("./app/routers/menu.router")(app);
require("./app/routers/menu2.router")(app);
require("./app/routers/gender.router")(app);
require("./app/routers/category.router")(app);
require("./app/routers/season.router")(app);
//app.use(_Authentication.isAuthor);

app.listen(3006, ()=>{
    console.log("server listening on http://localhost:3006");
})
