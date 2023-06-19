const jwt = require("jsonwebtoken");
require('dotenv').config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const TOKEN_TIME_LIFE = process.env.TOKEN_TIME_LIFE
const TOKEN_REFRESH_TIME_LIFE = process.env.TOKEN_REFRESH_TIME_LIFE
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY

// tao token: de check xem da dang nhap chua?

let make = function(user){ // co the vao model tao kieu du lieu cho user import vao day va su dung kieu du lieu do cho tham so dau vao
return new Promise( (resolve, reject)=>{
    jwt.sign({data:user}, ACCESS_TOKEN, {
        algorithm: JWT_ACCESS_KEY,
        expiresIn: TOKEN_TIME_LIFE,
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
        jwt.verify(token, ACCESS_TOKEN, function(err, data){
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
            admin: user1.admin
        }, ACCESS_TOKEN, {
            algorithm: JWT_ACCESS_KEY,
             expiresIn: TOKEN_TIME_LIFE
        }
    )
    
}

//GENERATE REFRESH TOKEN TO decentralization
function generateRefreshToken(user1){
    return jwt.sign({
        id: user1.id,
        admin: user1.admin
    }, REFRESH_TOKEN, {
        algorithm: JWT_ACCESS_KEY,
        expiresIn: TOKEN_REFRESH_TIME_LIFE,
    }
    )
}

function generateRefreshTokenForAccess(user1){
    return jwt.sign({
        id: user1.id,
        admin: user1.admin
    }, ACCESS_TOKEN, {
        algorithm: JWT_ACCESS_KEY,
        expiresIn: TOKEN_REFRESH_TIME_LIFE,
    }
    )
}

module.exports = {
    make: make,
    check: check,
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken,
    generateRefreshTokenForAccess: generateRefreshTokenForAccess
}
