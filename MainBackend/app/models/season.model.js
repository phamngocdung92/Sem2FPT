const db = require("../commons/connect");

const Season = function(season){
    this.id_season = season.id_season;
    this.name_season = season.name_season;
    this.image_season = season.image_season;
    this.title_season = season.title_season;
    this.router_link_season = season.router_link_season;
}

Season.hdl_list_season = function(result){
    db.query("SELECT * FROM season", (err, season)=>{
        if(err || season.length == 0){
           return result(null);
        }else{
           return result(season);
        }
    })
}

Season.hdl_season_id = function(id, result){
    db.query("SELECT * FROM season WHERE id_season = ?", id, (err, season)=>{
        if(err || season.length == 0){
            return result(null);
        }else{
            return result(season[0]); // -> lay ve 1 mang
        }
    })
}

Season.hdl_add_season = function(data, result){
    db.query("INSERT INTO season SET ?", data, (err, season)=>{
        if(err){
            return result(null);
        }else{
            return result({
                id: season.insertId,
                ...data
            })
        }
    })
}

Season.hdl_delete_season = function(id, result){
    db.query("DELETE FROM season WHERE id_season = ?", id, (err, season)=>{ //DELETE FROM product WHERE id_product = ?
        if(err){
            return result(null);
        }else{
            return result("delete menu's id: "+ id + " successfully");
        }
    })
}

Season.hdl_update_season = function(data, result){
    db.query("UPDATE season SET name_season=?,image_season=?,title_season=?,router_link_season=? WHERE id_season=?", [data.name_season, data.image_season, data.title_season, data.router_link_season, data.id_season], (err, season)=>{
            if(err){
                return result(null);
            }else{
                return result(data);
            }
    })
}


Season.hdl_seasonProduct = function(result){
    db.query("SELECT * FROM product INNER JOIN season ON product.id_season = season.id_season", (err, season)=>{
        if(err || season.length == 0){
            return result(null);
        }else{
            return result(season);
        }
    })
}

Season.seasonProduct_id = function(id, result){
    db.query("SELECT * FROM product INNER JOIN season ON product.id_season = season.id_season AND product.id_season=?", id, (err, season)=>{
        if(err || season.length == 0){
            return result(null);
        }else{
            return result(season); // -> lay ve 1 mang
        }
    })
}



module.exports = Season;
