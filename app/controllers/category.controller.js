var Category = require("../models/category.model");

exports.list_category = function(req, res){
    Category.hdl_list_category(data=>{
        res.send({
            result: data
        })
    })
}

exports.category_id = function(req, res){
    Category.hdl_category_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_category = function(req, res){
    var data = req.body;
    Category.hdl_add_category(data, (resp)=>{
        res.send({
            result: resp
        })
    })
}

exports.delete_category = function(req, res){
    var id = req.params.id;
    Category.hdl_delete_category(id, (data)=>{
        res.send({
            result: data
        });
    })
}

exports.update_category = function(req, res){
    var data = req.body;
    Category.hdl_update_category(data, function(response){
        res.send({result: response})
    })
}

exports.categoryProduct = function(req, res){
    Category.hdl_categoryProduct(data=>{
        res.send({
            result: data
        })
    })
}

exports.categoryProduct_id = function(req, res){
    Category.categoryProduct_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}
