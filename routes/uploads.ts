import { Router } from "express";
const expressfileUpload = require('express-fileupload');
import { fileUpload, retornaImagen } from "../controllers/uploads";
import validarJWT from "../middlewares/validar-jwt";



const router = Router();
router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);


router.get('/:tipo/:foto', retornaImagen);


export default router;