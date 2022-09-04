"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Modulo = connection_1.default.define('modulo', {
    nombre_modulo: { type: sequelize_1.DataTypes.STRING },
    path: { type: sequelize_1.DataTypes.STRING },
    icono: { type: sequelize_1.DataTypes.STRING },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = Modulo;
//# sourceMappingURL=modulo.js.map