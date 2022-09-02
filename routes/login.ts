import { Router } from "express";
import { acceder, renewToken } from "../controllers/login";
import { check } from 'express-validator';
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";



const router = Router();

router.post('/acceder',
    [
        check('usuario_', "El usuario es obligatorio").not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    acceder);

router.get('/renew', validarJWT, renewToken);




export default router;