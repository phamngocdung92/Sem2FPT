var User = require("../models/user.model");
var jwt = require("../commons/JWT");
const { response } = require("express");
const jwt2 = require("jsonwebtoken");

require('dotenv').config();
const REFRESH_TOKEN = process.env.REFRESH_TOKEN


var refreshTokenArr = []; // dung de luu token -> check xem co dung la user do dang su dung ko?

exports.list_user = function(req, res){
    User.get_all((data)=>{
        res.send({
            user: data
        })
    })
}

exports.detail_user = function(req, res){
    var id = req.params.id;
    User.getById(id, (data)=>{
        res.send({
            result: data
        })
    })
}

exports.add_user = function(req, res){
    var data = req.body; // dua vao thu vien bodyParse ta co the lay req.body
    User.create(data, (response)=>{
        res.send({result: response});
    })
}

exports.delete_user = function(req, res){
    var id = req.params.id;
    User.remove(id, ()=>{
        res.send({result: response})
    })
}

exports.change_password = function(req, res){
    var data = req.body; // body la gui du lieu len qua Post (trog the form)
    User.Update(data, (response)=>{
        res.send({result: response});
        console.log(response);
    })
}


exports.login = function(req, res){
    var data = req.body;
    User.check_login(data, async function(response){
        if(response){
            const {password, ...others} = response[0];
            const User1 = response[0];
            
            const accesstoken1 = jwt.generateAccessToken(User1);
            const refreshtoken1 = jwt.generateRefreshToken(User1);

            // Thuc hien luu refresh token trong Array -> de can thi bo ra check xem do co chinh la user or Admin ko?
            refreshTokenArr.push(refreshtoken1);

            // luu luon refresh token vao cookie -> cho client luon luc nao can clien co the cam REFRESH Token trong no ra de REFRESH easy hon
            res.cookie("refreshToken", refreshtoken1, {
                httpOnly: true, // cookie ko the truy cap bang js code tren client side, it prevents tan cong cheo trang bang ngon ngu javascript, prevent (XSS) attacks
                secure: false, // neu dat secure la true thi cookie se chi gui qua HTTPS 
                path: "/", // path '/' co nghia la cookie ung dung cho toan domain chu ko phai la 1 trang cu the nao do trong website
                sameSite: "strict", // sameSite 'strict' co nghia la cookie se chi gui di Neu do la: request cua chinh client do va no cung ten mien voi cookie. prevent (CSRF) attacks -> tan cong cheo trang bang request gia mao forgery
            })

            //const token = await jwt.make(response);
            res.send({...others, accesstoken1});
            // tra ve 2 gia tri  1 la token 2 la response
            //-> response se phai ma hoa bang bcriptjs
        }else{
            res.send({result: null});
        }

    });
}

exports.refreshToken = async function(req, res){
    // lay refresh token tu user trong cookie cua no!
    // nhiem vu cua refreshToken tao 2 cai token moi la access - refresh 
    // lay token tu clien gui len!
    const refreshTokenClient = req.cookies.refreshToken; // lay cookies ra nhe

    // neu ko co refreshTokenClient thi chua dang nhap bao yeu cau dang nhap:
    if(!refreshTokenClient){
        return res.send("error! you are not Authenticated!")
    }

    // check xem day co chinh la refresh token cua user do ko? hay la refresh token nao khac ko phai cua no
    if(!refreshTokenArr.includes(refreshTokenClient)){
        return res.send({result: null});
    }

    jwt2.verify(refreshTokenClient, REFRESH_TOKEN, (err, user)=>{
        if(err){
            console.log(err);
            return res.send({result: null});
        }

        refreshTokenArr.filter( (token)=> token != refreshTokenArr ); // lay ra nhung thang nao ma khac voi refreshTokenArr | neu ko co thang nao thi tra ve ko co thang nao!
        // tao 2 cai token moi 
        const newAccessToken = jwt.generateAccessToken(user);
        const newRefreshToken = jwt.generateRefreshToken(user);
        // luu vao mang & luu vao cookie 
        refreshTokenArr.push(newRefreshToken);
        res.cookie("newrefreshtoken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: "strict", 
        });
        res.send({acceessToken: newAccessToken}); // lan nay se chi tra ve access token cho client 

    })
}

exports.logout = async function(req, res){
    // Khi logout -> xoa all token:

    // refresh token trong cookie xoa dau tien:
    res.clearCookie("refreshToken");

    // xoa access token trong redux store ben client

    refreshTokenArr = refreshTokenArr.filter((data)=>data != req.cookies.refreshToken);
    res.send("logged out successfully!")
}