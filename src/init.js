import {MenuPrincipal} from './scene/MenuPrincipal.js'
import {StartGame} from './scene/StartGame.js'
import { FinPartida } from './scene/FinPartida.js';

const config={
    width: 600,
    height:400,
    parent: "container",
    type: Phaser.AUTO,
    scene:[MenuPrincipal,StartGame,FinPartida]

}

var game= new Phaser.Game(config);

function preload(){
    console.log("Preload");
}

function create(){
    console.log("Create");
}

function update(time, delta){
    console.log(delta);
}