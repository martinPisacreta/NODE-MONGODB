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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
//tengo que aclarar de que tipo de dato son los parametros
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: {
            estado: true
        }
    });
    res.json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
//tengo que aclarar de que tipo de dato son los parametros
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    //si existe el usuario
    if (usuario) {
        res.json({
            usuario
        });
    }
    else { //si no existe el usuario
        res.status(404).json({
            msg: 'No existe el usuario con ese id'
        });
    }
});
exports.getUsuario = getUsuario;
//tengo que aclarar de que tipo de dato son los parametros
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //voy a buscar si hay algun usuario que tenga el correo que recibo por parametro
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email'
            });
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save({});
        res.json({
            msg: 'post usuario',
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
//tengo que aclarar de que tipo de dato son los parametros
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        //verifico si existe el usuario  a updetear 
        if (!usuario) {
            res.status(404).json({
                msng: 'No existe el usuario con ese id'
            });
        }
        //voy a buscar si hay algun usuario que tenga el correo que recibo por parametro
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email'
            });
        }
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update(body));
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
//tengo que aclarar de que tipo de dato son los parametros
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    //verifico si existe el usuario  a updetear 
    if (!usuario) {
        res.status(404).json({
            msng: 'No existe el usuario con ese id'
        });
    }
    //eliminacion fisica
    //await usuario?.destroy();
    //eliminacion logica
    yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
    res.json({
        usuario
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map