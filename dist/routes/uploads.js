"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressfileUpload = require('express-fileupload');
const uploads_1 = require("../controllers/uploads");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.use(expressfileUpload());
router.put('/:tipo/:id', validar_jwt_1.default, uploads_1.fileUpload);
router.get('/:tipo/:foto', uploads_1.retornaImagen);
exports.default = router;
//# sourceMappingURL=uploads.js.map