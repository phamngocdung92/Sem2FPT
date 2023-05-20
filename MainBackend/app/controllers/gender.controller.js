var Gender = require("../models/gender.model");

exports.list_gender = function(req, res){
    Gender.hdl_list_gender(data=>{
        res.send({
            result: data
        })
    })
}

exports.gender_id = function(req, res){
    Gender.hdl_gender_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_gender = function(req, res){
    var data = req.body;
    Gender.hdl_add_gender(data, (resp)=>{
        res.send({
            result: resp
        })
    })
}

exports.delete_gender = function(req, res){
    var id = req.params.id;
    Gender.hdl_delete_gender(id, (data)=>{
        res.send({
            result: data
        });
    })
}

exports.update_gender = function(req, res){
    var data = req.body;
    Gender.hdl_update_gender(data, function(response){
        res.send({result: response})
    })
}

exports.genderProduct = function(req, res){
    Gender.hdl_genderProduct(data=>{
        res.send({
            result: data
        })
    })
}

exports.genderProduct_id = function(req, res){
    Gender.genderProduct_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}
