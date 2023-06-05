const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  // Lấy thông tin tài khoản từ request body
  const { email, password } = req.body;

  // Lưu thông tin tài khoản vào cơ sở dữ liệu (trong trường hợp này, PHPMyAdmin)
  // Thực hiện các xử lý bổ sung, ví dụ: kiểm tra email đã tồn tại hay chưa, mã hóa mật khẩu, v.v.

  // Trả về phản hồi thành công
  res.json({ success: true, message: 'User registered successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
