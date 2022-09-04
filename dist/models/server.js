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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const login_1 = __importDefault(require("../routes/login"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const producto_1 = __importDefault(require("../routes/producto"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const venta_1 = __importDefault(require("../routes/venta"));
class Server {
    constructor() {
        this.apiPaths = {
            login: '/api/login',
            usuario: '/api/usuario',
            producto: '/api/producto',
            uploads: '/api/uploads',
            venta: '/api/venta'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('database online');
            }
            catch (error) {
                // throw new Error(error)
                console.log(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.login, login_1.default)
            .use(this.apiPaths.usuario, usuario_1.default)
            .use(this.apiPaths.producto, producto_1.default)
            .use(this.apiPaths.uploads, uploads_1.default)
            .use(this.apiPaths.venta, venta_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map