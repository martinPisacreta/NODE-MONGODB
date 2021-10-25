const jwt = require('jsonwebtoken');


//recibo uid (que seria el id del usuario pero aca lo llamo uid y en un metodo del models usuario.js tambien lo transoformo para que se llame asi)
//va a ser un string
//uso Promise , porque el paquete jsonwebtoken usa devuelve una Promise
const generarJWT = (uid = '') => {
    return new Promise ( (resolve,reject) => {
            const payload = {uid};

            jwt.sign(payload,process.env.SECRET_KEY, {
                expiresIn: '4h'
            }, (err,token) => { // aca esta el callback de la Promise , que puede contener un error o el token si estuvo todo ok
                if(err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                }
                else {
                    resolve(token);
                }
            })
    })
}

module.exports = {
    generarJWT
}