"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_1 = require("../controllers/venta");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const expressfileUpload = require('express-fileupload');
const router = (0, express_1.Router)();
router.use(expressfileUpload());
router.post('/agregar-venta', validar_jwt_1.default, venta_1.agregar_venta);
router.post('/buscar-venta', validar_jwt_1.default, venta_1.buscar_venta);
router.get('/descargar/:nombre_tickets', validar_jwt_1.default, venta_1.descargar_ticket);
exports.default = router;
//# sourceMappingURL=venta.js.map