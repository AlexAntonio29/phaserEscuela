import {MenuPrincipal} from './scene/MenuPrincipal.js'
import {StartGame} from './scene/StartGame.js'
import { FinPartida } from './scene/FinPartida.js';

const config={ //configuracion del escenario
    width: document.documentElement.clientWidth,//tamaño de ancho
    height:document.documentElement.clientHeight,//tamaño de largo
    parent: "container", //tipo contenedor
    pixelArt:false,
    type: Phaser.CANVAS,  

    physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
   /* scene:[MenuPrincipal,StartGame,FinPartida] //escenas se ejecutan por orden*/

 /*   //EL APARTADO DE ARRIBA ES EL CORRECTO CORRERE ESTA SCENE PORQUE TRABAJARE CON StartGame*/
   
 scene:[MenuPrincipal,StartGame,FinPartida]
    

}

var game= new Phaser.Game(config);//variable que ejecuta la constante config de arriba

function preload(){
    console.log("Preload");
}

function create(){
    console.log("Create");

    window.addEventListener('resize',()=>{
      const nuevoAncho=window.innerWidth;
      const nuevoAltura=window.innerHeight;
    })

  
}

function update(time, delta){
    console.log(delta);
}