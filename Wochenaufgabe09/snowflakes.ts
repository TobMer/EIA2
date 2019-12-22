
namespace aufgabe09 {


    export class Snowflake {


        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number) {


            let x: number = 800 * Math.random();
            let y: number = 600 * Math.random();

            console.log("Snowflakes constructor");
            this.position = new Vector(x, y); // position DIESES Objekts
           
            this.velocity = new Vector(0, 3);

           


        }


        move(_timeslice: number): void {
            console.log("Asteroids move");

        }
        draw(): void {
            console.log("schneeflocken  draw");
            crc2.save();
            crc2.translate(this.position.x, this.position.y);