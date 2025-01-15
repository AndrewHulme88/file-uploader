require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store")(session);
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new PrismaSessionStore({ prisma, sessionModelName: 'Session' }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', uploadRoutes);

app.listen(PORT, () => console.log("App listening on port 3000"));
