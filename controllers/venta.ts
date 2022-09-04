import { Request, Response } from "express";
import fs from 'fs';
import path from "path";
import pdf from "html-pdf";


export const agregar_venta = (req: Request, res: Response) => {
    const { producto } = req.body
    try {
        let body = '';
        let total: number = 0;
        producto.forEach((element: any) => {
            body += '<tr>' +
                '<td>' + element.cantidad + '</td>' +
                '<td>' + element.nombre + '</td>' +
                '<td>' + element.precio + '</td>' +
                '</tr>'

            let subtotal = (element.precio * element.cantidad);

            total += subtotal;
        });


        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        // const pathViejo = path.join(__dirname, `../template/ticket.html`);

        let html = fs.readFileSync('C:/Users/Moy Guerrero/Desktop/garageCarAudiob/templates/ticket.html', 'utf-8');
        html = html.replace('_CUERPO_VENTA_', body);
        html = html.replace('_TOTAL_', total.toString());

        const options = {
            "height": "120mm",         // allowed units: mm, cm, in, px
            "width": "60mm",          // allowed units: mm, cm, in, px
        }

        pdf.create(html, options).toFile('C:/Users/Moy Guerrero/Desktop/ticketsGuardado/venta-' + localISOTime.replace('T', ' ').split('.')[0].split(' ')[1].replace(':', '-').replace(':', '-') + '.pdf', (err, result) => {
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
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}