const express = require('express');
const router = express.Router();
const uploadController = require("../controllers/uploadController");

router.get('/upload', uploadController.uploadForm);

router.post("/upload", uploadController.uploadMiddleware, uploadController.uploadFile);

module.exports = router;
