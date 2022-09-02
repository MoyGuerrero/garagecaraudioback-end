import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcryptjs from "bcryptjs";


export const agregar_usuario = async (req: Request, res: Response) => {

    const { nombre, apellidos, direccion, telefono, usuario_, password, rol_idrol } = req.body
    try {

        const existeUsuario = await Usuario.findOne({ where: { usuario_ } });

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
        }

        // Se encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        datos.password = bcryptjs.hashSync(password, salt);

        const usuarioNuevo = await Usuario.create(datos);

        res.json({
            ok: true,
            msg: 'Guardado con exito'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error,hable con el administrador'
        });
    }



}

export const obtener_usuarios = async (req: Request, res: Response) => {


    try {

        const usuario = await Usuario.findAll();

        res.json({
            ok: true,
            usuario,
            uid: req.body.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error,hable con el administrador'
        });
    }

}