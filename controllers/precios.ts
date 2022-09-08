import { Request, Response } from "express";
import Precio from '../models/precio';




export const obtener_precios = async (req: Request, res: Response) => {
    try {

        const precio = await Precio.findAll();
        res.json({
            ok: true,
            precio
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}