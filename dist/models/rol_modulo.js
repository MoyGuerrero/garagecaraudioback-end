"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Rol_Modulo = connection_1.default.define('rol_modulo', {
    id_rol: { type: sequelize_1.DataTypes.INTEGER },
    id_modulo: { type: sequelize_1.DataTypes.INTEGER },
});
exports.default = Rol_Modulo;
//# sourceMappingURL=rol_modulo.js.map