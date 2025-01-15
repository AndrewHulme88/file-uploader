const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

router.get('/upload', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.send('<form method="post" enctype="multipart/form-data" action="/upload">' +
           '<input type="file" name="file" />' +
           '<button type="submit">Upload</button>' +
           '</form>');
});

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.send(`File uploaded: ${req.file.filename}`);
});

module.exports = router;
