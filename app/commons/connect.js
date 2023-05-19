var mysql = require('mysql');

var connection = mysql.createConnection({ // tao 1 cai component moi 
    host: "localhost",
    user: "root",
    password: "",
    database: "project_last_semester"
});

connection.connect( (err, connection)=>{
    if(err){
        console.log("connect server failt *_* ");
    }
} )

module.exports = connection