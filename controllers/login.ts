import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import generarJWT from "../helpers/jwt";

export const acceder = async (req: Request, res: Response) => {
    const { usuario_, password } = req.body;
    try {

        const existeUsuario = await Usuario.findOne({ where: { usuario_ } });

        if (existeUsuario === null) {
            return res.status(404).json({
                ok: false,
                msg: 'No encontro el usuario'
            });
        }

        const passwordValid = bcryptjs.compareSync(password, existeUsuario.getDataValue('password'));

        if (!passwordValid) {
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        if (!existeUsuario.getDataValue('activo')) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario dado de baja'
            })
        }

        const token = await generarJWT(existeUsuario.getDataValue('id'));

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}


export const renewToken = async (req: Request, res: Response) => {

    const id = req.body.id;

    try {
        const token = await generarJWT(id);

        // Usuario.belongsTo(Rol, { foreignKey: 'rol_idrol' });
        // Rol.hasMany(Usuario, { foreignKey: 'id' });


        // Rol.belongsTo(Rol_Modulo, { foreignKey: 'id' });
        // Rol_Modulo.hasMany(Rol, { foreignKey: 'id' });

        // Modulo.belongsTo(Rol_Modulo, { foreignKey: 'id' });
        // Rol_Modulo.hasMany(Modulo, { foreignKey: 'id' });

        const usuario = await Usuario.findByPk(id);

        res.json({
            ok: true,
            token,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, hable con el administrador'
        });
    }
}