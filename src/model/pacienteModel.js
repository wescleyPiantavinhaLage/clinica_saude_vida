import connection from '../database/connection.js'

export async function buscarTudo() {
    try{
        const [returned] = await connection.query('select * from tb_pacientes')

        return returned

    }catch(erro){
        throw erro
    }
}