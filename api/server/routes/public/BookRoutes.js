import { Router } from "express";
import passport from "passport";
import BookController from "../../controllers/BookController";

const router = Router();

router.get("/", BookController.getAllBooks);
router.post("/", BookController.addBook);

export default router;
