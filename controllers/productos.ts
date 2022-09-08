import { Request, Response } from "express";
import Precio from "../models/precio";
import Producto from '../models/producto';
import { Sequelize } from 'sequelize';





export const agregar_producto = async (req: Request, res: Response) => {
    const { codigo, nombre_producto, stock, talla, idprecio } = req.body;

    console.log(req.body);
    try {

        const existeProducto = await Producto.findOne({ where: { codigo } });

        if (existeProducto !== null) {
            await Producto.update({ stock: existeProducto.getDataValue('stock') + stock }, { where: { id: existeProducto.getDataValue('id') } });
            return res.json({
                ok: true,
                msg: 'Actualizado con exito'
            })
        }
        Producto.removeAttribute('id');
        const productoNuevo = Producto.build(req.body);
        await productoNuevo.save();


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


        if (producto === null) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese producto con ese codigo'
            })
        }

        if (producto.getDataValue('stock') === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay en el inventario'
            })
        }
        if (!producto.getDataValue('activo')) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya no se maneja ese producto'
            })
        }

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

export const obtener_productos = async (req: Request, res: Response) => {

    try {
        Producto.belongsTo(Precio, { foreignKey: 'idprecio' });
        Precio.hasMany(Producto, { foreignKey: 'id' });
        const productos = await Producto.findAll({ include: [{ model: Precio }] });

        res.json({
            ok: true,
            productos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}