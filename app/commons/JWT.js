const jwt = require("jsonwebtoken");
const _App = require("./_App");

// tao token: de check xem da dang nhap chua?

let make = function(user){ // co the vao model tao kieu du lieu cho user import vao day va su dung kieu du lieu do cho tham so dau vao
return new Promise( (resolve, reject)=>{
    jwt.sign({data:user}, _App.ACCESS_TOKEN, {
        algorithm: "HS256",
        expiresIn: _App.TOKEN_TIME_LIFE,
    }, function(err, _token){
        if(err){
            return reject(err);
        }
        return resolve(_token);
    }
    )
} )
};

// check xem da dang nhap chua?

let check = function(token){
    return new Promise( (resolve, reject)=>{
        jwt.verify(token, _App.ACCESS_TOKEN, function(err, data){
            if(err){
                return reject(err);
            }else{
                return resolve(data);
            }
        })
    } )
}




//GENERATE ACCESS TOKEN TO decentralization

 let generateAccessToken = function(user1){
    return jwt.sign(
        {
            id: user1.id,
            admin: user1.isAdmin
        }, _App.ACCESS_TOKEN, {
            algorithm: "HS256",
            expiresIn: _App.TOKEN_TIME_LIFE,
        }
    )
    
}

//GENERATE REFRESH TOKEN TO decentralization
function generateRefreshToken(user1){
    return jwt.sign({
        id: user1.id,
        admin: user1.isAdmin
    }, _App.REFRESH_TOKEN, {
        algorithm: "HS256",
        expiresIn: _App.TOKEN_REFRESH_TIME_LIFE,
    }
    )
}

module.exports = {
    make: make,
    check: check,
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken
}
