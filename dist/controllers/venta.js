"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregar_venta = void 0;
const fs_1 = __importDefault(require("fs"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const agregar_venta = (req, res) => {
    const { producto } = req.body;
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
        // const pathViejo = path.join(__dirname, `../template/ticket.html`);
        let html = fs_1.default.readFileSync('C:/Users/Moy Guerrero/Desktop/garageCarAudiob/templates/ticket.html', 'utf-8');
        html = html.replace('_CUERPO_VENTA_', body);
        html = html.replace('_TOTAL_', total.toString());
        const options = {
            "height": "120mm",
            "width": "60mm", // allowed units: mm, cm, in, px
        };
        html_pdf_1.default.create(html, options).toFile('C:/Users/Moy Guerrero/Desktop/ticketsGuardado/venta-' + localISOTime.replace('T', ' ').split('.')[0].split(' ')[1].replace(':', '-').replace(':', '-') + '.pdf', (err, result) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    ok: false,
                    msg: 'No se pudo hacer nada'
                });
            }
            res.json({
                ok: true,
                result
            });
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
exports.agregar_venta = agregar_venta;
//# sourceMappingURL=venta.js.map