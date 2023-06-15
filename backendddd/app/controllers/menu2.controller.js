var Menu = require("../models/menu2.model");

exports.list_menu2 = function(req, res){
    Menu.hdl_list_menu2(data=>{
        res.send({
            result: data
        })
    })
}

exports.menu_id2 = function(req, res){
    Menu.hdl_menu_id2(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_menu2 = function(req, res){
    var data = req.body;
    Menu.hdl_add_menu2(data, (resp)=>{
        res.send({
            result: resp
        })
    })
}

exports.delete_menu2 = function(req, res){
    var id = req.params.id;
    Menu.hdl_delete_menu2(id, (data)=>{
        res.send({
            result: data
        });
    })
}

exports.update_menu2 = function(req, res){
    var data = req.body;
    Menu.hdl_update_menu2(data, function(response){
        res.send({result: response})
    })
}

exports.menuProduct2 = function(req, res){
    Menu.hdl_menuProduct2(data=>{
        res.send({
            result: data
        })
    })
}

exports.menuProduct_id2 = function(req, res){
    var id = req.params.id;
    Menu.menuProduct_id2(id, (data)=>{
        res.send({
            result: data
        })
    })
}
