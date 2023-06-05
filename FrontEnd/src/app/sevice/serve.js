const express = require('express');
const app = express();

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.term;
  const results = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(results);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
