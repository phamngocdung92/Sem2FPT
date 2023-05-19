const db = require("../commons/connect");

const Product = function(product){
    this.id_product = product.id_product;
    this.name_product = product.name_product;
    this.image_product = product.image_product;
    this.title_product = product.title_product;
    this.quantity_product = product.quantity_product;
    this.description_product = product.description_product;
    this.id_gender = product.id_gender;
    this.id_category = product.id_category;
    this.id_season = product.id_season;
    this.id_menu = product.id_menu;
    this.id_menu2 = product.id_menu2;
    this.price = product.price;
    this.routerLink_product_detail = product.routerLink_product_detail;
}

Product.getAll = function(result){
    db.query("SELECT * FROM product", (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product);
        }
    })
}

Product.getById = function(id, result){
    db.query("SELECT * FROM product WHERE id_product = ?", id, (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product[0]); // -> lay ve 1 mang 
        }
    })
}

Product.create = function(data, result){
    db.query("INSERT INTO product SET ?", data, (err, product)=>{
        if(err){
            result(null);
        }else{
            result({
                id: product.insertId,
                ...data
            })
        }
    })
}

Product.remove = function(id, result){
    db.query("DELETE FROM product WHERE id_product = ?", id, (err, product)=>{
        if(err){
            result(null);
        }else{
            result("delete product's id: "+ id + " successfully");
        }
    })
}

Product.update = function(data, result){
    db.query("UPDATE product SET name_product= ?, image_product= ?, title_product= ?, quanity_product= ?, description_product= ?, id_gender= ?, id_category= ?, id_season= ?, id_menu= ?, id_menu2= ?, price= ?, routerLink_product_detail= ? WHERE id_product= ?", 
    [data.name_product, data.image_product, data.title_product, data.quanity_product, data.description_product, data.id_gender, data.id_category, data.id_season, data.id_menu, data.id_menu2, data.price, data.routerLink_product_detail, data.id_product], 
    (err, p)=>{
        if(err){
            result(null);
        }else{
            result(p);
        }
    })
}

Product.search = function(query1, limit, offset, data){
    let sql = `
        SELECT * FROM product WHERE name_product LIKE '%${query1}%' OR title_product LIKE '%${query1}%' OR description_product LIKE '%${query1}%' OR price LIKE '%${query1}%' LIMIT ${limit} OFFSET ${offset}
    `;
    db.query(sql, (err, result)=>{
        if(err){
            data(err);
        }else{
            data(result);
        }
    })
}

Product.p_5 = function(result){
    db.query("SELECT * FROM product WHERE price > 5000", (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product);
        }
    })
}

Product.p_4 = function(result){
    db.query("SELECT * FROM product WHERE price BETWEEN 4000 AND 5000", (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product);
        }
    })
}
Product.p_3 = function(result){
    db.query("SELECT * FROM Product WHERE price BETWEEN 3000 AND 4000", (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product);
        }
    })
}
Product.p_2 = function(result){
    db.query("SELECT * FROM Product WHERE price BETWEEN 2000 AND 3000", (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product);
        }
    })
}

Product.p_1 = function(result){
    db.query("SELECT * FROM Product WHERE price <= 2000", (err, product)=>{
        if(err || product.length == 0){
            result(null);
        }else{
            result(product);
        }
    })
}



module.exports = Product