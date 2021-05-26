import { Router } from "express";
import multipart from "connect-multiparty"
const router = Router();

const multipartMiddleware = multipart({ uploadDir: "./uploads" }); //Donde se guardo la imagen

//We load the controller
import * as comidaCtr from "../controllers/comida.controllers";

//We list the GET, POST, PUT, DELET
router.get("/", comidaCtr.getComida);
router.post("/", comidaCtr.createComida);
router.post("/image/:id", multipartMiddleware, comidaCtr.savedImage);
router.get("/imageView/:nomimage", comidaCtr.getImage);
router.delete("/:id", comidaCtr.deleteComida);

export default router;