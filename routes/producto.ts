import { Router } from "express";
import { check } from "express-validator";
import { agregar_producto, obtener_producto, obtener_productos } from "../controllers/productos";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";


const router = Router();



router.post('/agregar_producto',
    [
        validarJWT,
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('nombre_producto', 'El nombre es obligatorio').not().isEmpty(),
        check('stock', 'La cantidad es obligatorio').not().isEmpty(),
        check('talla', 'La talla es obligatorio').not().isEmpty(),
        check('idprecio', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    agregar_producto);

router.get('/:codigo', validarJWT, obtener_producto);
router.get('/', validarJWT, obtener_productos);


export default router;