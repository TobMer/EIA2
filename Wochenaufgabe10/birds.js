"use strict";
var aufgabe10;
(function (aufgabe10) {
    class Bird extends aufgabe10.Moveable {
        constructor() {
            super(); // constructor der Superklasse Aufruf!!
            this.colorgrade = 120 - Math.random() * 60;
            this.radiusBird = 24 + Math.random() * 10;
            this.color = "HSLA(" + this.colorgrade + ", 100%, 59%, 1)";
            let x = 800 * Math.random();
            let y = 200 * Math.random();
            this.scale = 0.7 + Math.random() * 1;
            console.log("Birds constructor");
            this.position = new aufgabe10.Vector(x, y); // position DIESES Objekts
            this.velocity = new aufgabe10.Vector(Math.random() * 2, 0); // WErt für die Geschwindigkeit. Mit new wird ein neues Objekt erstellt. SOzuzsagen ein Bauplan
            // this.velocity.x = Math.random() * 2 ;
            this.velocity.y = Math.random() * 1;
            this.draw(); //Birds werden gezeichnet
        }
        move() {
            console.log("Birds move");
            this.position.add(this.velocity);
            if (this.position.x > 900)
                this.position.x = -100;
            if (this.position.y > 700)
                this.position.y = -50;
        }
        draw() {
            let bird = new Path2D();
            //crc2.beginPath();
            aufgabe10.crc2.beginPath();
            aufgabe10.crc2.save();
            aufgabe10.crc2.fillStyle = this.color;
            aufgabe10.crc2.translate(this.position.x, this.position.y);
            aufgabe10.crc2.lineWidth = 1 / this.size;
            bird.ellipse(0, 0, 1 / 2 * this.radiusBird, this.radiusBird, 30, 0, 2 * Math.PI); // Körper der Vögel
            bird.moveTo(-10, 0);
            bird.lineTo(0, -24); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(10, 0); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(0, 24);
            bird.closePath();
            bird.moveTo(40, -8);
            bird.lineTo(60, -16);
            bird.lineTo(40, -20);
            aufgabe10.crc2.stroke();
            aufgabe10.crc2.transform(this.scale, 0, 0, this.scale, 0, 0);
            bird.arc(30, -8, (1 / 2) * this.radiusBird, 0, 2 * Math.PI);
            bird.ellipse(5, -5, (1 / 3) * this.radiusBird, this.radiusBird, 13, 0, 2 * Math.PI);
            aufgabe10.crc2.fill(bird);
            // let farbgrad: number = 120 - Math.random() * 60;
            // let color: string = "HSLA(" + farbgrad + ", 100%, 59%, 1)";
            // crc2.fillStyle = color;
            bird = new Path2D();
            //let x: number = this.position.x;
            // let y: number = this.position.y;
            aufgabe10.crc2.fill();
            aufgabe10.crc2.stroke(bird);
            aufgabe10.crc2.restore();
            aufgabe10.crc2.closePath();
        }
    }
    aufgabe10.Bird = Bird;
})(aufgabe10 || (aufgabe10 = {}));
//# sourceMappingURL=birds.js.map