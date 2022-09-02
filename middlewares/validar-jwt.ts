import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string
}

const validarJWT = (req: Request, res: Response, next: any) => {

    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.body.id = id;
        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    
}


export default validarJWT;