window.addEventListener('DOMContentLoaded' , () => {
    carregarTabelaPacientes()
})

async function carregarTabelaPacientes(){
    try{
        const token = localStorage.getItem('token')

        const resposta = await fetch(`/pacientes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const pacientes = await resposta.json()

        if(resposta.status != 200){
            alert(pacientes.mensagem)
        }

        console.log('devolvido com sucesso!')

    }catch(erro){
        console.log(erro)
    }
}