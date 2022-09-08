"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const precios_1 = require("../controllers/precios");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.default, precios_1.obtener_precios);
exports.default = router;
//# sourceMappingURL=precios.js.map