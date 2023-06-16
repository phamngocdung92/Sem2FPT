var Product =  require("../models/product.model");

exports.listProduct = function(req, res){
    Product.getAll( (data)=>{
        res.send({
            result: data
        })
    } )
}

exports.product_id = function(req, res){
    // req.params.id -> lay id tren params
    Product.getById(req.params.id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_product = function(req, res){
    // nhan du lieu tu form len:
    var data = req.body;
    Product.create(data, (resp)=>{
        res.send({
            result: resp
        })
    })
}

exports.delete_product = function(req, res){
    var id = req.params.id;

    Product.remove(id, (data)=>{
        res.send({
            result: data
        });
    })
}

exports.update_product = function(req, res){
    var data = req.body;

    Product.update(data, (resp)=>{
        res.send({result: resp})
    })
}

exports.listProductSearch = function(req, res){
    const query1 = req.query.q;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    Product.search(query1, limit, offset, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.price_5k = function(req, res){

    const {price, gender} = req.query

    Product.p_5({price, gender}, (data)=>{
        res.send({
            result: data
        })
    } )
}

