import { Items } from "../items/Items.js";
import {itemsOrganicos, itemsInorganicos} from "../items/DataItems.js";
import { player } from "../player/player.js";

export function crearItemsBasura(scene,n=1,items_basura,widthEscenario,heightEscenario,posicionAleatoria,player=null){



    //Math.floor(Math.random() * (max - min + 1)) + min;
    //Crear objeto basura
     

    


    
     for(let i=0;i<=n;i++){

        let x,y;
         //generar selecion de objeto
    let seleccion=Math.floor(Math.random() * 6) + 0;//aqui se generaran valores aleatorios
    let c=Math.random() < 0.5 ? 1 : 2;
    let tipo;
    //console.log("categoria: "+c+" seleccion: "+seleccion);

    if(c===1)
    tipo=itemsOrganicos[seleccion];//igual, se generara aleatorio
    else tipo=itemsInorganicos[seleccion];//igual, se generara aleatorio
    //Crear cuerpo 
    if(posicionAleatoria){
    x=Math.floor(Math.random() * ((widthEscenario-30) - 0 + 1)) + 0;
    y=Math.floor(Math.random() * ((heightEscenario-30) - 0 + 1)) + 0;
        }
        else{
           
            x=widthEscenario;
            y=heightEscenario;
             //console.log(`posicion APARICION EN CREATE ITEMS: X:${x}   Y:${y}`);


        }


   let cuerpo=new Items(scene,tipo.id, tipo.categoria,40,40,x,y);

   if(!posicionAleatoria){
    let velocidad=Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
   // scene.time.delayedCall(1000, () => {
    scene.physics.moveToObject(cuerpo.getContainer(), player, velocidad);
    //});
     
   }
    

    //this.cuerpo.setColor(tipo.id, tipo.categoria);
    

        items_basura.push({
            'id':Date.now()+i,
        'id_objeto': tipo.id,
        'cuerpo': cuerpo,
        'categoria':tipo.categoria,
        'puntos':tipo.puntos,
        'name':tipo.item
    });

  
    }


}