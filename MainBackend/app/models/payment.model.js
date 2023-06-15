const db = require('../commons/connect');
const paypal = require('paypal-rest-sdk');
const {google} = require('googleapis');
const nodemailer = require('nodemailer');

require('dotenv').config();

const CLIENT_ID = '62633050265-aubr3kahfuqn9j4n4hrteihlmrvlfvvd.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04NNdeSspPjTyCgYIARAAGAQSNwF-L9Ir8sRkxd-bxhyWq1s4ftwN7K4LOFgYNi79qWbjtIqueprX5FdqZ1-aoBhktmY0eKI1-ME'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendMail = async(invoiceEmail) => {
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'anhdvth2205005@fpt.edu.vn',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

          // send mail with defined transport object
          let info = await transport.sendMail({
            from: '"Fasion Luxury" <anhdvth2205005@fpt.edu.vn>', 
            to: `${invoiceEmail.email}`,
            subject: "Notification of successfully payment of your bill ✔",
            text: `Hello ${invoiceEmail.username}`,
            html: `<h5>Payment methods: Paypal</h5></br><h5>Payment status: Payment success </h5></br>
            <div style=" margin: auto;width: 50%;"><div> <h3 style="margin-left: 230px">INVOICE</h3>
            <div style="display: flex"><div style="border: 2px solid black; padding: 10px">
            <h3>SUMARY</h3><h4>Order id: ${invoiceEmail.payment_id} </h4><h4>Order Date: ${invoiceEmail.order_date}</h4><h4>total amount: ${invoiceEmail.total_amount} $    </h4></div><div style="border: 2px solid black; padding: 10px">
            <h3>SHIPPING ADDRESS</h3><h4>Receiver: ${invoiceEmail.username} </h4><h4>Address: ${invoiceEmail.address} </h4><h4>Phone number: ${invoiceEmail.phone}</h4>
            </div></div></div></div></br></br><span style="position: absolute; right: 600px;">---thank you---</span>
            `,
        });

  console.log(info);
  
    }catch(error){
        console.log('loi roi!');
        console.error(error);
    }
}



paypal.configure({
    'mode': 'sandbox',
    'client_id': PAYPAL_CLIENT_ID,
    'client_secret': PAYPAL_CLIENT_SECRET
});

// tạo fnc constructor để tạo các function static để từ đối tượng này có thể gọi vào các func static
const Payment = function(){}

function getProductById(id){ // khi 1 func sử dung instance promise thì khi gọi hàm cần sử dụng async await
    return new Promise((resolve, reject)=>{
        let sql = 'SELECT * FROM product WHERE id_product = ?';

        db.query(sql, [id], function(err, result){
            if(err){
                reject(err);
            }
            resolve(result[0]);
        });
    })
}

function getInvoice(id){
    return new Promise( (resolve, reject)=>{
        
        let sql = 'SELECT u.username, u.email, u.phone, u.address, o.total_amount, o.order_date, o.payment_id FROM users as u INNER JOIN order1 as o ON u.id = o.user_id WHERE o.user_id = ? ORDER BY order_date DESC LIMIT 1'

        db.query(sql, [id], function(err, result){
            if(err){
                console.log('LOI');
                reject(err);
                
            }
            resolve(result[0]); // giá trị trả về của 1 câu truy vấn luôn luôn là 1 array 
        })
    })
}

Payment.handle_payment = function(userId, response){
    const user = require('../commons/variable_global');
    user.id = userId;

    let payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3006/success",
            "cancel_url": "http://localhost:3006/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": []
            },
            "amount": {
                "currency": "USD",
                "total": 0
            },
            "description": "pay your fashion order"
        }]
    };

    let query = 'SELECT * FROM cart WHERE user_id = ?';
    
    db.query(query, [userId], async (error, result)=>{
        if(error){
            console.log('loi 1')
            return response(null);
            
        }else{
            try{
                for(let item of result){

                    let product = await getProductById(item.id_product);
                    payment.transactions[0].item_list.items.push({
                        "name": product.name_product,
                        "sku": product.id_product,
                        "price": product.price,
                        "currency": "USD",
                        "quantity": item.quantity
                    });
                    payment.transactions[0].amount.total += product.price * item.quantity;
                }

                paypal.payment.create(payment, function(error, payment){
                    if(error){
                        return response(null);
                    }else{

                      
                        for(let i=0; i < payment.links.length; i++){
                            if(payment.links[i].rel === 'approval_url'){
                                return response(payment.links[i].href);
                            }
                        }
                    }
                })

            }catch(error){
                return response(null);
            }
        }
    })

}

Payment.success = function({payerId, paymentId}, response){
    const user = require('../commons/variable_global');
    
    let execute = {
        "payer_id": payerId
    };

    paypal.payment.execute(paymentId, execute, function(error, payment){

        if(error){
            return response(null);
        }else{
            try{
                 response("<div style='text-align: center'><h1>Thanh toán hóa đơn thành công</h1><br/><img src='https://cdn-icons-png.flaticon.com/512/148/148767.png' alt='girl' width='300' height='300'></div><a href='#'>return Home page</a>");
                 let query = 'SELECT * FROM cart WHERE user_id = ?';

                 db.query(query, [user.id], async(error, result)=>{
                    if(error){
                        return response(null);
                    }else{
                        let totalAmount = 0;

                        for(let item of result){
                            let product = await getProductById(item.id_product);

                            totalAmount += product.price * item.quantity;
                        }

                        let query = 'INSERT INTO order1 (user_id, payment_id, total_amount, status_id) VALUES (?, ?, ?, ?)';

                        db.query(query, [user.id, paymentId, totalAmount, 1], async (error, result1)=>{
                            if(error){
                                return response(null);
                            }else{
                                    let orderId = result1.insertId;
                                     for(let item of result){
                                        let query = 'INSERT INTO invoice (order_id, id_product, quantity, price) VALUES (?, ?, ?, ?)';

                                        let product = await getProductById(item.id_product);
                                        let numberQuantity = item.quantity * product.price;

                                        db.query(query, [orderId, item.id_product, item.quantity, numberQuantity], (error, result2)=>{
                                            if(error){
                                                return response(null);
                                            }else{
                                                console.log('create invoice success');
                                            }
                                        })
                                     }

                                     let invoiceEmail = await getInvoice(user.id);
                                     sendMail(invoiceEmail);

                                     let query = 'DELETE FROM cart WHERE user_id = ?';
                                     db.query(query, [user.id], (error, result)=>{
                                        if(error){
                                            return response(null);
                                        }else{
                                            console.log("delete cart successful");
                                        }
                                     })
                                   
                                    
                            }
                        })

                    }
                 })
            }catch(error){
                return response(null);
            }
        }

    })
}

    

module.exports = Payment;