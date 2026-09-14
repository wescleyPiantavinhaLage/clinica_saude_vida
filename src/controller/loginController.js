import * as usuarioModel from  '../model/usuarioModel.js'
import { erroInternoServidor } from '../utilyts/erros.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function verificarUsuario(req,res) {
    try{

        const {email,senha} = req.body

        if(!email||!senha|| senha.length < 8){
            return res.status(400).json({mensagem: 'email e senha com mais de 8 caracteres são obrigatorios!'})
        }


        const usuario = await usuarioModel.buscarPorEmail(email)

        if(!usuario){
            return res.status(401).json({mensagem: 'email ou senha estão incorretos!'})
        }

        
        const verificar = await bcrypt.compare(senha, usuario.senha)

        if(!verificar){
            return res.status(401).json({mensagem: 'email ou senha estão incorretos!'})
        }

        // criando jwt

        const payload = {
            id: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.id_tipo_usuario
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '8h'
        })

        return res.status(200).json({ token, usuario: payload })
    }catch(erro){
        erroInternoServidor(res,erro)
    }
}