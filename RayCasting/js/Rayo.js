export class Rayo{
    constructor(con,escenario,x,y,anguloJugador,incrementoAngulo,columna){
        this.ctx = con;
        this.escenario = escenario;
        this.x = x;
        this.y = y;
        this.anguloJugador = anguloJugador;
        this.incrementoAngulo = incrementoAngulo;
        this.columna = columna;

        console.log("rayo creado: " + this.anguloJugador);
    } 

    cast(){
        this.xIntercept = 0;
        this.yIntercept = 0;

        //stepx
        //stepy

        //averiguar direccion de movimiento del rayo
        this.abajo = this.anguloJugador < Math.PI;
        this.izquierda = 
            this.anguloJugador > Math.PI/2  &&
            this.anguloJugador < 3*Math.PI/2;
    
    
        var choqueHorizontal;
        var choqueVertical;
        var tamFile = this.escenario.altoT;

        this.yIntercept = Math.floor(this.y/tamFile)*tamFile;
        if (this.abajo) {
            this.yIntercept += tamFile;
        }

        var adyacente = (this.yIntercept - this.y)/Math.tan(this.anguloJugador);

        //calcular distancia de cada paso
        this.yStep = tamFile;
        this.xStep = tamFile/ Math.tan(this.anguloJugador);
    
        //si se va arriba, se invierte el paso y
        if (!this.abajo) {
            this.yStep = -this.yStep;
        }

        //comprobar que el paso en X sea coherente
        if ((this.izquierda && this.xStep>0)||(!this.izquierda && this.xStep<0)) {
            this.xStep = -this.xStep; 
        }

        var siguienteXHorizontal = this.xIntercept;
        var siguienteYHorizontal = this.yIntercept;

        //si apunta hacia arriba, resto un pixel para forzar la colision de la casilla

    }
}