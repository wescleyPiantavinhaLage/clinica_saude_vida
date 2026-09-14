export function erroInternoServidor(res,erro){
    console.log(erro)
    res.status(500).json({mensagem: 'erro interno do servidor!'})
}

