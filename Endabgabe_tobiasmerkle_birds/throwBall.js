"use strict";
var Endabgabe;
(function (Endabgabe) {
    class ThrowBall extends Endabgabe.Moveable {
        constructor() {
            super();
            this.position = new Endabgabe.Vector(400, 550);
            this.velocity = new Endabgabe.Vector(0, 0);
        }
        flytoTarget(_position) {
            this.target = _position;
            let x = (this.target.x - this.position.x) * 0.05; // geschwindigkeit zu dem ziel 
            let y = (this.target.y - this.position.y) * 0.05;
            let velocityball = new Endabgabe.Vector(x, y);
            console.log(velocityball);
            this.velocity = velocityball;
        }
        draw() {
            //let snowball: Path2D = new Path2D();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(this.position.x, this.position.y);
            Endabgabe.crc2.lineWidth = 5 / this.size;
            Endabgabe.crc2.fillStyle = "white";
            Endabgabe.crc2.arc(0, 0, 11, 0, 2 * Math.PI); //Radius des Balls
            Endabgabe.crc2.strokeStyle = "black";
            Endabgabe.crc2.fill();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.restore();
            Endabgabe.crc2.closePath();
        }
        update() {
            this.move();
            this.draw();
        }
        move() {
            this.position.add(this.velocity);
        }
        chillontarget() {
            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 10 && this.position.y <= this.target.y + 10 && this.position.x >= this.target.x - 10 && this.position.y >= this.target.y - 10))) {
                this.velocity = new Endabgabe.Vector(0, 0);
                setTimeout(Endabgabe.removeball, 500);
                for (let moveable of Endabgabe.moveables) {
                    if (moveable instanceof Endabgabe.Bird) {
                        moveable.shootBird(this.target);
                    }
                }
            }
        }
    }
    Endabgabe.ThrowBall = ThrowBall;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=throwBall.js.map