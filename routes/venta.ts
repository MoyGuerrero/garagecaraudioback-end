import { Router } from 'express';
import { agregar_venta } from '../controllers/venta';
import validarJWT from '../middlewares/validar-jwt';
const expressfileUpload = require('express-fileupload');




const router = Router();


router.use(expressfileUpload());
router.post('/agregar-venta', validarJWT, agregar_venta);


export default router;