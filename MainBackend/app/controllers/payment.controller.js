const Payment = require('../models/payment.model');

exports.payment = function(req, res){
    let userId = req.body.userId;

    Payment.handle_payment(userId, (data)=>{
        if(data == null){
            return res.status(400).json({
                message: " error! * _ * "
            })
        }else if(data == undefined){
            return res.status(404).json({
                message: "not found!"
            })
        }else{
            return res.status(200).json({
                message: data
            })
        }
    })
}

exports.payment_success = function(req, res){
    let payerId = req.query.PayerID;
    let paymentId = req.query.paymentId;

    Payment.success({payerId, paymentId}, (data)=>{
        if(data == null){
            return res.status(400).json({
                message: 'error'
            })
        }else{
            return res.status(201).send(data);
        }
    })

}

exports.payment_cancel = function(req, res){
        res.status(403).json({
            message: 'error! you have canceled the payment'
        })
}