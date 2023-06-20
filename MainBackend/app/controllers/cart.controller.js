var Cart = require('../models/cart.model');

exports.handle_add_to_cart = function(req, res){
    let userId = req.body.userId;
    let productId = req.body.productId;

    Cart.handle_cart({userId, productId}, (result)=>{
        return res.send({result: result});
    })
}

exports.get_all_cart = function(req, res){
    let userId = req.params.id;

    Cart.getCart_user(userId, (data)=>{
        return res.send({
            result: data
        })
    })
}

exports.remove_all_p = function(req, res){
    let userId = req.body.userId;

    Cart.delete_all(userId, (response)=>{
        if(response == null){
            res.status(404).json({
                message: 'you dont have product in cart'
            })
        }else{
            console.log(response);
            return res.status(204).json({
                message: response
            });
        }

    })
}

exports.decrease_product = function(req, res){
    let userId = req.body.user_id;
    let productId = req.body.product_id;

    Cart.decrease_amount({userId, productId}, (result)=>{
        if(result == null){
            res.status(400).json({
                message: 'error please try again!'
            })
        }else{
            return res.status(204).json({message: result});
        }
    })
}

exports.delete_a_product = function(req, res){
    let userId = req.body.user_id;
    let productId = req.body.product_id;

    Cart.delete_product({userId, productId}, (response)=>{
        if(response == null){
            return res.status(404).json({
                message: 'error not found result'
            })
        }else{
            return res.status(204).json({
                message: response
            })
        }

    })

}

exports.getHistory = function(req, res){
    Cart.data_admin((response)=>{
        if(response == null){
            return res.status(404).json({
                message: 'error! something wrong or data not found'
            })
        }else{
            return res.status(200).json({
                message: response
            })
        }
    })
}
