import {MenuPrincipal} from './scene/MenuPrincipal.js'
import {StartGame} from './scene/StartGame.js'
import { FinPartida } from './scene/FinPartida.js';

const config={ //configuracion del escenario
    width: 600,//tamaño de ancho
    height:400,//tamaño de largo
    parent: "container",//tipo contenedor
    type: Phaser.AUTO,
    scene:[MenuPrincipal,StartGame,FinPartida]//escenas se ejecutan por orden

}

var game= new Phaser.Game(config);//variable que ejecuta la constante config de arriba

function preload(){
    console.log("Preload");
}

function create(){
    console.log("Create");
}

function update(time, delta){
    console.log(delta);
}