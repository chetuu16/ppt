let onGame = true;

let IAScore = 0;
let PlayerScore = 0;

//Efecto de eleccion rival
const imagenes = {
    0: "./Images/1.png",
    1: "./Images/2.png",
    2: "./Images/3.png",
}

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const IAimg = document.getElementById('IAimg');
let imagenesLength = Object.size(imagenes);
let cont = 0;

let intervalAnimation = setInterval(enemyAnimation, 100);

function enemyAnimation() {
    cont = Math.floor(Math.random() * 3);
    IAimg.src = imagenes[cont];
}

//Efectos en eleccion del jugador
const piedra = document.getElementById('piedra');
const papel = document.getElementById('papel');
const tijeras = document.getElementById('tijeras');

const scoreIA = document.getElementById('topScore');
const scorePlayer = document.getElementById('bottomScore');

const infoText = document.getElementById('infoText');

piedra.addEventListener('mouseenter', function (event) {
    if (onGame) {
        piedra.classList.add('sel');
        piedra.classList.remove('btSelDefault');
    }
});

piedra.addEventListener('mouseout', function () {
    if (onGame) {
        piedra.classList.add('btnSelDefault');
        piedra.classList.remove('sel');
    }
});

papel.addEventListener('mouseenter', function (event) {
    if (onGame) {
        papel.classList.add('sel');
        papel.classList.remove('btSelDefault');
    }
});

papel.addEventListener('mouseout', function () {
    if (onGame) {
        papel.classList.add('btnSelDefault');
        papel.classList.remove('sel');
    }
});

tijeras.addEventListener('mouseenter', function (event) {
    if (onGame) {
        tijeras.classList.add('sel');
        tijeras.classList.remove('btSelDefault');
    }
});

tijeras.addEventListener('mouseout', function () {
    if (onGame) {
        tijeras.classList.add('btnSelDefault');
        tijeras.classList.remove('sel');
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function comprobarResultado(playerElection) {

    let state = "";

    clearInterval(intervalAnimation);

    let opciones = {
        'piedra': 0,
        'papel': 1,
        'tijeras': 2
    }

    if (onGame) {
        if (opciones[playerElection] > cont) {
            if (opciones[playerElection] === 2 && cont === 0) {
                console.log('Piedra Gana - IA');
                state = '¡Piedra Gana!'
                IAScore++;
            } else {
                if (opciones[playerElection] === 1) {
                    console.log('Papel gana - Jugador');
                    state = '¡Papel Gana!'
                    PlayerScore++;
                } else {
                    console.log('Tijeras Ganan - Jugador');
                    state = '¡Tijeras Gana!'
                    PlayerScore++;
                }
            }
        } else if (opciones[playerElection] < cont) {
            if (opciones[playerElection] === 0 && cont === 2) {
                console.log('Piedra Gana - Jugador');
                state = '¡Piedra Gana!'
                PlayerScore++;
            } else {
                if (opciones[playerElection] === 1) {
                    console.log('Tijeras Ganan - IA');
                    state = '¡Tijeras Gana!'
                    IAScore++;
                } else {
                    console.log('Papel gana - IA');
                    state = '¡Papel Gana!'
                    IAScore++;
                }
            }
        } else {
            console.log('Empate');
            state = 'Empate';
        }
        scoreIA.innerHTML = IAScore + "";
        scorePlayer.innerHTML = PlayerScore + "";

        async function retryNow() {
            infoText.classList.remove('infoText');
            infoText.classList.add('infoTextSel');
            await sleep(500);
            infoText.innerHTML = state;
            infoText.classList.remove('infoTextSel');
            infoText.classList.add('infoText');
            await sleep(2500);
            infoText.classList.remove('infoText');
            infoText.classList.add('infoTextSel');
            await sleep(500);
            retry();
            infoText.classList.remove('infoTextSel');
            infoText.classList.add('infoText');
        }

        retryNow();

        onGame = false;
    }
}

//Reiniciamos el juego

const maxJugadas = 3;

function retry() {
    if (IAScore === maxJugadas || PlayerScore === maxJugadas) {
        console.log('Juego Terminado');
        if (IAScore === maxJugadas) {
            console.log('IA Gana');
            infoText.innerHTML = 'Has perdido!';
        } else {
            console.log('Jugador Gana');
            infoText.innerHTML = 'Has ganado!';
        }
        btnRetry.classList.remove('bannerHide');
        btnRetry.classList.add('bannerShow');

    } else {
        infoText.innerHTML = 'Esperando elección...';

        //Reseteamos los colores
        piedra.classList.add('btnSelDefault');
        piedra.classList.remove('sel');
        papel.classList.add('btnSelDefault');
        papel.classList.remove('sel');
        tijeras.classList.add('btnSelDefault');
        tijeras.classList.remove('sel');

        onGame = true;
        intervalAnimation = setInterval(enemyAnimation, 50);
    }
}

const btnRetry = document.getElementById('btnRetryDiv');

btnRetry.onclick = function () {
    IAScore = 0;
    PlayerScore = 0;

    scoreIA.innerHTML = IAScore + "";
    scorePlayer.innerHTML = PlayerScore + "";

    btnRetry.classList.remove('bannerShow');
    btnRetry.classList.add('bannerHide');

    retry();
}