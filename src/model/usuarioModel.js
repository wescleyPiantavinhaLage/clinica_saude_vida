import connection from '../database/connection.js'



export async function buscarTudo(){
    try{

        const [rows] = await connection.query('select u.nome, u.email , u.id_tipo_usuario, u.id_atuacao, tu.nome as tipo,  a.nome as atuacao from tb_usuarios u join tb_tipos_usuario tu on u.id_tipo_usuario = tu.id_tipo_usuario join tb_atuacoes a on u.id_atuacao = a.id_atuacao')

        return rows

    }catch(erro){
        throw erro
    }
}

export async function buscarPorEmail(email) {
    try{
        const [returned] = await connection.query('select * from tb_usuarios where email = ?', [email])

        return returned[0]

    }catch(erro){
        throw erro
    }
}

export async function cadastrar(nome,email,senha,idTipo,idAtuacao){
    try{

        cosnt [returned] = await connection.query('insert into tb_usuarios(nome,email,senha,id_tipo_usario,id_atuacao) values (?,?,?,?,?)',[nome,email,senha,idTipo,idAtuacao])

        return returned
    }catch(erro){
        throw erro
    }
}

export async function atualizar(id, nome,email,senha,idTipo,idAtuacao){
    try{

        cosnt [returned] = await connection.query('update tb_usuarios set nome = ?, email = ?, senha = coalesce(?,senha),id_tipo_usuario = ?, id_atuacao = ? where id_usuario = ?',[nome,email,senha,idTipo,idAtuacao,id])

        return returned

    }catch(erro){
        throw erro
    }
}

export async function deletar(id){
    try{

        const [returned] = await connection.query('delete from tb_usuarios where id_usuario = ?',[id])

        return returned

    }catch(erro){
        throw erro
    }
}