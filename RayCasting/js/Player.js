import { Rayo } from "./Rayo.js";

var colorPlayer = 'white';   
export class Player {
    constructor(con,escenario,x,y){
        this.ctx = con;
        this.escenario = escenario;

        //x e y es spawn
        this.x=x;
        this.y=y;
        this.avanza = 0;    // 0 = parado, 1 = adelante, -1 = atras
        this.gira = 0;      // -1 = giroIzq, 1 = giroDer, 0= noGiro

        this.anguloRotacion = 0;

        this.velocidadMovimiento = 3;           //PIXEL
        this.velocidadGiro = this.velocidadMovimiento*(Math.PI / 180); //GRADOS
    
        this.rayo = new Rayo(this.ctx,this.escenario,this.x,this.y,this.anguloRotacion,0);
    }

    arriba(){
        this.avanza=1;
    }
    abajo(){
        this.avanza=-1;
    }
    izquierda(){
        this.gira=-1;
    }
    derecha(){
        this.gira=1;
    }

    avanzaSuelta(){
        this.avanza=0;
    }
    giraSuelta(){
        this.gira=0;
    }

    acelera(){
        this.velocidadMovimiento *= 2;
    }
    aceleraSuelta(){
        this.velocidadMovimiento /= 2;
    }

    normalizarAngulo(angulo){
        angulo = angulo % (2*Math.PI);
        if (angulo<0) {
            angulo = angulo + (2*Math.PI);
        }
        return angulo;
    }

    actualiza(){
        var nuevaX = this.x +(this.avanza*Math.cos(this.anguloRotacion)*this.velocidadMovimiento);
        var nuevaY = this.y +(this.avanza*Math.sin(this.anguloRotacion)*this.velocidadMovimiento);
        var condicion = this.colision(this.x,this.y,nuevaX,nuevaY);
        switch (condicion) {//0: no colision //1:colision vertical //2: colision horizontal //3: coliscion esquina
            case 0:
                this.x = nuevaX;
                this.y = nuevaY;
                break;
            case 1:
                this.x=nuevaX;
                break;
            case 2:
                this.y=nuevaY;
            default:
                break;
        }

        this.anguloRotacion += this.gira * this.velocidadGiro;
        this.anguloRotacion = this.normalizarAngulo(this.anguloRotacion);
    }


    colision(x0,y0,x1,y1){
        var casillaX0 = parseInt(x0/this.escenario.anchoT);
        var casillaY0 = parseInt(y0/this.escenario.altoT);

        var casillaX1 = parseInt(x1/this.escenario.anchoT);
        var casillaY1 = parseInt(y1/this.escenario.altoT);

        var r=0;//0: no colision //1:colision vertical //2: colision horizontal //3: coliscion esquina    
        // Verificamos si estamos moviéndonos principalmente en el eje X (horizontal)

        if (this.escenario.colision(casillaX1, casillaY1)) {
            //colisionVertical cuando lo nuevo esta en celda negra pero a los lados
            if (casillaX0==casillaX1) {
                r+=1;
            }
            if (casillaY0==casillaY1) {
                r+=2;
            }
            //colisionHorizontal
        }
        console.log('codigo colision: '+ r 
            +'\nCeldaJugador('+casillaX0+','+casillaY0+')'
            +'\nCeldaPensada('+casillaX1+','+casillaY1+')'
        );
        return r;     
    }

    dibuja(){
        this.actualiza();

        //cuadrado
        this.ctx.fillStyle = colorPlayer;
        this.ctx.fillRect(this.x-3, this.y-3, 6, 6);

        //lineaDirecion
        var xDestino = this.x + Math.cos(this.anguloRotacion)*40;
        var yDestino = this.y + Math.sin(this.anguloRotacion)*40;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(xDestino,yDestino);
        this.ctx.strokeStyle = '#FFFF';
        this.ctx.stroke();
    }

}