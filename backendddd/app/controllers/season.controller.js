var Season = require("../models/season.model");

exports.list_season = function(req, res){
    Season.hdl_list_season(data=>{
        res.send({
            result: data
        })
    })
}

exports.season_id = function(req, res){
    Season.hdl_season_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_season = function(req, res){
    var data = req.body;
    Season.hdl_add_season(data, (resp)=>{
        res.send({
            result: resp
        })
    })
}

exports.delete_season = function(req, res){
    var id = req.params.id;
    Season.hdl_delete_season(id, (data)=>{
        res.send({
            result: data
        });
    })
}

exports.update_season = function(req, res){
    var data = req.body;
    Season.hdl_update_season(data, function(response){
        res.send({result: response})
    })
}

exports.seasonProduct = function(req, res){
    Season.hdl_seasonProduct(data=>{
        res.send({
            result: data
        })
    })
}

exports.seasonProduct_id = function(req, res){
    Season.seasonProduct_id(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}
