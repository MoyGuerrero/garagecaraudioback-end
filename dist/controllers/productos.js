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
exports.obtener_producto = exports.agregar_producto = void 0;
const precio_1 = __importDefault(require("../models/precio"));
const producto_1 = __importDefault(require("../models/producto"));
const agregar_producto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, nombre_producto, stock, talla, img, idprecio } = req.body;
    try {
        const existeProducto = yield producto_1.default.findOne({ where: { codigo } });
        if (existeProducto !== null) {
            yield producto_1.default.update({ stock: existeProducto.getDataValue('stock') + stock }, { where: { id: existeProducto.getDataValue('id') } });
            return res.json({
                ok: true,
                msg: 'Actualizado con exito'
            });
        }
        const productoNuevo = yield producto_1.default.create(req.body);
        res.json({
            ok: true,
            msg: 'Agregado con exito',
            productoNuevo
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
exports.agregar_producto = agregar_producto;
const obtener_producto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codigo = req.params.codigo;
        producto_1.default.belongsTo(precio_1.default, { foreignKey: 'idprecio' });
        precio_1.default.hasMany(producto_1.default, { foreignKey: 'id' });
        const producto = yield producto_1.default.findOne({ where: { codigo }, include: [{ model: precio_1.default }] });
        res.json({
            ok: true,
            producto
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
exports.obtener_producto = obtener_producto;
//# sourceMappingURL=productos.js.map