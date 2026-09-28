import bcrypt from 'bcrypt'

import * as usuarioModel from '../model/usuarioModel.js'
import * as atuacoesModel from '../model/atuacoesModel.js'
import * as tipos_usuarioModel from '../model/tipos_usuarioModel.js'

import { erroInternoServidor } from '../utilyts/erros.js'

export async function buscarTudoUsuarios(req, res){
    try{
        const resposta = await usuarioModel.buscarTudo()

        return res.status(200).json(resposta)

    }catch(erro){
        erroInternoServidor(res,erro)
    }
}

export async function buscarTiposUsuario(req, res){
    try{
        const resposta = await tipos_usuarioModel.buscarTudo()

        return res.status(200).json(resposta)

    }catch(erro){
        erroInternoServidor(res,erro)
    }

}

export async function buscarTudoAtuacoes(req, res){
    try{
        const resposta = await atuacoesModel.buscarTudo()

        return res.status(200).json(resposta)

    }catch(erro){
        erroInternoServidor(res,erro)
    }

}

export async function cadastrar(req, res){
    try{
        const {nome,email,senha,idTipo,idAtuacao} = req.body

        if(!nome||!email||!senha||!idTipo||!idAtuacao){
            return res.status(400).json({mensagem: 'nome,email,senha,idTipo,idAtuacao são obrigatorios!'})
        }

        let hash = await bcrypt.hash(senha,10)

        const id = await usuarioModel.cadastrar(nome,email,hash,idTipo,idAtuacao)

        return res.status(200).json(id,nome,email,idTipo,idAtuacao)

    }catch(erro){
        erroInternoServidor(res,erro)
    }

}

export async function atualizar(req, res){
    try{
        const {nome,email,senha,idTipo,idAtuacao} = req.body
        const id = req.params.id

        if(!id||!nome||!email||!idTipo||!idAtuacao){
            return res.status(400).json({mensagem: 'nome,email,senha,idTipo,idAtuacao são obrigatorios!'})
        }

        let hash = null

        if(senha){
            if(senha.length < 8){
                return res.status(400).json({mensagem: 'Senha deve ter no minimo 8 caracteres'})
            }

            hash = await bcrypt.hash(senha,10)
        }

        const resposta = await usuarioModel.atualizar(id,nome,email,hash,idTipo,idAtuacao)

        if(!resposta){
            return res.status(404).json({mensagem: 'id não foi encontrado!'})
        }

        return res.status(200).json({mensagem: 'Atualizado com sucesso!'})

    }catch(erro){
        erroInternoServidor(res,erro)
    }

}


export async function deletar(req, res){
    try{
        const id = req.params.id

        if(!id){
            return res.status(400).json({mensagem: 'id é obrigatorio!'})
        }

        const resposta = await usuarioModel.deletar(id)

        if(!resposta){
            return res.status(404).json({mensagem: 'id não foi encontrado!'})
        }

        return res.status(200).json({mensagem: 'Deletado com sucesso!'})

    }catch(erro){
        erroInternoServidor(res,erro)
    }

}



