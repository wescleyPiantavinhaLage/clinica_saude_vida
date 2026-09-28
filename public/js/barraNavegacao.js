const sidebarBlank = document.getElementById('sidebarBlank')

window.addEventListener('DOMContentLoaded', () => {
    carregarBarraLaeral()
    verificarUsuario()
})

function carregarBarraLaeral(){
    sidebarBlank.innerHTML = `
        <nav id="sidebar">
            <div id="sidebarMain">
                <div id="linksRecepcao">
                    <ul>
                        <li><a href="/consulta">Consulta</a></li>
                        <li><a href="/paciente">Paciente</a></li>
                    </ul>
                </div>
                <div id="linksMedico">
                    <ul>
                        <li><a href="/atendimento">Atendimento</a></li>
                    </ul>
                </div>
                <div id="linksAdmin">
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/usuario">Usuario</a></li>
                        
                    </ul>
                </div>
            </div>
            <div onclick="logOff()" id="sidebarFooter">
                <span id="sidebarFooterNome"></span>- Sair
            </div>
        </nav>
    `
}

function verificarUsuario(){
    const linksRecepcao = document.getElementById('linksRecepcao')
    const linksMedico = document.getElementById('linksMedico')
    const linksAdmin = document.getElementById('linksAdmin')
    const sidebarFooterNome = document.getElementById('sidebarFooterNome')

    const usuario = JSON.parse(localStorage.getItem('usuario'))

    if(!usuario){
        window.location.href = '/'
        return
    }

    linksRecepcao.classList.add('oculto')
    linksMedico.classList.add('oculto')
    linksAdmin.classList.add('oculto')

    if(usuario.tipo === 1){
        linksRecepcao.classList.remove('oculto')
    }else if(usuario.tipo === 2){
        linksMedico.classList.remove('oculto')
    }else if(usuario.tipo === 3){
        linksRecepcao.classList.remove('oculto')
        linksMedico.classList.remove('oculto')
        linksAdmin.classList.remove('oculto')
    }

    sidebarFooterNome.innerHTML = `
        ${usuario.nome}
    `
}

function logOff(){
    localStorage.removeItem('usuario')
    window.location.href = '/'

}