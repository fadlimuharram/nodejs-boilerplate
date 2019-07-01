import { Router } from "express";
import passport from "passport";
import BookController from "../../controllers/BookController";

const router = Router();

router.get("/hi", (req, res) => {
  res.send({
    test: "hi"
  });
});
export default router;
