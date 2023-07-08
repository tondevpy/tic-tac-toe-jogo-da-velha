var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();



let jogadas = 0;
document.getElementById('jogadas').innerText = jogadas;

let iniciar = document.getElementById('iniciar');
let nomeJogador1;
let nomeJogador2;

let ativo1;
let ativo2;
let ativo3;
let ativo4;
let ativo5;
let ativo6;
let ativo7;
let ativo8;
let ativo9;


// 

// 

let combinacoesVencedoras = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
]

let jogadasJogador1 = []
let jogadasJogador2 = []

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
            startConfetti()
                
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
                
            });
            return true;
        }
    }
    return false;
}

function quadrado1() {
    if (ativo1 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado1 = document.getElementById('quadrado1');
            quadrado1.src = './x.png';
            quadrado1.style.background = 'gray'
            quadrado1.style.borderRadius = '5px'
            jogadas++;
            ativo1 = 'sim';
            document.getElementById('jogadas').innerText = jogadas
            document.getElementById('jogador').innerText = nomeJogador2
            jogadasJogador1.push(0)
        } else {
            let quadrado1 = document.getElementById('quadrado1');
            quadrado1.src = './zero.png';
            quadrado1.style.background = 'gray'
            quadrado1.style.borderRadius = '5px'
            jogadas++;
            ativo1 = 'sim';
            document.getElementById('jogadas').innerText = jogadas
            document.getElementById('jogador').innerText = nomeJogador1
            jogadasJogador1.push(0)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado2() {
    if (ativo2 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado2 = document.getElementById('quadrado2');
            quadrado2.src = './x.png';
            quadrado2.style.background = 'gray'
            quadrado2.style.borderRadius = '5px'
            jogadas++;
            ativo2 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2
            jogadasJogador1.push(1)
        } else {
            let quadrado2 = document.getElementById('quadrado2');
            quadrado2.src = './zero.png';
            quadrado2.style.background = 'gray'
            quadrado2.style.borderRadius = '5px'
            jogadas++;
            ativo2 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1
            jogadasJogador2.push(1)
        }
    }

    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado3() {
    if (ativo3 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado3 = document.getElementById('quadrado3');
            quadrado3.src = './x.png';
            quadrado3.style.background = 'gray'
            quadrado3.style.borderRadius = '5px'
            jogadas++;
            ativo3 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(2)
        } else {
            let quadrado3 = document.getElementById('quadrado3');
            quadrado3.src = './zero.png';
            quadrado3.style.background = 'gray'
            quadrado3.style.borderRadius = '5px'
            jogadas++;
            ativo3 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(2)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado4() {
    if (ativo4 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado4 = document.getElementById('quadrado4');
            quadrado4.src = './x.png';
            quadrado4.style.background = 'gray'
            quadrado4.style.borderRadius = '5px'
            jogadas++;
            ativo4 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(3)
        } else {
            let quadrado4 = document.getElementById('quadrado4');
            quadrado4.src = './zero.png';
            quadrado4.style.background = 'gray'
            quadrado4.style.borderRadius = '5px'
            jogadas++;
            ativo4 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(3)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado5() {
    if (ativo5 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado5 = document.getElementById('quadrado5');
            quadrado5.src = './x.png';
            quadrado5.style.background = 'gray'
            quadrado5.style.borderRadius = '5px'
            jogadas++;
            ativo5 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(4)
        } else {
            let quadrado5 = document.getElementById('quadrado5');
            quadrado5.src = './zero.png';
            quadrado5.style.background = 'gray'
            quadrado5.style.borderRadius = '5px'
            jogadas++;
            ativo5 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(4)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado6() {
    if (ativo6 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado6 = document.getElementById('quadrado6');
            quadrado6.src = './x.png';
            quadrado6.style.background = 'gray'
            quadrado6.style.borderRadius = '5px'
            jogadas++;
            ativo6 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(5)
        } else {
            let quadrado6 = document.getElementById('quadrado6');
            quadrado6.src = './zero.png';
            quadrado6.style.background = 'gray'
            quadrado6.style.borderRadius = '5px'
            jogadas++;
            ativo6 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(5)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado7() {
    if (ativo7 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado7 = document.getElementById('quadrado7');
            quadrado7.src = './x.png';
            quadrado7.style.background = 'gray'
            quadrado7.style.borderRadius = '5px'
            jogadas++;
            ativo7 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(6)
        } else {
            let quadrado7 = document.getElementById('quadrado7');
            quadrado7.src = './zero.png';
            quadrado7.style.background = 'gray'
            quadrado7.style.borderRadius = '5px'
            jogadas++;
            ativo7 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(6)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado8() {
    if (ativo8 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado8 = document.getElementById('quadrado8');
            quadrado8.src = './x.png';
            quadrado8.style.background = 'gray'
            quadrado8.style.borderRadius = '5px'
            jogadas++;
            ativo8 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(7)
        } else {
            let quadrado8 = document.getElementById('quadrado8');
            quadrado8.src = './zero.png';
            quadrado8.style.background = 'gray'
            quadrado8.style.borderRadius = '5px'
            jogadas++;
            ativo8 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(7)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}

function quadrado9() {
    if (ativo9 === 'sim') {
        return;
    } else {
        if (jogadas % 2 === 0) {
            let quadrado9 = document.getElementById('quadrado9');
            quadrado9.src = './x.png';
            quadrado9.style.background = 'gray'
            quadrado9.style.borderRadius = '5px'
            jogadas++;
            ativo9 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador2;
            jogadasJogador1.push(8)
        } else {
            let quadrado9 = document.getElementById('quadrado9');
            quadrado9.src = './zero.png';
            quadrado9.style.background = 'gray'
            quadrado9.style.borderRadius = '5px'
            jogadas++;
            ativo9 = 'sim';
            document.getElementById('jogadas').innerText = jogadas;
            document.getElementById('jogador').innerText = nomeJogador1;
            jogadasJogador2.push(8)
        }
    }
    if (jogadas >= 5) {
        if (verificarVencedor(jogadasJogador1)) {
            alert(nomeJogador1 + ' venceu!');
            reiniciarJogo();
        } else if (verificarVencedor(jogadasJogador2)) {
            alert(nomeJogador2 + ' venceu!');
            reiniciarJogo();
        } else if (jogadas === 9) {
            alert('Empate!');
            reiniciarJogo();
        }
    }
}


iniciar.addEventListener('click', function(ev) {
    nomeJogador1 = document.getElementById('jogador1').value;
    nomeJogador2 = document.getElementById('jogador2').value;

    if (nomeJogador1 && nomeJogador2) {
        document.getElementById('container').style.display = 'block';
        alert('Jogo iniciado...!');

        if (jogadas % 2 === 0) {
            document.getElementById('jogador').innerText = nomeJogador1;
        } else {
            document.getElementById('jogador').innerText = nomeJogador2;
        }

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    } else {
        alert('Favor preencha o nome de ambos os jogadores para iniciar o jogo');
    }
});

