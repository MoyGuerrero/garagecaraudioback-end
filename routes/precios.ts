import { Router } from "express";
import validarJWT from '../middlewares/validar-jwt';
import { obtener_precios } from '../controllers/precios';



const router = Router();


router.get('/', validarJWT, obtener_precios)





export default router;