import express from "express";
import path from "path";
import { agenteInfo } from "../utils/agenteInfo.js";

const router = express.Router();

router.get('/', (req, res) => {
    agenteInfo(req, 'DOC');
    res.sendFile(path.resolve('./doc/doc.html'))
});

export default router;