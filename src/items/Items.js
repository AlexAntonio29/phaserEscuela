


export class Items{


    constructor(scene,id,categoria,width=25,height=25,x=0,y=0,textura=""){

     this.width=width;
     this.height=height;
     this.x=x;
     this.y=y;
     this.scene=scene;
     this.id=id;
     this.categoria=categoria;
     this.graphics;

    
    

          
          //console.log("Scene en items: "+this.scene);

        //this.graphics=scene.add.graphics();
        //this.setColor(id,categoria);
       //this.scene.load.image("item","./assets/items/Cascara_platano.jpg"); 
       
      this.setBody(textura);
       // this.graphics.setOrigin(0);
        //this.graphics.setDisplaySize(this.i*2,this.j*2);
        //this.graphics.body.setSize(500, 500);
        
        //this.graphics.setOrigins(0);
        //this.graphics.setDisplaySize(20, 25);

        //this.graphics.fillStyle(0x275EF5,1);//color de fondo
        /*this.container = scene.add.container(0, 0, [this.graphics]);
          scene.physics.add.existing(this.container);
          this.container.body.setImmovable(true);
          this.container.body.setAllowGravity(false);

          this.container.body.setSize(20,20);*/
        
       
         
    }

    getContainer(){
     //console.log("Dentro de getContainer Items");
     return this.graphics;
    }

    getGraphics(){
      return this.graphics;
    }

    
    setBody(n="reloj"){//n es el nombre de la textura si es que se crea


        if(this.categoria==="organico"){
           
            
             
                    //this.graphics.setTexture("item_basura"+n);

                    this.graphics=this.scene.physics.add.sprite(0,0,"item_basura"+this.id)
                    .setOrigin(0)
                    .setDisplaySize(this.width,this.height)
                    .setPosition(this.x,this.y)
                    ;

                     this.scene.anims.create({
        key: "item_mov"+this.id,
        frames: this.scene.anims.generateFrameNumbers("item_basura"+this.id, { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
          });
    this.graphics.play("item_mov"+this.id);



                  }
            else if(this.categoria==="inorganico") {


                    this.graphics=this.scene.physics.add.sprite(0,0,"item_basura"+(parseInt(this.id)+6))
                    .setOrigin(0)
                    .setDisplaySize(this.width,this.height)
                    .setPosition(this.x,this.y)
                    ;

                     this.scene.anims.create({
        key: "item_mov"+(parseInt(this.id)+6),
        frames: this.scene.anims.generateFrameNumbers("item_basura"+(parseInt(this.id)+6), { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
          });
    this.graphics.play("item_mov"+(parseInt(this.id)+6));
                 
}
else {this.graphics=this.scene.physics.add.sprite(0,0,n)
                    .setOrigin(0)
                    .setDisplaySize(this.width,this.height)
                    .setPosition(this.x,this.y)
                    ;
                  console.log("Creando item reloj");

                  }

                 
                    
//this.graphics.body.setCollideWorldBounds(true);
          //this.graphics.setTexture('item');
       // this.graphics.fillCircle(this.i,this.j,this.k);
        //this.graphics.strokeCircle(this.i,this.j,this.k);

        


        

    }


   setItemPosition(x,y) {
    //this.graphics.setPosition(x,y);
    this.graphics.setPosition(x,y);
 
    }

    setItemMovementX(n=1){
    
     this.graphics.x=this.graphics.x+n;
     
    }
     setItemMovementY(){
     this.graphics.y++;
     
    }

    setItem(){}

    setRecoger(){

     this.graphics.destroy();
    }


}