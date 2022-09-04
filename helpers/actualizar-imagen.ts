import fs from "fs";
import path from "path";

import Producto from "../models/producto"


export const actualizarImagen = async (tipo: string, id: number, nombreArchivo: string) => {

    switch (tipo) {
        case 'producto':
            const producto = await Producto.findByPk(id);
            let pathViejo;
            if (producto === null) {
                console.log('No es producto');
                return false;
            }

            if (producto.getDataValue('img') === '') {
                pathViejo = path.join(__dirname, `../uploads/${tipo}/1`);
            } else {
                pathViejo = path.join(__dirname, `../uploads/${tipo}/${producto.getDataValue('img')}`);
            }
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            await Producto.update({ img: nombreArchivo }, { where: { id: producto.getDataValue('id') } });

            return true;
            break;
    }

}