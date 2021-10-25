import { Request , Response } from "express"
import Usuario from "../models/usuario"

//tengo que aclarar de que tipo de dato son los parametros
export const getUsuarios = async (req: Request , res: Response) => {

    const usuarios = await Usuario.findAll({
        where: {
            estado: true
        }
    });

    res.json({
        usuarios
    })
}


//tengo que aclarar de que tipo de dato son los parametros
export const getUsuario = async (req: Request , res: Response) => {

    const {id} = req.params;


    const usuario = await Usuario.findByPk(id);


    //si existe el usuario
    if ( usuario ) {
        res.json({
            usuario
         })
    } else { //si no existe el usuario
        res.status(404).json({
            msg: 'No existe el usuario con ese id'
        })
    }
   
}


//tengo que aclarar de que tipo de dato son los parametros
export const postUsuario = async (req: Request , res: Response) => {

    const {body} = req;

    try {

        //voy a buscar si hay algun usuario que tenga el correo que recibo por parametro
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if( existeEmail ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email'
            })
        }

        const usuario =  Usuario.build(body);
        await usuario.save({});


        res.json({
            msg: 'post usuario',
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
   


//tengo que aclarar de que tipo de dato son los parametros
export const putUsuario = async (req: Request , res: Response) => {

    const {id} = req.params
    const {body} = req;

   try {

       
        const usuario = await Usuario.findByPk(id);

         //verifico si existe el usuario  a updetear 
        if( !usuario ) {
            res.status(404).json({
                msng: 'No existe el usuario con ese id'
            })
        } 

        //voy a buscar si hay algun usuario que tenga el correo que recibo por parametro
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if( existeEmail ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email'
            })
        }

       
        await usuario?.update(body);

        res.json({
            usuario
        })
        
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

//tengo que aclarar de que tipo de dato son los parametros
export const deleteUsuario = async (req: Request , res: Response) => {

    const {id} = req.params
   
    const usuario = await Usuario.findByPk(id);

    //verifico si existe el usuario  a updetear 
   if( !usuario ) {
       res.status(404).json({
           msng: 'No existe el usuario con ese id'
       })
   } 

   //eliminacion fisica
   //await usuario?.destroy();

   //eliminacion logica
   await usuario?.update({estado: false});


    res.json({
        usuario
    })
}
