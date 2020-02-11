namespace Endabgabe {

    export class ThrowBall extends Moveable {

        color: string;
        scale: number;
        position: Vector;
        size: number;
        target: Vector;
        velocity: Vector;

        constructor() {
            super();
            this.position = new Vector(400, 550);

            this.velocity = new Vector(0, 0);


        }

        flytoTarget(_position: Vector): void {

            this.target = _position;

            let x: number = (this.target.x - this.position.x) * 0.05; // geschwindigkeit zu dem ziel 
            let y: number = (this.target.y - this.position.y) * 0.05;

            let velocityball: Vector = new Vector(x, y);
            console.log(velocityball);
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

        update(): void {
            this.move();
            this.draw();

        }

        move(): void {
            this.position.add(this.velocity);

        }

        chillontarget(): void {

            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 10 && this.position.y <= this.target.y + 10 && this.position.x >= this.target.x - 10 && this.position.y >= this.target.y - 10))) {
                this.velocity = new Vector(0, 0);

                setTimeout(removeball, 500);

                for (let moveable of moveables) {
                    if (moveable instanceof Bird) {
                        moveable.shootBird(this.target);
                    }

                }
            }
        }
    }
}
