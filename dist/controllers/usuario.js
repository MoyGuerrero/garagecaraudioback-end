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
exports.obtener_usuarios = exports.agregar_usuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const agregar_usuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidos, direccion, telefono, usuario_, password, rol_idrol } = req.body;
    try {
        const existeUsuario = yield usuario_1.default.findOne({ where: { usuario_ } });
        if (existeUsuario !== null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario'
            });
        }
        let datos = {
            nombre,
            apellidos,
            direccion,
            telefono,
            usuario_,
            password,
            rol_idrol
        };
        // Se encripta la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        datos.password = bcryptjs_1.default.hashSync(password, salt);
        const usuarioNuevo = yield usuario_1.default.create(datos);
        res.json({
            ok: true,
            msg: 'Guardado con exito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error,hable con el administrador'
        });
    }
});
exports.agregar_usuario = agregar_usuario;
const obtener_usuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findAll();
        res.json({
            ok: true,
            usuario,
            uid: req.body.id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error,hable con el administrador'
        });
    }
});
exports.obtener_usuarios = obtener_usuarios;
//# sourceMappingURL=usuario.js.map