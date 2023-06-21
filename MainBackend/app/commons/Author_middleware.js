var jwt = require("./JWT");
const jwt1 = require("jsonwebtoken");

require('dotenv').config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN

let isAuthor = async function(req, res, next){
    var _token = req.headers.authorization; // lay token

    if(_token){
        try{
            var authData = await jwt.check(_token);

            req.auth = authData;
            // object req -> tao 1 thuoc tinh static la: "auth" co du lieu la "authData"
            // vi la tao thuoc tinh static tu object req -> nen cac routers khac deu co the su dung!
            next();
        }catch(err){
            return res.send({data: "token is not match together"});
        }
    }else{
        return res.send({ data: "you don't have token to send" });
    }
}

// ban da login hay chua?

let verifyToken = async (req, res, next) =>{ 
    const token1 = req.headers.token;
    if(token1){
        // su dung try catch bat loi -> tranh sap server
        try{
            // khi post ma token trong req.headers ta se gui 1 doan ma token len
            const accesstoken = token1.split(" ")[1]; // bearer matoken... -> split tach bearer & matoken... thanh 2 chuoi 
            jwt1.verify(accesstoken, ACCESS_TOKEN, (err, user)=>{
                if(err){
                    return res.send("token invalid");
                }
                req.user = user; // luu gia tri tra ve cua accesstoken -> chua inform client login -> doi tuong nay se duoc gan cho req.user de su dung trong cac yeu cau tiep theo
                console.log(user);
                next();
            })
        }catch(e){
            return res.send({data: "your token is not match together"});
        }
    }else{
        return res.send("you are not authenticated");
    }
};

// BAN CO PHAI LA ADMIN KO?
let verifyTokenIsAdmin = async (req, res, next)=>{
    verifyToken(req, res, ()=>{
        //req.user da duoc luu gia tri o tren bay h lay ra de so sanh! 
        console.log(req.user);
        if(req.user.admin == 1){
            // id cua token ma == voi id cua params gui len 
            next();
        }else{
            return res.send("you are not admin!");
        }
    })
}

// ban muon xoa 1 element && admin muon xoa 1 element
let verifyTokenIsAdminOrIsUser = async (req, res, next)=>{
    verifyToken(req, res, ()=>{
        //req.user da duoc luu gia tri o tren bay h lay ra de so sanh! 
        if(req.user.id == req.params.id || req.user.admin == 1){ 
            // id cua token ma == voi id cua params gui len la id ma ta muon xoa ta gui len params
            next();
        }else{
            return res.send("you are not allow to delete others!");
        }
    })
}


module.exports = {
    isAuthor: isAuthor,
    verifyToken: verifyToken,
    verifyTokenIsAdmin: verifyTokenIsAdmin,
    verifyTokenIsAdminOrIsUser: verifyTokenIsAdminOrIsUser
}
