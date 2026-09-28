import connection from '../database/connection.js'



export async function buscarTudo(){
    try{
        const [rows] = await connection.query('select * from tb_tipos_usuario')

        return rows

    }catch(erro){
        throw erro
    }
}