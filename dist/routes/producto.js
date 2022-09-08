"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productos_1 = require("../controllers/productos");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.post('/agregar_producto', [
    validar_jwt_1.default,
    (0, express_validator_1.check)('codigo', 'El codigo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre_producto', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('stock', 'La cantidad es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('talla', 'La talla es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idprecio', 'El precio es obligatorio').not().isEmpty(),
    validar_campos_1.default
], productos_1.agregar_producto);
router.get('/:codigo', validar_jwt_1.default, productos_1.obtener_producto);
router.get('/', validar_jwt_1.default, productos_1.obtener_productos);
exports.default = router;
//# sourceMappingURL=producto.js.map