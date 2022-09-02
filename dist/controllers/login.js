"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.acceder = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const acceder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_, password } = req.body;
    try {
        const existeUsuario = yield usuario_1.default.findOne({ where: { usuario_ } });
        if (existeUsuario === null) {
            return res.status(404).json({
                ok: false,
                msg: 'No encontro el usuario'
            });
        }
        const passwordValid = bcryptjs_1.default.compareSync(password, existeUsuario.getDataValue('password'));
        if (!passwordValid) {
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        if (!existeUsuario.getDataValue('activo')) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario dado de baja'
            });
        }
        const token = yield (0, jwt_1.default)(existeUsuario.getDataValue('id'));
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
});
exports.acceder = acceder;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const token = yield (0, jwt_1.default)(id);
        const usuario = yield usuario_1.default.findByPk(id);
        res.json({
            ok: true,
            token,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=login.js.map