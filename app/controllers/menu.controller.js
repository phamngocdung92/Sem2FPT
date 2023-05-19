var Menu = require("../models/menu.model");

exports.list_menu = function(req, res){
    Menu.hdl_list_menu(data=>{
        res.send({
            result: data
        })
    })
}

exports.menu_id = function(req, res){
    Menu.hdl_menu_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_menu = function(req, res){
    var data = req.body;
    Menu.hdl_add_menu(data, (resp)=>{
        res.send({
            result: resp
        })
    })
}

exports.delete_menu = function(req, res){
    var id = req.params.id;
    Menu.hdl_delete_menu(id, (data)=>{
        res.send({
            result: data
        });
    })
}

exports.update_menu = function(req, res){
    var data = req.body;
    Menu.hdl_update_menu(data, function(response){
        res.send({result: response})
    })
}

exports.menuProduct = function(req, res){
    Menu.hdl_menuProduct(data=>{
        res.send({
            result: data
        })
    })
}

exports.menuProduct_id = function(req, res){
    Menu.menuProduct_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}
