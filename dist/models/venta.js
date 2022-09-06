"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Venta = connection_1.default.define('venta', {
    total: { type: sequelize_1.DataTypes.INTEGER },
    fecha: { type: sequelize_1.DataTypes.TIME },
    nombre_tickets: { type: sequelize_1.DataTypes.STRING },
    idusuario: { type: sequelize_1.DataTypes.INTEGER }
});
exports.default = Venta;
//# sourceMappingURL=venta.js.map