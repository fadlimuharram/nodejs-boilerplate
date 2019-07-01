import express from "express";
import Cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import passport from "passport";
import corsOption from "./server/src/config/cors";

const app = express();

console.log(corsOption);

app.options("*", Cors(corsOption));
app.use(Cors(corsOption));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

require("./server/src/config/passport");

const port = process.env.PORT || 8000;

require("./server/routes")(app);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
module.exports = app;
