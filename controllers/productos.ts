import { Request, Response } from "express";
import Precio from "../models/precio";
import Producto from '../models/producto';





export const agregar_producto = async (req: Request, res: Response) => {
    const { codigo, nombre_producto, stock, talla, img, idprecio } = req.body;
    try {

        const existeProducto = await Producto.findOne({ where: { codigo } });

        if (existeProducto !== null) {
            await Producto.update({ stock: existeProducto.getDataValue('stock') + stock }, { where: { id: existeProducto.getDataValue('id') } });
            return res.json({
                ok: true,
                msg: 'Actualizado con exito'
            })
        }

        const productoNuevo = await Producto.create(req.body);


        res.json({
            ok: true,
            msg: 'Agregado con exito',
            productoNuevo
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}

export const obtener_producto = async (req: Request, res: Response) => {


    try {

        const codigo = req.params.codigo

        Producto.belongsTo(Precio, { foreignKey: 'idprecio' });
        Precio.hasMany(Producto, { foreignKey: 'id' })

        const producto = await Producto.findOne({ where: { codigo }, include: [{ model: Precio }] });

        res.json({
            ok: true,
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        })
    }
}