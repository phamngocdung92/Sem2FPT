const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const { json } = require('body-parser');

app.use(bodyParser.json());
//
// app.use(express, json());
//
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//
app.use(cors());

//use express static folder
app.use(express.static('./public'));
//

var vietnamRouter = require('./Routes/VietNam');

app.use('/api/vietnam', vietnamRouter);
//
var jaPanRouter = require('./Routes/NhatBan');

app.use('/api/japan', jaPanRouter);
//
var chiNaRouter = require('./Routes/China');

app.use('/api/china', chiNaRouter);

//create connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running at port http://localhost:${PORT}`)
);
