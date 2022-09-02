import { Router } from "express";
import { check } from "express-validator";
import { agregar_usuario, obtener_usuarios } from "../controllers/usuario";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";


const router = Router();



router.post('/agregar_usuario',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los o el apellido(s) es obligatorio').not().isEmpty(),
        check('usuario_', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('rol_idrol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    agregar_usuario);

router.get('/obtener_usuario', validarJWT, obtener_usuarios);


export default router;