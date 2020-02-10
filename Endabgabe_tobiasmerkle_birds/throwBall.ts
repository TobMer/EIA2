namespace Endabgabe {

    export class ThrowBall {

        color: string;
        scale: number;
        position: Vector;
        size: number;
        target: Vector;
        velocity: Vector;

        constructor() {
            this.position = new Vector(400, 550);

            this.velocity = new Vector(0, 0);


        }

        flytoTarget(_position: Vector): void {

            this.target = _position;


            let x: number = (this.target.x - this.position.x) * 0.03; // geschwindigkeit zu dem ziel 
            let y: number = (this.target.y - this.position.y) * 0.03;

            let velocityball: Vector = new Vector(x, y);

            this.velocity = velocityball;
        }

        draw(): void {

            //let snowball: Path2D = new Path2D();

            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.lineWidth = 5 / this.size;
            crc2.fillStyle = "white";

            crc2.arc(0, 0, 11, 0, 2 * Math.PI); //Radius des Balls

            crc2.strokeStyle = "black";
            crc2.fill();
            crc2.stroke();

            crc2.restore();
            crc2.closePath();


        }


    }




}
