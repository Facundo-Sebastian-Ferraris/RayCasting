import { Level } from "./Level.js";
import { Player } from "./Player.js";

var canvas;
var ctx;
var FPS = 50;

//dimensiones del canvas en pixeles
var canvasANCHO = 500;
var canvasALTO = 500;


var escenario;
var jugador;


//NIVELES
var nivel1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//-----------------


function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasANCHO;
    canvas.height = canvasALTO;

    escenario = new Level(canvas,ctx,nivel1);
    jugador = new Player(ctx,escenario,150,200);

    //iniciarBucle
    setInterval(function() { principal(); }, 1000 / FPS);
}

function borrarCanvas() {
    canvas.width = canvasANCHO;
    canvas.height = canvasALTO;
}

function principal() {
    borrarCanvas();
    escenario.dibuja();
    jugador.dibuja();
}

//-----------------
//teclado
document.addEventListener('keydown', function(tecla){
    switch(tecla.keyCode){
        case 16:
            jugador.acelera();
        break;
        case 38:
            jugador.arriba();
        break;

        case 40:
            jugador.abajo();
        break;
        case 37:
            jugador.izquierda();
        break;
        case 39:
            jugador.derecha();
        break;
    }
})

document.addEventListener('keyup', function(tecla){
    switch(tecla.keyCode){
        case 16:
            jugador.aceleraSuelta ();
        break;
        case 38:
            jugador.avanzaSuelta();
        break;

        case 40:
            jugador.avanzaSuelta();
        break;
        case 37:
            jugador.giraSuelta();
        break;
        case 39:
            jugador.giraSuelta();
        break;
    }
})

inicializa();