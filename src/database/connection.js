import mysql from 'mysql2/promise'
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE ,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
})

try{

    const connection = await pool.getConnection()
    connection.release()
    console.log(`Conectado ao banco com sucesso!!!`)

}catch(erro){
    console.error(`Erro ao conectar com o banco de dados: ${erro}`)
}

export default pool