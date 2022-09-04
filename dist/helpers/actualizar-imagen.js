"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarImagen = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const producto_1 = __importDefault(require("../models/producto"));
const actualizarImagen = (tipo, id, nombreArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    switch (tipo) {
        case 'producto':
            const producto = yield producto_1.default.findByPk(id);
            let pathViejo;
            if (producto === null) {
                console.log('No es producto');
                return false;
            }
            if (producto.getDataValue('img') === '') {
                pathViejo = path_1.default.join(__dirname, `../uploads/${tipo}/1`);
            }
            else {
                pathViejo = path_1.default.join(__dirname, `../uploads/${tipo}/${producto.getDataValue('img')}`);
            }
            if (fs_1.default.existsSync(pathViejo)) {
                fs_1.default.unlinkSync(pathViejo);
            }
            yield producto_1.default.update({ img: nombreArchivo }, { where: { id: producto.getDataValue('id') } });
            return true;
            break;
    }
});
exports.actualizarImagen = actualizarImagen;
//# sourceMappingURL=actualizar-imagen.js.map