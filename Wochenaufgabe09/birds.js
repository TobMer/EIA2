"use strict";
var aufgabe09;
(function (aufgabe09) {
    class Bird {
        constructor() {
            this.colorgrade = 120 - Math.random() * 60;
            this.radiusBird = 24 + Math.random() * 10;
            this.color = "HSLA(" + this.colorgrade + ", 100%, 59%, 1)";
            let x = 800 * Math.random();
            let y = 200 * Math.random();
            this.scale = 0.7 + Math.random() * 1;
            console.log("Birds constructor");
            this.position = new aufgabe09.Vector(x, y); // position DIESES Objekts
            this.velocity = new aufgabe09.Vector(2, 0); // Was macht das hier nochmal
            this.draw(); //Birds werden gezeichnet
        }
        move(_timeslice) {
            console.log("Birds move");
            this.position.add(this.velocity);
            if (this.position.x > 900)
                this.position.x = -100; // 
        }
        draw() {
            let bird = new Path2D();
            //crc2.beginPath();
            aufgabe09.crc2.beginPath();
            aufgabe09.crc2.save();
            aufgabe09.crc2.fillStyle = this.color;
            aufgabe09.crc2.translate(this.position.x, this.position.y);
            bird.ellipse(0, 0, 1 / 2 * this.radiusBird, this.radiusBird, 30, 0, 2 * Math.PI); // Körper der Vögel
            bird.moveTo(-10, 0);
            bird.lineTo(0, -24); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(10, 0); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(0, 24);
            bird.closePath();
            bird.moveTo(40, -8);
            bird.lineTo(60, -16);
            bird.lineTo(40, -20);
            aufgabe09.crc2.transform(this.scale, 0, 0, this.scale, 0, 0);
            bird.arc(30, -8, (1 / 2) * this.radiusBird, 0, 2 * Math.PI);
            bird.ellipse(5, -5, (1 / 3) * this.radiusBird, this.radiusBird, 13, 0, 2 * Math.PI);
            aufgabe09.crc2.fill(bird);
            // let farbgrad: number = 120 - Math.random() * 60;
            // let color: string = "HSLA(" + farbgrad + ", 100%, 59%, 1)";
            // crc2.fillStyle = color;
            bird = new Path2D();
            //let x: number = this.position.x;
            // let y: number = this.position.y;
            aufgabe09.crc2.fill();
            aufgabe09.crc2.stroke(bird);
            aufgabe09.crc2.restore();
            aufgabe09.crc2.closePath();
        }
    }
    aufgabe09.Bird = Bird;
})(aufgabe09 || (aufgabe09 = {}));
//# sourceMappingURL=birds.js.map