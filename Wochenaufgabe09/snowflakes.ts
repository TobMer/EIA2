
namespace aufgabe09 {


    export class Snowflakes {


        position: Vector;
        velocity: Vector;
        size: number;

        constructor() {


            let x: number = 800 * Math.random();
            let y: number = 600 * Math.random();

            console.log("Snowflakes constructor");
            this.position = new Vector(x, y); // position DIESES Objekts

            this.velocity = new Vector(0, 2 * Math.random() + 0.7);




        }


        move(_timeslice: number): void {
            console.log("snowflakes move");
            this.position.add(this.velocity);

            if (this.position.y > crc2.canvas.height)
                this.position.x = 800 * Math.random();
            this.position.y = -2;
        }

        draw(): void {



            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = "white";
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            
            crc2.fill();

            crc2.restore();
            crc2.closePath();
        }
    }
}