const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const path = require('path');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, res, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

module.exports = {
  uploadForm: async (req, res) => {
      res.render('upload-form');
  },

  uploadFile: async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    try {
      res.json({ message: 'File uploaded successfully', filename: req.file.filename });
    } catch (err) {
      res.status(500).json({ error: 'Failed to upload file' });
    }
  },

  uploadMiddleware: upload.single('file'),
};
