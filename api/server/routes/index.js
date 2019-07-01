import passport from "passport";
import BookRoutesPublic from "./public/BookRoutes";
import BookRoutesPrivate from "./private/BookRoutes";
import AuthRoutes from "./AuthRoutes";

module.exports = function(app) {
  app.use("/api/v1/books", BookRoutesPublic);
  app.use(
    "/api/v1/books",
    passport.authenticate("jwt", { session: false }),
    BookRoutesPrivate
  );
  app.use("/auth", AuthRoutes);

  app.get("*", (req, res) =>
    res.status(200).send({
      message: "Welcome to this API."
    })
  );
};
