const db = require("../commons/connect");

const Category = function(category){
    this.id_category = category.id_category;
    this.name_category = category.name_category;
    this.image_category = category.image_category;
    this.title_category = category.title_category;
    this.router_link_category = category.router_link_category;
}

Category.hdl_list_category = function(result){
    db.query("SELECT * FROM category", (err, category)=>{
        if(err || category.length == 0){
            result(null);
        }else{
            result(category);
        }
    })
}

Category.hdl_category_id = function(id, result){
    db.query("SELECT * FROM category WHERE id_category = ?", id, (err, category)=>{
        if(err || category.length == 0){
            result(null);
        }else{
            result(category[0]); // -> lay ve 1 mang 
        }
    })
}

Category.hdl_add_category = function(data, result){
    db.query("INSERT INTO category SET ?", data, (err, category)=>{
        if(err){
            result(null);
        }else{
            result({
                id: category.insertId,
                ...data
            })
        }
    })
}

Category.hdl_delete_category = function(id, result){
    db.query("DELETE FROM category WHERE id_category = ?", id, (err, category)=>{ //DELETE FROM product WHERE id_product = ?
        if(err){
            result(null);
        }else{
            result("delete category's id: "+ id + " successfully");
        }
    })
}

Category.hdl_update_category = function(data, result){
    db.query("UPDATE category SET name_category=?,image_category=?,title_category=?,router_link_category=? WHERE id_category=?", [data.name_category, data.image_category, data.title_category, data.router_link_category, data.id_category], (err, category)=>{
            if(err){
                result(null);
            }else{
                result(data);
            }
    })
}


Category.hdl_categoryProduct = function(result){
    db.query("SELECT * FROM product INNER JOIN category ON product.id_category = category.id_category", (err, category)=>{
        if(err || category.length == 0){
            result(null);
        }else{
            result(category);
        }
    })
}

Category.categoryProduct_id = function(id, result){
    db.query("SELECT * FROM product INNER JOIN category ON product.id_category = category.id_category AND product.id_category=?", id, (err, category)=>{
        if(err || category.length == 0){
            result(null);
        }else{
            result(category[0]); // -> lay ve 1 mang 
        }
    })
}



module.exports = Category;