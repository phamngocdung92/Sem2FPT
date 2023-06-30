const db = require("../commons/connect");

const Menu2 = function(menu2){
    this.id_menu2 = menu2.id_menu2;
    this.name_menu2 = menu2.name_menu2;
    this.image_b2 = menu2.image_b2;
    this.title_b2 = menu2.title_b2;
    this.router_link_menu2 = menu2.router_link_menu2;
}

Menu2.hdl_list_menu2 = function(result){
    db.query("SELECT * FROM menu2", (err, menu2)=>{
        if(err || menu2.length == 0){
            result(null);
        }else{
            result(menu2);
        }
    })
}

Menu2.hdl_menu_id2 = function(id, result){
    db.query("SELECT * FROM menu2 WHERE id_menu2 = ?", id, (err, menu2)=>{
        if(err || menu2.length == 0){
            result(null);
        }else{
            result(menu2[0]); // -> lay ve 1 mang 
        }
    })
}

Menu2.hdl_add_menu2 = function(data, result) {
    const query = "INSERT INTO menu2 (id_menu2, name_menu2, title_b2 ,id_menu ,router_link_menu2) VALUES (?, ?, ?,?,?)";
    db.query(query, [data.id_menu2, data.name_menu2, data.title_b2,data.id_menu], (err, menu2) => {
      if (err) {
        result(null);
      } else {
        result({
          id: menu2.insertId,
          ...data
        });
      }
    });
  };
  

Menu2.hdl_delete_menu2 = function(id, result){
    db.query("DELETE FROM menu2 WHERE id_menu2 = ?", id, (err, menu2)=>{ //DELETE FROM product WHERE id_product = ?
        if(err){
            result(null);
        }else{
            result("delete product's id: "+ id + " successfully");
        }
    })
}

Menu2.hdl_update_menu2 = function(data, result){
    db.query("UPDATE menu2 SET name_menu2=?,image_b2=?,title_b2=?,router_link_menu2=? WHERE id_menu2=?", [data.name_menu2, data.image_b2, data.title_b2, data.router_link_menu2, data.id_menu2], (err, menu)=>{
            if(err){
                result(null);
            }else{
                result(data);
            }
    })
}


Menu2.hdl_menuProduct2 = function(result){
    db.query("SELECT * FROM product INNER JOIN menu2 ON product.id_menu2 = menu2.id_menu2", (err, menu2)=>{
        if(err || menu2.length == 0){
            result(null);
        }else{
            result(menu2);
        }
    })
}

Menu2.menuProduct_id2 = function(id, result){
    db.query("SELECT * FROM product INNER JOIN menu2 ON product.id_menu2 = menu2.id_menu2 AND product.id_menu2= ?", id, (err, menu2)=>{
        if(err || menu2.length == 0){
            console.log(err);
            result(null);
        }else{
            result(menu2); // -> lay ve 1 mang 
        }
    })
}



module.exports = Menu2;