// Variáveis iniciais
let botaoPostar = document.getElementById('botao-postar');
let listaDeAtt = [];

// Escutando o botão do formulário para criar post
botaoPostar.addEventListener('click', (evento) => {
    evento.preventDefault();

    // Variáveis padrões
    let mensagemNovaAttInput = document.getElementById('mensagem-nova-att');
    let mensagemNovaAtt = mensagemNovaAttInput.value;

    // Limpando o campo da atualização
    mensagemNovaAttInput.value = "";
    mensagemNovaAtt.style.height = '48px';

    // Definindo qual o usuário logado
    let usuarioLogado = {
        usuario: "fguimas",
        nome: "Fernando Guimarães"
    };

    // Criando o objeto da nova atualização
    let novaAtt = {
        mensagemNovaAtt,
        criadoPor: usuarioLogado.usuario,
        criadoEm: dataAtual()
    }

    // Enviando a postagem para o backend
    fetch('http://localhost:3000/postar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensagemNovaAtt: mensagemNovaAtt,
        criadoPor: usuarioLogado.usuario,
        criadoEm: novaAtt.criadoEm
      }),
      })
    .then(response => response.json())
    // Caso haja algum erro não identificado do servidor ou outro.
    .catch((error) => {
        console.error('Erro não identificado:', error);
    });

    // Mostrando a postagem na tela
    let todasAtualizacoes = document.querySelector('.atualizacoes');
    let novaDiv = document.createElement("div");
    novaDiv.innerHTML = `
        <div class="post">
            <div class="post_profile-image">
                <img src="./assets/images/foto perfil.png" alt="Imagem Perfil do Usuário">
            </div>

            <div class="post_body">
                <div class="post_header">
                    <div class="post_header-text">
                        <h3>${usuarioLogado.nome}
                            <span class="header-icon-section">
                                <span class="material-icons post_badge">verified</span>@${usuarioLogado.usuario}
                            </span>
                        </h3>
                    </div>

                    <div class="post_header-discription">
                        <p>${novaAtt.mensagemNovaAtt}</p>
                    </div>
                    
                </div>
                <img src="./assets/images/webdixi-foto.png" alt="Foto exemplo">

                <div class="post_footer">
                    <span class="material-icons">chat</span>
                    <span class="material-icons">favorite_border</span>
                </div>

            </div>
        </div>
        `
    todasAtualizacoes.appendChild(novaDiv);
    

    // Debugg apenas
    listaDeAtt.push(novaAtt);
    console.log(listaDeAtt)
});

// Funções utilitárias
function dataAtual() {
    let hoje = new Date();
    let dia = hoje.getDate().toString().padStart(2,'0');
    let mes = String(hoje.getMonth() + 1).padStart(2,'0');
    let ano = hoje.getFullYear();
    let horas = hoje.getHours();
    let minutos = hoje.getMinutes();
    let segundos = hoje.getSeconds();
    let dataAtual = `${dia}-${mes}-${ano}@${horas}:${minutos}:${segundos}`;

    return dataAtual;
}
function autoResize(element) {
    element.style.height = 'auto';  
    element.style.height = (element.scrollHeight) + 'px';  
    
  }