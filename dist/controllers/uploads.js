"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retornaImagen = exports.fileUpload = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const actualizar_imagen_1 = require("../helpers/actualizar-imagen");
const fileUpload = (req, res) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['producto'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontro la ruta'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe imagen'
        });
    }
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida',
        });
    }
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    // import {  } from "../dist/uploads/producto/";
    // const path = `C:/Users/Moy Guerrero/Desktop/garageCarAudiob/dist/uploads/${tipo}/${nombreArchivo}`;
    const pathG = path_1.default.join(__dirname, `../uploads/${tipo}/${nombreArchivo}`);
    // const path = `./uploads/${tipo}/${nombreArchivo}`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(pathG, (err) => {
        if (err) {
            console.log(err);
            console.log(path_1.default);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        (0, actualizar_imagen_1.actualizarImagen)(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Archivo guardado',
            nombreArchivo
        });
    });
};
exports.fileUpload = fileUpload;
const retornaImagen = (req, res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    // console.log(`../uploads/${tipo}/${foto}`)
    const pathImg = path_1.default.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (fs_1.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        const pathImg = path_1.default.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
};
exports.retornaImagen = retornaImagen;
//# sourceMappingURL=uploads.js.map