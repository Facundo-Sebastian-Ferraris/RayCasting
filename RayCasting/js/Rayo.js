export class Rayo{
    constructor(con,escenario,x,y,anguloJugador,incrementoAngulo,columna){      
        this.ctx = con;
        this.escenario = escenario;
        this.x = x;
        this.y = y;
        this.anguloJugador = anguloJugador;
        this.incrementoAngulo = incrementoAngulo;
        this.columna = columna;
        this.tamTile = this.escenario.altoT;

        this.wallHitX = 0;
        this.wallHitY = 0;

        this.wallHitXHorizontal = 0;
        this.wallHitYHorizontal = 0;

        this.wallHitXVertical = 0;
        this.wallHitYVertical = 0;

    } 


    setAngulo(angulo){
        this.anguloJugador=this.normalizarAngulo(angulo+this.incrementoAngulo);
    }

    setPosicion(x,y){
        this.x = x;
        this.y = y;
    }

    normalizarAngulo(angulo){
        angulo = angulo % (2*Math.PI);
        if (angulo<0) {
            angulo = angulo + (2*Math.PI);
        }
        return angulo;
    }

    cast(){

        this.xIntercept = 0;
        this.yIntercept = 0;

        //averiguar direccion de movimiento del rayo:
            // ver si el jugador esta mirando para abajo
        this.abajo = this.anguloJugador < Math.PI; 
            // ver si el jugador esta mirando para la izquierda
        this.izquierda = 
            this.anguloJugador > Math.PI/2  &&
            this.anguloJugador < 3*Math.PI/2;
    
        var choqueHorizontal;
        var choqueVertical;
        
        //calculamos la interseccion en eje Y
        this.yIntercept = Math.floor(this.y/this.tamTile)*this.tamTile;
        //en caso de que este mirando para abajo, entonces sumamos otro cuadro mas
        if (this.abajo) {
            this.yIntercept += this.tamTile;
        }

        //calculamos la longitud de la interseccion en x segun Y
        //S(o/h)C(a/h)<<T(o/a)>>
        //a = o/T
        //nota: this.yIntercept siempre es mas grande que this.y
        var adyacente = (this.yIntercept - this.y)/Math.tan(this.anguloJugador);
        this.xIntercept = this.x+adyacente;



        //calcular distancia de cada paso
        this.yStep = this.tamTile;
        this.xStep = this.yStep/ Math.tan(this.anguloJugador);
        console.log(
        '----data inicio---'+'\n'+
        'angulo: '+ this.anguloJugador + '\n'+
        'coordenada real    ('+ this.x + ',' + this.y + ')\n'+
        'coordenada Celda   ('+ parseInt(this.xIntercept/this.tamTile) + ',' + parseInt(this.yIntercept/this.tamTile) + ')\n'+
        'coordenada de paso   ('+ this.xStep + ',' + this.yStep + ')\n'+
        '----data fin ----\n\n\n'
        );
    
        //si se va arriba, se invierte el paso en Y
        if (!this.abajo) {
            this.yStep = -this.yStep;
        }

        //comprobar que el paso en X sea coherente

        if ((this.izquierda && this.xStep>0)||(!this.izquierda && this.xStep<0)) {
            
            this.xStep = -this.xStep; 
        }


        //aca se comienza a hacer steps horizontales
        var siguienteXHorizontal = this.xIntercept;
        var siguienteYHorizontal = this.yIntercept;

        //si apunta hacia arriba, resto un pixel para forzar la colision de la casilla
        if(!this.abajo){
            siguienteYHorizontal--;
        }

        while (!choqueHorizontal) {
            var casillaX= parseInt(siguienteXHorizontal/this.tamTile);
            var casillaY= parseInt(siguienteYHorizontal/this.tamTile);
            // console.log('probando con ('+casillaX + ','+ casillaY+')');
            choqueHorizontal = this.escenario.colision(casillaX,casillaY);
            if (choqueHorizontal) {
                this.wallHitXHorizontal = siguienteXHorizontal;
                this.wallHitYHorizontal = siguienteYHorizontal;
            // console.log('se detecto colision en ('+casillaX + ','+ casillaY+')');

            } else {
                siguienteXHorizontal += this.xStep;
                siguienteYHorizontal += this.xStep;
            // console.log('NO se detecto colision en ('+casillaX + ','+ casillaY+')');

            }
        }
        
        this.wallHitX = this.wallHitXHorizontal;
        this.wallHitY = this.wallHitYHorizontal;
    }

    dibuja(){
        this.cast();

        var xDestino = this.wallHitX;
        var yDestino = this.wallHitY;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(xDestino,yDestino);
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();
    }
}