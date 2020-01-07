
namespace aufgabe09 {


    export class Bird {


        position: Vector;
        velocity: Vector;
        size: number;

        constructor() {


            let x: number = 800 * Math.random();
            let y: number = 200 * Math.random();

            console.log("Birds constructor");
            this.position = new Vector(x, y); // position DIESES Objekts

            this.velocity = new Vector(2, 0); // Was macht das hier nochmal




        }


        move(_timeslice: number): void {
            console.log("Birds move");
            this.position.add(this.velocity);

            if (this.position.x > 800)
                
            this.position.x -= crc2.canvas.width; // 
        }

        draw(): void {



            //crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
           
            
            
            crc2.fill();

            crc2.restore();
            crc2.closePath();
        }
    }
}