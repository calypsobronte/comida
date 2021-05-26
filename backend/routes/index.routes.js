import { Router } from "express";
const router = Router();

//We load the controller
import * as indexCtr from "../controllers/index.controllers";

//We list the GET, POST, PUT, DELET
router.get('/', indexCtr.indexComida);

export default router;