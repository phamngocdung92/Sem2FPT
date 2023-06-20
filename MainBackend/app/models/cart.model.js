const db = require('../commons/connect');

const Cart = function(Cart){
    this.cart_id = cart.cart_id;
    this.user_id = cart.user_id;
    this.id_product = cart.id_product;
    this.quantity = cart.quantity;
}

Cart.handle_cart = function({userId, productId}, result){
    let query1 = 'SELECT * FROM cart WHERE id_product = ? AND user_id = ?';

    db.query(query1, [productId, userId], (err, data)=>{
        if(err){
            return result(null);
        }else{
            if(data.length > 0){
                let quantity = data[0].quantity+1;
                let query2 = 'UPDATE cart SET quantity = ? WHERE id_product = ? AND user_id = ?';

                db.query(query2, [quantity, productId, userId], (err, data)=>{
                    if(err){
                        return result(null)
                    }else{
                        return result("add product success");
                    }
                })
            }else{
                let query3 = 'INSERT INTO cart (user_id, id_product, quantity) VALUES(?, ?, ?)';
                db.query(query3, [userId, productId, 1], (err, data)=>{
                    if(err){
                        return result(null);
                    }else{
                        return result('successfull added product to cart');
                    }
                })
            }
        }
    })
}

Cart.getCart_user = function(userId, result){
    console.log(userId);
    let query1 = 'CALL find_cart_product(?, @b)';
    db.query(query1, [userId], (err, data)=>{
        if(err){
            console.log('fail');
            return result(null);
        }else{
            return result(data[0]);
        }
    })
}

Cart.delete_all = function(userId, result){
    let query1 = 'SELECT p.name_product, c.quantity FROM product as p INNER JOIN cart as c ON p.id_product = c.id_product WHERE c.user_id = ?';
    db.query(query1, [userId], (err, data)=>{
        if(err){
            return result(null);
        }else{
            if(data.length > 0){
                let query2 = 'DELETE FROM cart WHERE user_id = ?';
                db.query(query2, [userId], (err, data)=>{
                    if(err){
                        return result(null);
                    }else{
                        return result('delete all product in your cart success');
                    }
                })
            }else{
                return result(null);
            }

        }
    })
}

Cart.decrease_amount = function({userId, productId}, result){

    let query1 = 'SELECT * FROM cart WHERE id_product = ? AND user_id = ?';

    db.query(query1, [productId, userId], (err, data)=>{
        if(err){
            return result(null);
        }else{
            try{
                if(data.length>0){
                    let quantity = data[0].quantity;
                    if(quantity > 1){
                        let quantity1 = data[0].quantity - 1;
                        let query2 = 'UPDATE cart SET quantity = ? WHERE id_product = ? AND user_id = ?';
                        db.query(query2, [quantity1, productId, userId], (err, data)=>{
                            if(err){
                                return result(null);
                            }else{
                                result('decrease amount done!');
                            }
                        })
                    }else{
                        let query3 = 'DELETE FROM cart WHERE id_product = ? AND user_id = ?';
                        db.query(query3, [productId, userId], (err, data)=>{
                            if(err){
                                return result(null);
                            }else{
                                result('delete product form cart done!')
                            }
                        })
                    }
                }

            }catch(err){
                return result(null);
            }
        }
    })

}

Cart.delete_product = function( {userId, productId}, result ){

    let query3 = 'DELETE FROM cart WHERE id_product = ? AND user_id = ?';

    db.query(query3, [productId, userId], (err, data)=>{
        if(err){
            return result(null);
        }else{
            return result('delete success');
        }
    })

}

Cart.data_admin = function(result){
    let query = 'CALL history_order(@b)';
    db.query(query, (err, data)=>{
        if(err){
            return result(null);
        }else{
            return result(data[0]);
        }
    })
}

module.exports = Cart;
