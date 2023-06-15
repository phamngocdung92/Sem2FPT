const db = require("../commons/connect");
const bcrypt = require('bcryptjs');

const User = function(user){
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
}

// User khai bao khoi tao cac thuoc tinh: get_all, getById... deu la static 

User.get_all = function(result){
    db.query("SELECT id, username, email, isAdmin FROM users", (err, user)=>{
        if(err || user.length == 0){
            result(null);
        }else{
            result(user);
        }
    })
}

User.getById = function(id, result){
    db.query("SELECT username, email FROM users WHERE id = ?", id, (err, user)=>{
        if(err || user.length == 0){
            result(null);
        }else{
            result(user[0]);
        }
    })
}

User.create = async function(data, result){
    try{
        // hash code
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        // create object database
        const user1 = {
            username: data.username,
            email: data.email,
            password: hashedPassword,
            isAdmin: data.isAdmin,
        };

        db.query("INSERT INTO users SET ?",user1, (err, user)=>{
            if(err){
                result(null);
                console.log('loi o day')
            }else{
                result(user.insertId);
            }
        })
    }catch(err){
        result(err);
    }
}

User.remove = function(id, result){
    // xu ly du lieu:
    db.query("DELETE FROM users WHERE id = ?", id, (err, user)=>{
        if(err){
            result(null);
        }else{
            result("user'id: " + id + " had deleted on database"); // result receive 1 object 
        }
    })
}

User.Update = async function(data, result){
    try{
        // hash code
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        // create object database
        const user1 = {
            id: data.id,
            username: data.username,
            email: data.email,
            password: hashedPassword
        };

       db.query("UPDATE users SET username=?,email=?,password=? WHERE id=?", [user1.username, user1.email, user1.password, user1.id], (err, user1)=>{
        if(err){
            result(err, null);
        }else{
            if(user1.affectedRows == 0){
                // Không tìm thấy user với id tương ứng
                result({kind: "not_found"}, null);
            }else{
              result("change is complete")  
            }
            
        }
    })
    }catch(err){
        result(err);
    }
}

User.check_login = function(data, result) {
    try{
        db.query("SELECT * FROM users WHERE email = ?", [data.email], async (err, user)=>{
            if(err || user.length == 0){
                result(null);
                console.log("not found");
            }else{
                console.log(data.password);
                console.log(user[0].password);
                const isMatch = await bcrypt.compare(data.password, user[0].password)
                if(isMatch){
                    result(user);
                }else{
                    result(null);
                    console.log("password wrong");
                }
            }
        })
    }catch(e){
        console.log(e);
        result(e);
    }
};




module.exports = User
