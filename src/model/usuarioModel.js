import connection from '../database/connection.js'

export async function buscarPorEmail(email) {
    try{
        const [returned] = await connection.query('select * from tb_usuarios where email = ?', [email])

        return returned[0]

    }catch(erro){
        throw erro
    }
}