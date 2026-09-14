const inputEmail = document.getElementById('loginEmail')
const inputSenha = document.getElementById('loginSenha')

const form = document.getElementById('formLogin')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try{
        const resposta = await fetch(`/login`,{
            method: 'post',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                email: inputEmail.value,
                senha: inputSenha.value
            })
        })


        const dados = await resposta.json()

        if(resposta.status != 200){
            alert(dados.mensagem)
            return
        }

        localStorage.removeItem('usuario')
        localStorage.removeItem('token')
    
        localStorage.setItem('token', dados.token)
        localStorage.setItem('usuario', JSON.stringify(dados.usuario))


        if(dados.usuario.tipo === 1){
            window.location.href = '/consulta'
        }else if(dados.usuario.tipo === 2){
            window.location.href = '/atendimento'
        }else if(dados.usuario.tipo === 3){
            window.location.href = '/dashboard'
        }
    }
    catch(erro){
        console.error(erro)
    }
})