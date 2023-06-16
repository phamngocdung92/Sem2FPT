const db = require("../commons/connect");
const bcrypt = require('bcryptjs');

const User = function(user){
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
    this.phone = user.phone;
    this.address = user.address;
}

// User khai bao khoi tao cac thuoc tinh: get_all, getById... deu la static 

User.get_all = function(result){
    db.query("SELECT id, username, email FROM users", (err, user)=>{
        if(err || user.length == 0){
            return result(null);
        }else{
            return result(user);
        }
    })
}

User.getById = function(id, result){
    db.query("SELECT username, email FROM users WHERE id = ?", id, (err, user)=>{
        if(err || user.length == 0){
            return result(null);
        }else{
            return result(user[0]);
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

        db.query("INSERT INTO users(username, email, password, isAdmin) VALUES(?, ?, ?, ?)", [user1.username, user1.email, user1.password, user1.isAdmin], (err, user)=>{
            if(err){
               return result(null);
            }else{
               return result('create account successful');
            }
        })
    }catch(err){
      return result(1);
    }
}

User.remove = function(id, result){
    // xu ly du lieu:
    db.query("DELETE FROM users WHERE id = ?", id, (err, user)=>{
        if(err){
            return result(null);
        }else{
            return result("user'id: " + id + " had deleted on database"); // result receive 1 object 
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
            password: hashedPassword,
            phone: data.phone,
            address: data.address
        };

       db.query("UPDATE users SET username=?,email=?,password=?,phone=?,address=? WHERE id=?", [user1.username, user1.email, user1.password, user1.phone, user1.address, user1.id], (err, user1)=>{
        if(err){
            return result(err, null);
        }else{
            if(user1.affectedRows == 0){
                // Không tìm thấy user với id tương ứng
                return result({kind: "not_found"}, null);
            }else{
                return result("change is complete")  
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
                return result(null);
            }else{
                const isMatch = await bcrypt.compare(data.password, user[0].password)
                if(isMatch){
                    return result(user);
                }else{
                    return result(null);
                }
            }
        })
    }catch(e){
        console.log(e);
        return result(e);
    }
};




module.exports = User
