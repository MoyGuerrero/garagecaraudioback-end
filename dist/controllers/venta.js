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
exports.descargar_ticket = exports.buscar_venta = exports.agregar_venta = void 0;
const fs_1 = __importDefault(require("fs"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const venta_1 = __importDefault(require("../models/venta"));
const venta_productos_1 = __importDefault(require("../models/venta_productos"));
const sequelize_1 = require("sequelize");
const producto_1 = __importDefault(require("../models/producto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const agregar_venta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto, importe, idusuario } = req.body;
    try {
        let body = '';
        let total = 0;
        producto.forEach((element) => {
            body += '<tr>' +
                '<td>' + element.cantidad + '</td>' +
                '<td>' + element.nombre + '</td>' +
                '<td>' + element.precio + '</td>' +
                '</tr>';
            let subtotal = (element.precio * element.cantidad);
            total += subtotal;
        });
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        var fechahoy = localISOTime.replace('T', ' ').split('.')[0];
        var fechaGuardarBD = fechahoy.split(' ')[0];
        let cambio = importe - total;
        var nombreArchivoTicket = 'venta-' + localISOTime.replace('T', ' ').split('.')[0].replace(' ', '-').replace(':', '-').replace(':', '-');
        // const pathViejo = path.join(__dirname, `../template/ticket.html`);
        let html = fs_1.default.readFileSync('C:/Users/Moy Guerrero/Desktop/garageCarAudiob/templates/ticket.html', 'utf-8');
        html = html.replace('_CUERPO_VENTA_', body);
        html = html.replace('_TOTAL_', total.toString());
        html = html.replace('_IMPORTE_', importe);
        html = html.replace('_CAMBIO_', cambio.toFixed(2).toString());
        html = html.replace('_FECHA_', fechahoy);
        const options = {
            "height": "200mm",
            "width": "60mm", // allowed units: mm, cm, in, px
        };
        let path = 'C:/File/tickets';
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path, { recursive: true });
        }
        html_pdf_1.default.create(html, options).toFile(path + '/' + nombreArchivoTicket + '.pdf', (err, _result) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    ok: false,
                    msg: 'No se pudo guardar el pdf'
                });
            }
        });
        let datosVenta = {
            total,
            fecha: fechaGuardarBD,
            nombre_tickets: nombreArchivoTicket + '.pdf',
            idusuario
        };
        const venta = venta_1.default.build(datosVenta);
        yield venta.save();
        let idVentaProducto = yield venta_productos_1.default.findAll({
            attributes: [[sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('id')), 'id']]
        });
        let ventaProductoID = idVentaProducto[0].getDataValue('id') + 1;
        let idventa = venta.getDataValue('id');
        for (let i = 0; i < producto.length; i++) {
            let datosVentaDetalle = {
                id: ventaProductoID,
                idventa,
                idproducto: producto[i].id,
                cantidad: producto[i].cantidad
            };
            yield venta_productos_1.default.create(datosVentaDetalle);
            const actualizarStock = yield producto_1.default.findOne({ where: producto[i].id });
            yield producto_1.default.update({ stock: (actualizarStock === null || actualizarStock === void 0 ? void 0 : actualizarStock.getDataValue('stock')) - producto[i].cantidad }, { where: { id: producto[i].id } });
        }
        res.json({
            ok: true,
            cambio
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
exports.agregar_venta = agregar_venta;
const buscar_venta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { inicio, fin } = req.body;
    try {
        venta_1.default.belongsTo(usuario_1.default, { foreignKey: 'idusuario' });
        usuario_1.default.hasMany(venta_1.default, { foreignKey: 'id' });
        const venta = yield venta_1.default.findAll({
            where: {
                fecha: {
                    [sequelize_1.Op.between]: [inicio, fin]
                }
            }, include: [
                {
                    model: usuario_1.default
                }
            ]
        });
        res.json({
            ok: true,
            venta
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
exports.buscar_venta = buscar_venta;
const descargar_ticket = (req, res) => {
    const { nombre_tickets } = req.params;
    try {
        const file = nombre_tickets;
        const path = 'C:/File/tickets/';
        res.download(path + '/' + nombre_tickets, file, (err, result) => {
            if (err) {
                console.log(err);
                res.status(404).json({
                    ok: false,
                    msg: 'No se encontro el archivo'
                });
                res.json({
                    ok: true,
                    result
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
};
exports.descargar_ticket = descargar_ticket;
//# sourceMappingURL=venta.js.map