namespace Endabgabe {

    export class Birdfood {

        color: string;
        scale: number;
        position: Vector;
        size: number;

        constructor(_position: Vector) {
            this.position = _position;

            for (let i: number = 1; i <= 10; i++) {

                //setTimeout();
            }

        }


        //Futter von Birds
        draw(): void {


            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.lineWidth = 1 / this.size;
            crc2.fillStyle = "brown";
            crc2.arc(0, 0, 3, 0, 2 * Math.PI); //Radius des Futters


            crc2.fill();

            crc2.restore();
            crc2.closePath();


        }
    }
}