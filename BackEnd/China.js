const express = require('express');
//var db = require('../models/db');
var router = express.Router();

// const mysql = require('mysql');
const db = require('../models/db');
// const dbConfig = require('./config/db.config');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './public/images'); // './public/images/' directory name where save the file
  },
  //
  fileFilter: (req, file, callBack) => {
    var ext = path.extname(file.originalname);
    if (ext !== '.png') {
      return callBack(new Error('Only images are allowed'));
    }
  },

  //
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});
router.get('/', (req, res) => {
  let sql = `SELECT * FROM china`;
  db.query(sql, (err, data) => {
    if (err) throw err;

    res.json(data);
  });
});
module.exports = router;


router.post('/', upload.single('image'), (req, res) => {
  const { title, introduce, content } = req.body;

  if (!req.file) {
    consol.log('No file upload');
  } else {
    const typeFile = req.file.mimetype;
    if (
      typeFile === 'image/jpeg' ||
      typeFile === 'image/png' ||
      typeFile === 'image/gif'
    ) {
      console.log(req.file.mimetype);
      console.log(req.file);
      var imgSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
      //console.log(imgSrc);
      var sql =
        'INSERT INTO china(image,Title,Introduce,Content)VALUES(?,?,?,?)';
      db.query(sql, [imgSrc, title, introduce, content], (err, result) => {
        if (err) throw err;
        res.json({
          title,
          introduce,
          content,
          image_url: `http://127.0.0.1:3000/images/${req.file.originalname}`,
        });
        console.log('file uploaded');
        // res.json({ message: 'Upload image success' });
      });
    } else {
      res.json({
        message: 'Upload data failed',
      });
    }
  }
});



















module.exports = router;
//Router update data
//
router.put('/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { title, introduce, content } = req.body;

  if (!req.file) {
    consol.log('No file upload');
  } else {
    const typeFile = req.file.mimetype;
    if (
      typeFile === 'image/jpeg' ||
      typeFile === 'image/png' ||
      typeFile === 'image/gif'
    ) {
      console.log(req.file.mimetype);
      console.log(req.file);

      var imgSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
      //console.log(imgSrc);
      var sql =
        'UPDATE china SET Title=? ,Introduce=? , Content=?,image=? WHERE id=?';

      db.query(
        sql,
        [title, introduce, content, imgSrc, id],

        (err, result) => {
          if (err) throw err;
          res.json({
            title,
            introduce,
            content,
            image: `http://127.0.0.1:3000/images/${req.file.originalname}`,
            id,
          });

          console.log('file uploaded');
          res.json({ message: 'Upload image success' });
        }
      );
    } else {
      res.json({
        message: 'Upload data failed',
      });
    }
  }
});

//Router delete data
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'DELETE FROM china WHERE id = ?';
  db.query(sql, id, (err) => {
    if (err) throw err;
    res.json({ msg: 'Đã xóa thành công' });
  });
});
// //
router.get('/:id', function(req, res, next) {
  let id=req.params.id;      
  let sql = 'SELECT * FROM china WHERE id = ?'    
  db.query(sql, id, (err, d) => {
     res.json(d[0]);
  });   
})
