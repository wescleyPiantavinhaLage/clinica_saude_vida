
// pegando as estruturas html
const inputNome = document.getElementById('usuarioNome')
const inputEmail = document.getElementById('usuarioEmail')
const inputSenha = document.getElementById('usuarioSenha')

const selectTipo = document.getElementById('usuarioTipo')
const selectAtuacao = document.getElementById('usuarioAtuacao')

const form = document.getElementById('formUsuario')
const tbody = document.getElementById('tbodyUsuario')

// variaveis globais

let editando = null

window.addEventListener('DOMContentLoaded', () => {
    carregarSelectTipos()
    carregarSelectAtucao()
    carregarTabelaUsuarios()
})

async function carregarSelectTipos(){
    try{

        const resposta = await fetch(`usuarios/buscarTiposUsuario`)

        const tipos = await resposta.json()

        if(resposta.status != 200 && resposta.status != 500){
            alert(tipos.mensagem)
            return
        }

        if(resposta.status == 500){
            alert('Erro ao tentar buscar tipos de usuarios!')
            selectTipo.innerHTML = `
            <option value="0">Erro ao tentar buscar tipos de usuarios!</option>
            `
            return
        }

        selectTipo.innerHTML = ``

        if(tipos.length == 0){
            selectTipo.innerHTML = `
            <option value="0">Nenhum tipo cadastrado</option>
            `
            return
        }

        selectTipo.innerHTML = `<option value="0">Selecione um tipo de usuario!</option>` + tipos.map((tipo) => `
            <option value="${tipo.id_tipo_usuario}">${tipo.nome}</option>
        `).join('')
        

    }catch(erro){
        console.log(erro)
    }
}

async function carregarSelectAtucao(){
    try{
        const resposta = await fetch(`usuarios/buscarTudoAtuacoes`)

        const atuacoes = await resposta.json()

        if(resposta.status != 200 && resposta.status != 500){
            alert(atuacoes.mensagem)
            return
        }

        if(resposta.status == 500){
            alert('Erro ao tentar buscar tipos de usuarios!')
            selectAtuacao.innerHTML = `
            <option value="0">Erro ao tentar buscar tipos de usuarios!</option>
            `
            return
        }

        selectAtuacao.innerHTML = ``

        if(atuacoes.length == 0){
            selectAtuacao.innerHTML = `
            <option value="0">Nenhum tipo cadastrado</option>
            `
            return
        }

        selectAtuacao.innerHTML = `<option value="0">Selecione um tipo de usuario!</option>` + atuacoes.map((atuacao) => `
            <option value="${atuacao.id_tipo_usuario}">${atuacao.nome}</option>
        `).join('')
        

    }catch(erro){
        console.log(erro)
    }
}

async function carregarTabelaUsuarios(){
    try{
        const resposta = await fetch(`usuarios/buscarTudoUsuarios`)

        const usuarios = await resposta.json()

        if(resposta.status != 200 && resposta.status != 500){
            alert(usuarios.mensagem)
            return
        }

        if(resposta.status == 500){
            alert('Erro ao tentar buscar  usuarios!')
            return
        }

        tbody.innerHTML = ``

        if(usuarios.length == 0){
            tbody.innerHTML = `
            <option value="0">Nenhum tipo cadastrado</option>
            `
            return
        }

        tbody.innerHTML = usuarios.map((usuario) => `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.atuacao}</td>
                <td class="acao">
                    <button onclick="editarUsuario(${usuario.id_usuario},'${usuario.email}',${usuario.id_tipo_usuario},${usuario.id_atuacao})">Editar</button>
                    <button onclick="excluirUsuario(${usuario.id_usuario})">X</button>
                </td>
            </tr>
        `).join('')

    }catch(erro){
        console.log(erro)
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try{

        const metodo = editando? 'put': 'post'

        const url = editando? `/usuarios${editando}`: `/usuarios`

        const resposta = await fetch(url,{
            method: metodo,
            header: {"Content-Type":"application/json"},
            body: JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                senha: inputSenha.value,
                idTipo: selectTipo.value,
                idAtuacao: selectAtuacao.value
            })
        })

        const usuarios = await resposta.json()

        if(resposta.status != 200 && resposta.status != 500){
            alert(usuarios.mensagem)
            return
        }

        if(resposta.status == 500){
            alert('Erro ao tentar cadastrar usuario!')
            return
        }

        editando = null
        carregarTabelaUsuarios()
        form.reset()

    }catch(erro){
        console.log(erro)
    }
})

function editarUsuario(id,nome,email,idTipo,idAtuacao){

    editando = id

    inputNome.value = nome
    inputEmail.value = email
    selectTipo.value = idTipo
    selectAtuacao.value = idAtuacao

    inputNome.focus()
}

async function excluirUsuario(id){
    try{

        if(confirm('deseja realmente excluir?')){
            const resposta = await fetch(`usuarios/${id}`,{
                method: 'delete'
            })

            const mensagem = await resposta.json()

            carregarTabelaUsuarios()

            if(resposta.status != 200 && resposta.status != 500){
                alert(mensagem.mensagem)
                return
            }
    
            if(resposta.status == 500){
                alert('Erro ao tentar excluir usuario!')
                return
            }
        }

    }catch(erro){
        console.log(erro)
    }
}