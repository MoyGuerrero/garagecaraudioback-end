import path from "path";
import fs from 'fs';
import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid"
import { actualizarImagen } from "../helpers/actualizar-imagen";

export const fileUpload = (req: any, res: Response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['producto']

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontro la ruta'
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe imagen'
        });
    }


    const file = req.files.imagen;


    const nombreCortado = file.name.split('.');

    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida',
        })
    }

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    // import {  } from "../dist/uploads/producto/";


    // const path = `C:/Users/Moy Guerrero/Desktop/garageCarAudiob/dist/uploads/${tipo}/${nombreArchivo}`;

    const pathG = path.join(__dirname, `../uploads/${tipo}/${nombreArchivo}`);
    // const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(pathG, (err: any) => {
        if (err) {
            console.log(err)
            console.log(path);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo guardado',
            nombreArchivo
        });
    });

}

export const retornaImagen = (req: any, res: Response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;
    // console.log(`../uploads/${tipo}/${foto}`)
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);

    }


}