import { armas } from "../items/DataItemsPotenciadores.js";
export class ScenePotenciador extends Phaser.Scene{ 



constructor(){
    super('ScenePotenciador');
    console.log("Estoy en Potenciador")
}

init(data) {
  this.sceneStartGame=data.scene;
  this.puntos=data.puntos;
  this.player=data.player;
  this.puntaje=data.puntaje;
  this.armas=data.armas;

}

crearScroll(){

}

agregarColorNivelArma(arma){
  switch(arma.nivel){

    case 1:
      return 0x616161;

      case 2:
        return 0x00EB41;
      
      case 3:
      return 0x3366ff;
      case 4:
      return 0xcc3333;
      case 5:
      return 0x9933cc;
      default:

      return 0xffcc33;


  }
}


crearPotenciador(){
    
  let division=2;
  let hudContainerPotenciador=this.add.container(0,0);
  let cantidadItemsWidth=5;
  let complementoAlturaMask=0;
  let j=0,k=0,l=0;//para crear divisiones
  let cantidadArmas=this.armas.length;
  //Fondo semitransparente que servira para una mejor visualizacion
  let hudBackgroundPotenciador= this.add.rectangle(0,0,this.widthPantalla-(this.widthPantalla/10),this.heightPantalla-(this.heightPantalla/10),0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);
 
      //Centra el background
  let centrarHorizontal=(this.widthPantalla/2)-(hudBackgroundPotenciador.width/2);
  let centrarVertical=(this.heightPantalla/2)-(hudBackgroundPotenciador.height/2);


    hudBackgroundPotenciador.setPosition(centrarHorizontal,centrarVertical);

     let textoSeleccionPotenciador=this.add.text(0,0,"Selecciona tu Potenciador",{
        wordWrap: { width: ((hudBackgroundPotenciador.width))}, // ancho máximo del texto
    fontSize: '25px',
    color: '#ffffff',
    fontFamily:this.fontText
    })
    .setPosition(centrarHorizontal+10,centrarVertical+10).setInteractive()
    .on('pointerdown', () => {
  console.log('texto titulo presionado');
  
});

let btnActivar=this.add.text(0,0,"  Comprar  ",{
        wordWrap: { width: ((hudBackgroundPotenciador.width))}, // ancho máximo del texto
    fontSize: '30px',
    color: '#000000',
    backgroundColor: '#C7C7C7',
    padding: { x: 20, y: 10 },
    fontFamily: this.fontText      // color del borde
    

    }).setVisible(false);




    let textoPrecio=this.add.text(0,0,"",{
      color:'#FFFF00',
      fontFamily:this.fontText
    });
 
  if(this.widthPantalla<this.heightPantalla) {
    
    cantidadItemsWidth=3;
    complementoAlturaMask=(hudBackgroundPotenciador.width/cantidadItemsWidth);
    division=1;


}
 let medidaItems=hudBackgroundPotenciador.width/cantidadItemsWidth;


    let descripcionItem=this.add.text(centrarHorizontal+10,textoSeleccionPotenciador.y+textoSeleccionPotenciador.height+10,"",{
    wordWrap: { width:( hudBackgroundPotenciador.width/division)-10 }, // ancho máximo del texto
    fontSize: '20px',
    color: '#ffffff',
    fontFamily: this.fontText
    }).setInteractive();
    

    let scrollContainer=this.add.container(0,0).setScrollFactor(0);
    let positionX=0,positionY=textoSeleccionPotenciador.y+(textoSeleccionPotenciador.height);
   

      let maskContainer = this.add.container(centrarHorizontal, centrarVertical + textoSeleccionPotenciador.height +medidaItems ).setScrollFactor(0);
  let maskWidth  =hudBackgroundPotenciador.width ;
  let maskHeight =hudBackgroundPotenciador.height - (textoSeleccionPotenciador.height +medidaItems)-complementoAlturaMask;

  
  //  NUEVO: forma del área visible
  let maskShape = this.add.graphics().setScrollFactor(0);
 //maskShape.fillStyle(0x0000ff,.5);
   
 maskShape.lineStyle(2, 0xffffff);
 
 
  maskShape.fillRect(maskContainer.x, maskContainer.y, maskWidth, maskHeight);
  //maskShape.strokeRect(maskContainer.x, maskContainer.y, maskWidth, maskHeight);
  let seleccionador= this.add.rectangle(0, 0, medidaItems, medidaItems,0xFFFFFF , 0.5).setVisible(false);

  this.sumaScroll=0;

 for(let i=0;i<cantidadArmas;i++){
      

      if(j==k){ 
        j+=cantidadItemsWidth;
        positionX=centrarHorizontal;
        positionY+=medidaItems;
        l++
        //console.log("estor en j=k "+" positionX: "+positionX+" positionY: "+positionY);
      }

      



      let colorFondo= this.agregarColorNivelArma(this.armas[i]);

      let body= this.add.rectangle(positionX, positionY, medidaItems, medidaItems,colorFondo , 1) // rojo sólido
  .setOrigin(0)
  .setStrokeStyle(2, 0xffffff)
  .setInteractive({ useHandCursor: true })
  ; 

      body.input.alwaysEnabled=true;



      let image=this.add.image(positionX,positionY,this.armas[i].diseno).setDisplaySize(medidaItems,medidaItems)
        .setOrigin(0);


    positionX+=medidaItems;

   let itemPotenciador={
    'body':body,
    'image':image,
    'atributos':this.armas[i]
   }



     
   
     // console.log("Creacion de item arma n:"+i+" positionX: "+positionX+" positionY: "+positionY);
    itemPotenciador.body.on('pointerdown', (pointer) => {
  console.log('texto titulo presionado, cuadro '+i);
  textoSeleccionPotenciador.setText(itemPotenciador.atributos.nombre);
  descripcionItem.setText(itemPotenciador.atributos.descripcion);

  //const dentro=itemPotenciador.body.getBounds().contains(pointer.x,pointer.y);
      

      seleccionador.setVisible(true).setPosition(itemPotenciador.body.x+(itemPotenciador.body.width/2),itemPotenciador.body.y+(itemPotenciador.body.height/2)+(this.sumaScroll));
  textoPrecio.setText((itemPotenciador.atributos.puntos)*(itemPotenciador.atributos.nivel)+" ptos ").setPosition(descripcionItem.x+descripcionItem.width+10,descripcionItem.y);
  //dar valor global de seleccion
  this.seleccionItem=itemPotenciador;
  //validar si this.puntos es mayor a puntos de itemPotenciador
  if(this.puntos>=(itemPotenciador.atributos.puntos)*(itemPotenciador.atributos.nivel)) {
    console.log("Puntos del player es mayor que el del item seleccionado "+this.puntos+">"+itemPotenciador.atributos.puntos)
    btnActivar.setActive(true); 
    btnActivar.setBackgroundColor('#17D900'); 
    btnActivar.setColor('#FFFF00');
  }
  else {
        console.log("Puntos del player es menor que el del item seleccionado "+this.puntos+"<"+itemPotenciador.atributos.puntos)
        btnActivar.setActive(false); 
        btnActivar.setBackgroundColor('#118C00'); 
        btnActivar.setColor('#B5B500');}

 //actualizar valores si la pantalla es vertical
if(this.widthPantalla<this.heightPantalla) {

    console.log("Modificando posicion de texto precio");
    
    textoPrecio.setPosition(hudBackgroundPotenciador.x+10,hudBackgroundPotenciador.y+hudBackgroundPotenciador.height-medidaItems+10);
  }

  btnActivar.setPosition(textoPrecio.x+textoPrecio.width+10,textoPrecio.y).setInteractive().setVisible(true);
    


 // itemPotenciador.body.setStrokeStyle(2,0xffffff);

 // if(!dentro)itemPotenciador.body.setStrokeStyle(2,0x000000);
  
});
    scrollContainer.add(itemPotenciador.body);
    scrollContainer.add(itemPotenciador.image);

      k++;


    }

   
    btnActivar.on('pointerdown', () => {

      if(!btnActivar.active) return;
  
  console.log('Boton Presionado en item '+this.seleccionItem);
  console.log(this.seleccionItem);
  console.log( this.armas[Number(this.seleccionItem.atributos.id)-1].nivel);
  this.player.setArma({...this.seleccionItem.atributos});
  this.scene.stop();
  this.puntos-=(this.seleccionItem.atributos.puntos)*(this.seleccionItem.atributos.nivel);
  this.puntaje.setText((this.puntos));

  
  this.scene.resume('StartGame');

  this.armas[Number(this.seleccionItem.atributos.id)-1].nivel++;
  console.log( this.armas[Number(this.seleccionItem.atributos.id)-1].nivel);
  

      
});;

   
    


    


         //  NUEVO contenedor de scroll con máscara


      //  NUEVO: aplicar la máscara al scroll
  let mask = maskShape.createGeometryMask();
  scrollContainer.add(seleccionador);
  scrollContainer.setMask(mask);
  
  
 // seleccionador.setMask(mask);


  //para verificar despues de actualizar datos

  


   




//union de los puntos y cronometro al background para que este todo junto
    hudContainerPotenciador.add(hudBackgroundPotenciador);
    hudContainerPotenciador.add(textoSeleccionPotenciador);
    hudContainerPotenciador.add(scrollContainer);
   // hudContainerPotenciador.add(maskContainer);
    
 
  /*
    
if(this.widthPantalla<this.heightPantalla) {
    
    descripcionItem.setPosition(centrarHorizontal+10,textoSeleccionPotenciador.y+textoSeleccionPotenciador.height+(medidaItems*(l+1))+10)
    descripcionItem.setWordWrapWidth(hudBackgroundPotenciador.width)
    ;

}*/
  // scrollContainer.setMask(maskShape.createGeometryMask());
if((medidaItems*l)>maskHeight){
  this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
  // desplazamiento proporcional (ajusta el 0.5 si va muy rápido/lento)
  scrollContainer.y -= deltaY * 0.5;
  //seleccionador.y-=deltaY*0.5;

  

 

  // calcular los límites reales del contenido visible
  const totalAlturaContenido = Math.ceil(cantidadArmas / cantidadItemsWidth) * medidaItems;
  const alturaVisible = maskHeight;
  console.log("HOLA ESTOY EN SCROLL");

  // límites relativos al punto original del scrollContainer
  const maxScroll = 0;//maskContainer.y; // posición original (parte superior)
  const minScroll = alturaVisible - totalAlturaContenido;//alturaVisible - totalAlturaContenido;//maxScroll - (totalAlturaContenido - alturaVisible);
  //console.log("maxScroll: "+ maxScroll);
  //console.log("minScroll: "+ minScroll);

  // aplicar límites
  if (scrollContainer.y > maxScroll) scrollContainer.y = maxScroll;
  if (scrollContainer.y < minScroll) scrollContainer.y = minScroll;
  //if (seleccionador.y > maxScroll) seleccionador.y = maxScroll;
//if (seleccionador.y < minScroll) seleccionador.y = minScroll;
  //seleccionador.y=scrollContainer.y;
  //this.sumaScroll=scrollContainer.y;
});
/*
scrollContainer.setInteractive(
  new Phaser.Geom.Rectangle(0, 0, hudBackgroundPotenciador.width, maskHeight,0xffffff,0.5),
  Phaser.Geom.Rectangle.Contains
);

this.input.setDraggable(scrollContainer);*/
/*
let dragCapturador=this.add.rectangle(
  hudBackgroundPotenciador.x,
  hudBackgroundPotenciador.y+medidaItems+(textoSeleccionPotenciador.height),
  hudBackgroundPotenciador.width,
  maskHeight,
  0x27F542, 0.5 // transparente
).setOrigin(0);

dragCapturador.setInteractive();
this.input.setDraggable(dragCapturador);

let startY = 0;
let containerStartY = 0;*/

let startY = 0;
let containerStartY = 0;
let isDragging = false;

this.input.on('pointerdown', (pointer) => {
  startY = pointer.y;
  containerStartY = scrollContainer.y;
  isDragging = true;
});

this.input.on('pointermove', (pointer) => {
  if (isDragging && pointer.isDown) {
    let deltaY = pointer.y - startY;
    scrollContainer.y = containerStartY + deltaY;

    // límites
    const totalAlturaContenido = Math.ceil(cantidadArmas / cantidadItemsWidth) * medidaItems;
    const alturaVisible = maskHeight;
    const maxScroll = 0;
    const minScroll = alturaVisible - totalAlturaContenido;

    if (scrollContainer.y > maxScroll) scrollContainer.y = maxScroll;
    if (scrollContainer.y < minScroll) scrollContainer.y = minScroll;
  }
});

this.input.on('pointerup', () => {
  isDragging = false;
});



}



/*
scrollContainer.list.forEach(item=>{
    console.log(" item: "+item);
    item.setInteractive();
    item.on('pointerdown', (pointer) => {
  if (pointer.pointerType === 'touch' || pointer.pointerType === 'mouse') {
    console.log('¡Item tocado o clickeado!');
    
  }
});
});*/





}


  preload(){
      this.widthPantalla=this.sys.game.config.width;
      this.heightPantalla=this.sys.game.config.height;
      this.fontText='FontArcade4';
      this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
      this.input.enabled = true;
      this.seleccionItem;

      console.log(this.sceneStartGame);
      console.log(this.puntos);
      console.log(this.player);
     // this.setVisible(false);
     //this.scene.setVisible(false);
}

create(){
    
    this.crearPotenciador();
}


}