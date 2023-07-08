let jogadas = 0;
document.getElementById('jogadas').innerText = jogadas;

let iniciar = document.getElementById('iniciar');
let nomeJogador1;
let nomeJogador2;

let jogadasJogador1 = [];
let jogadasJogador2 = [];

const combinacoesVencedoras = [
  [0, 1, 2], // Linha superior
  [3, 4, 5], // Linha do meio
  [6, 7, 8], // Linha inferior
  [0, 3, 6], // Coluna esquerda
  [1, 4, 7], // Coluna do meio
  [2, 5, 8], // Coluna direita
  [0, 4, 8], // Diagonal principal
  [2, 4, 6] // Diagonal secundária
];

function verificarVencedor(jogadasJogador) {
  for (let combinacao of combinacoesVencedoras) {
    let vitoria = true;
    for (let posicao of combinacao) {
      if (!jogadasJogador.includes(posicao)) {
        vitoria = false;
        break;
      }
    }
    if (vitoria) {
      return true;
    }
  }
  return false;
}

function manipularQuadrado(quadradoId) {
  if (jogadas >= 9) {
    alert('O jogo acabou. Reinicie para jogar novamente.');
    return;
  }

  if (jogadas % 2 === 0) {
    document.getElementById(quadradoId).src = './x.png';
    document.getElementById('jogador').innerText = nomeJogador2;
    jogadasJogador1.push(Number(quadradoId.slice(-1)));
  } else {
    document.getElementById(quadradoId).src = './zero.png';
    document.getElementById('jogador').innerText = nomeJogador1;
    jogadasJogador2.push(Number(quadradoId.slice(-1)));
  }

  jogadas++;
  document.getElementById('jogadas').innerText = jogadas;

  if (jogadas >= 5) {
    if (verificarVencedor(jogadasJogador1)) {
      alert(`${nomeJogador1} venceu!`);
      reiniciarJogo();
    } else if (verificarVencedor(jogadasJogador2)) {
      alert(`${nomeJogador2} venceu!`);
      reiniciarJogo();
    } else if (jogadas === 9) {
      alert('Empate!');
      reiniciarJogo();
    }
  }
}

function reiniciarJogo() {
  jogadas = 0;
  jogadasJogador1 = [];
  jogadasJogador2 = [];

  document.getElementById('jogadas').innerText = jogadas;
  document.getElementById('jogador').innerText = nomeJogador1;

  const quadrados = document.getElementsByClassName('quadrado');
  for (let quadrado of quadrados) {
    quadrado.src = './empty.png';
  }
}

iniciar.addEventListener('click', function (ev) {
  nomeJogador1 = document.getElementById('jogador1').value;
  nomeJogador2 = document.getElementById('jogador2').value;

  if (nomeJogador1 && nomeJogador2) {
    document.getElementById('container').style.display = 'block';
    document.getElementById('jogador').innerText = nomeJogador1;
  }
});
