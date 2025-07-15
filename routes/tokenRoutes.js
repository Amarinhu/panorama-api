import express from "express";
import { metodoPost } from "../controllers/tokenController.js";

const router = express.Router();

router.post('/', metodoPost);

export default router;