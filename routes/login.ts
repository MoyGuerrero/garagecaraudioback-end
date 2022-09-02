import { Router } from "express";
import { acceder } from "../controllers/login";
import { check } from 'express-validator';
import validarCampos from "../middlewares/validar-campos";



const router = Router();

router.post('/acceder',
    [
        check('usuario_', "El usuario es obligatorio").not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    acceder);





export default router;