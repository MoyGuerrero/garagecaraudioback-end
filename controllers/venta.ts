import { Request, Response } from "express";
import fs from 'fs';
import pdf from "html-pdf";
import Venta from "../models/venta";
import ventaProductos from "../models/venta_productos";
import { Op, Sequelize } from 'sequelize';
import Producto from '../models/producto';
import Usuario from '../models/usuario';

export const agregar_venta = async (req: Request, res: Response) => {
    const { producto, importe, idusuario } = req.body
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

        var fechahoy = localISOTime.replace('T', ' ').split('.')[0];

        var fechaGuardarBD = fechahoy.split(' ')[0];


        let cambio = importe - total;

        var nombreArchivoTicket = 'venta-' + localISOTime.replace('T', ' ').split('.')[0].replace(' ', '-').replace(':', '-').replace(':', '-');
        // const pathViejo = path.join(__dirname, `../template/ticket.html`);

        let html = fs.readFileSync('C:/Users/Moy Guerrero/Desktop/garageCarAudiob/templates/ticket.html', 'utf-8');
        html = html.replace('_CUERPO_VENTA_', body);
        html = html.replace('_TOTAL_', total.toString());
        html = html.replace('_IMPORTE_', importe);
        html = html.replace('_CAMBIO_', cambio.toFixed(2).toString());
        html = html.replace('_FECHA_', fechahoy);

        const options = {
            "height": "200mm",         // allowed units: mm, cm, in, px
            "width": "60mm",          // allowed units: mm, cm, in, px
        }

        let path = 'C:/File/tickets';
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        pdf.create(html, options).toFile(path + '/' + nombreArchivoTicket + '.pdf', (err, _result) => {
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
        }


        const venta = Venta.build(datosVenta);
        await venta.save();

        let idVentaProducto = await ventaProductos.findAll({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'id']]
        });

        let ventaProductoID = idVentaProducto[0].getDataValue('id') + 1;

        let idventa = venta.getDataValue('id');
        for (let i = 0; i < producto.length; i++) {
            let datosVentaDetalle = {
                id: ventaProductoID,
                idventa,
                idproducto: producto[i].id,
                cantidad: producto[i].cantidad
            }
            await ventaProductos.create(datosVentaDetalle);

            const actualizarStock = await Producto.findOne({ where: producto[i].id });

            await Producto.update({ stock: actualizarStock?.getDataValue('stock') - producto[i].cantidad }, { where: { id: producto[i].id } });
        }


        res.json({
            ok: true,
            cambio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}


export const buscar_venta = async (req: Request, res: Response) => {
    const { inicio, fin } = req.body

    try {


        Venta.belongsTo(Usuario, { foreignKey: 'idusuario' });
        Usuario.hasMany(Venta, { foreignKey: 'id' });
        const venta = await Venta.findAll({
            where: {
                fecha: {
                    [Op.between]: [inicio, fin]
                }
            }, include: [
                {
                    model: Usuario
                }
            ]
        });

        res.json({
            ok: true,
            venta
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}

export const descargar_ticket = (req: Request, res: Response) => {

    const { nombre_tickets } = req.params

    try {
        const file = nombre_tickets;
        const path = 'C:/File/tickets/';
        res.download(path + '/' + nombre_tickets, file, (err: any, result: any) => {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }

}