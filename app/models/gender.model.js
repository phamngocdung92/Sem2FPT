const db = require("../commons/connect");

const Gender = function(gender){
    this.id_gender = gender.id_gender;
    this.gender = gender.gender;
    this.image_gender = gender.image_gender;
    this.title_gender = gender.title_gender;
    this.router_link_gender = gender.router_link_gender;
}

Gender.hdl_list_gender = function(result){
    db.query("SELECT * FROM gender", (err, gender)=>{
        if(err || gender.length == 0){
            result(null);
        }else{
            result(gender);
        }
    })
}

Gender.hdl_gender_id = function(id, result){
    db.query("SELECT * FROM gender WHERE id_gender = ?", id, (err, gender)=>{
        if(err || gender.length == 0){
            result(null);
        }else{
            result(gender[0]); // -> lay ve 1 mang 
        }
    })
}

Gender.hdl_add_gender = function(data, result){
    db.query("INSERT INTO gender SET ?", data, (err, gender)=>{
        if(err){
            result(null);
        }else{
            result({
                id: gender.insertId,
                ...data
            })
        }
    })
}

Gender.hdl_delete_gender = function(id, result){
    db.query("DELETE FROM gender WHERE id_gender = ?", id, (err, gender)=>{ //DELETE FROM product WHERE id_product = ?
        if(err){
            result(null);
        }else{
            result("delete gender's id: "+ id + " successfully");
        }
    })
}

Gender.hdl_update_gender = function(data, result){
    db.query("UPDATE gender SET gender=?,image_gender=?,title_gender=?,router_link_gender=? WHERE id_gender=?", [data.gender, data.image_gender, data.title_gender, data.router_link_gender, data.id_gender], (err, gender)=>{
            if(err){
                result(null);
            }else{
                result(data);
            }
    })
}


Gender.hdl_genderProduct = function(result){
    db.query("SELECT * FROM product INNER JOIN gender ON product.id_gender = gender.id_gender", (err, gender)=>{
        if(err || gender.length == 0){
            result(null);
        }else{
            result(gender);
        }
    })
}

Gender.genderProduct_id = function(id, result){
    db.query("SELECT * FROM product INNER JOIN gender ON product.id_gender = gender.id_gender AND product.id_gender=?", id, (err, gender)=>{
        if(err || gender.length == 0){
            result(null);
        }else{
            result(gender[0]); // -> lay ve 1 mang 
        }
    })
}


module.exports = Gender;