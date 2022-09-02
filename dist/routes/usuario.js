"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.post('/agregar_usuario', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidos', 'Los o el apellido(s) es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('usuario_', 'El usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('rol_idrol', 'El rol es obligatorio').not().isEmpty(),
    validar_campos_1.default
], usuario_1.agregar_usuario);
router.get('/obtener_usuario', validar_jwt_1.default, usuario_1.obtener_usuarios);
exports.default = router;
//# sourceMappingURL=usuario.js.map