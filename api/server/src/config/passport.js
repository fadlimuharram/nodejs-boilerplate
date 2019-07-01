import bcrypt from "bcrypt";
import UserService from "../../services/UserService";
import fs from "fs";
import path from "path";

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/user");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwtSecret = process.env.JWT_SECRET_KEY;
const BCRYPT_SALT_ROUNDS = 12;
const publicKey = fs.readFileSync(
  path.resolve(__dirname + "/../../utils/jwt/public.key"),
  "utf8"
);

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      try {
        UserService.findOneUserbyEmail(email).then(user => {
          if (user !== null) {
            return done(null, false, { message: "username already taken" });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashPassword => {
              UserService.addUser({
                email,
                password: hashPassword
              }).then(user => {
                return done(null, user);
              });
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      try {
        UserService.findOneUserbyEmail(email).then(user => {
          if (user === null) {
            console.log("not match");
            return done(null, false, { message: "password do not match" });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log("password do not match");
                return done(null, false, { message: "passwords do not match" });
              }
              console.log("found");
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  issuer: process.env.ISSUER || $Option.issuer,
  subject: process.env.SUBJECT || $Option.subject,
  audience: process.env.AUDIENCE || $Option.audience,
  expiresIn: "30d",
  algorithm: ["RS256"]
};

passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    try {
      UserService.findOneUserbyEmail(jwt_payload.email).then(user => {
        if (user) {
          console.log("user found");
          done(null, user);
        } else {
          console.log("user not found");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
