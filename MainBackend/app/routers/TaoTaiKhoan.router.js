const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Cấu hình kết nối cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'http://localhost:3006/account/create ',
  user: 'root',
  password: '',
  database: 'tao_tai_khoan',
});

// Route xử lý yêu cầu tạo tài khoản
router.post('/account/create', (req, res) => {
  const { username, email, password } = req.body;

  // Kết nối cơ sở dữ liệu
  connection.connect((err) => {
    if (err) {
      console.error('Failed to connect to database:', err);
      res.status(500).json({ message: 'Failed to connect to database' });
      return;
    }

    // Thực hiện truy vấn INSERT để lưu thông tin tài khoản vào cơ sở dữ liệu
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (error, results) => {
      if (error) {
        console.error('Failed to create account:', error);
        res.status(500).json({ message: 'Failed to create account' });
        return;
      }

      console.log('Account created successfully');
      res.status(200).json({ message: 'Account created successfully' });
    });

    // Đóng kết nối sau khi thực hiện truy vấn
    connection.end();
  });
});

module.exports = router;
