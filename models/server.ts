import express, { Application } from "express";
import cors from "cors";

import db from "../database/connection";
import login from '../routes/login';
import usuario from "../routes/usuario";

class Server {

    private app: Application;
    private port: string;

    private apiPaths = {
        login: '/api/login',
        usuario: '/api/usuario'
    }

    constructor() {
        this.app = express();

        this.port = process.env.PORT || '8000';



        // Metodos iniciales
        this.dbConnection();

        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('database online');
        } catch (error) {
            // throw new Error(error)
            console.log(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta publica
        this.app.use(express.static('public'));

    }


    routes() {
        this.app.use(this.apiPaths.login, login)
            .use(this.apiPaths.usuario, usuario);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;