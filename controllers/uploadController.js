const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  uploadForm: (req, res) => {
    res.render("upload-form");
  }
};
