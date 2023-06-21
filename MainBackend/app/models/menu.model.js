const db = require("../commons/connect");

const Menu = function(menu){
    this.id_menu = menu.id_menu;
    this.name_menu = menu.name_menu;
    this.image_b = menu.image_b;
    this.title_b = menu.title_b;
    this.router_link_menu = menu.router_link_menu;
}

Menu.hdl_list_menu = function(result){
    db.query("SELECT * FROM menu", (err, menu)=>{
        if(err || menu.length == 0){
            result(null);
        }else{
            result(menu);
        }
    })
}

Menu.hdl_menu_id = function(id, result){
    db.query("SELECT * FROM menu WHERE id_menu = ?", id, (err, menu)=>{
        if(err || menu.length == 0){
            result(null);
        }else{
            result(menu[0]); // -> lay ve 1 mang 
        }
    })
}

Menu.hdl_add_menu = function(data, result){
    db.query("INSERT INTO menu SET ?", data, (err, menu)=>{
        if(err){
            result(null);
        }else{
            result({
                id: menu.insertId,
                ...data
            })
        }
    })
}

Menu.hdl_delete_menu = function(id, result){
    db.query("DELETE FROM menu WHERE id_menu = ?", id, (err, menu)=>{ //DELETE FROM product WHERE id_product = ?
        if(err){
            result(null);
        }else{
            result("delete menu's id: "+ id + " successfully");
        }
    })
}

Menu.hdl_update_menu = function(data, result){
    db.query("UPDATE menu SET name_menu=?,image_b=?,title_b=?,router_link_menu=? WHERE id_menu=?", [data.name_menu, data.image_b, data.title_b, data.router_link_menu, data.id_menu], (err, menu)=>{
            if(err){
                result(null);
            }else{
                result(data);
            }
    })
}


Menu.hdl_menuProduct = function(result){
    db.query("SELECT * FROM product INNER JOIN menu ON product.id_menu = menu.id_menu", (err, menu)=>{
        if(err || menu.length == 0){
            result(null);
        }else{
            result(menu);
        }
    })
}

Menu.menuProduct_id = function(id, result){
    db.query("SELECT * FROM product INNER JOIN menu ON product.id_menu = menu.id_menu AND product.id_menu=?", id, (err, menu)=>{
        if(err || menu.length == 0){
            result(null);
        }else{
            result(menu); // -> lay ve 1 mang 
        }
    })
}



module.exports = Menu;