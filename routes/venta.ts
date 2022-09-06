import { Router } from 'express';
import { agregar_venta, buscar_venta, descargar_ticket } from '../controllers/venta';
import validarJWT from '../middlewares/validar-jwt';
const expressfileUpload = require('express-fileupload');




const router = Router();


router.use(expressfileUpload());
router.post('/agregar-venta', validarJWT, agregar_venta);
router.post('/buscar-venta', validarJWT, buscar_venta);
router.get('/descargar/:nombre_tickets', validarJWT, descargar_ticket);


export default router;