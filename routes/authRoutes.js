const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/", (req, res) => res.render("index"));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/upload',
  failureRedirect: '/login',
}));

module.exports = router;
