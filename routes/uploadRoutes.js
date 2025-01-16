const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const uploadController = require("../controllers/uploadController");

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

router.get('/upload', uploadController.uploadForm);

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.send(`File uploaded: ${req.file.filename}`);
});

module.exports = router;
