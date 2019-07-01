import { Router } from "express";
import passport from "passport";
import UserService from "../services/UserService";
import JWT from "../utils/jwt";
const router = Router();

router.post("/registerUser", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const data = {
          username: req.body.username,
          email: req.body.email
        };

        UserService.findOneUserbyEmail(data.email)
          .then(async user => {
            const updatedUser = await user.update({
              username: data.username
            });

            if (updatedUser) {
              res.status(200).json({ message: "user created" });
            } else {
              res.status(400).json({ message: "err" });
            }

            next();
          })
          .catch(error => {
            log.debug(
              "Failed returning from Promise.resolve - v2 properties API"
            );
            res
              .status(500)
              .json({ status: "ERROR", message: "Internal Server error" });
          });
      });
    }
  })(req, res, next);
});

router.post("/loginUser", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      console.log(err);
    }

    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        UserService.findOneUserbyEmail(user.email).then(user => {
          const token = JWT.sign({
            id: user.id,
            email: user.email,
            username: user.username
          });
          res.status(200).send({
            auth: true,
            token,
            message: "user found & logged in"
          });
          next();
        });
      });
    }
  })(req, res, next);
});

router.get("/findUser", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      console.log("user found in db from route");
      res.status(200).send({
        auth: true,
        username: user.username,
        email: user.email,
        message: "user found in db"
      });
    }
    next();
  })(req, res, next);
});

export default router;
