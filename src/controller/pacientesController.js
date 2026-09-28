import * as pacienteModel from  '../model/pacienteModel.js'
import { erroInternoServidor } from '../utilyts/erros.js'

export async function buscarTudo(req,res) {
    try{
        const resulted = await pacienteModel.buscarTudo()

        return res.status(200).json(resulted)

    }catch(erro){
        erroInternoServidor(res,erro)
    }
}