import jwt from "jsonwebtoken";


const generarJWT = (id: number) => {

    return new Promise((resolve, reject) => {
        const payload = {
            id
        };

        jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: '8h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo crear el token');
            } else {
                resolve(token);
            }

        });
    });
}

export default generarJWT;