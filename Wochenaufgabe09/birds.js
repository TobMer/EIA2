"use strict";
var aufgabe09;
(function (aufgabe09) {
    class Bird {
        constructor() {
            let x = 800 * Math.random();
            let y = 200 * Math.random();
            console.log("Birds constructor");
            this.position = new aufgabe09.Vector(x, y); // position DIESES Objekts
            this.velocity = new aufgabe09.Vector(2, 0); // Was macht das hier nochmal
        }
        move(_timeslice) {
            console.log("Birds move");
            this.position.add(this.velocity);
            if (this.position.x > 800)
                this.position.x -= aufgabe09.crc2.canvas.width; // 
        }
        draw() {
            //crc2.beginPath();
            aufgabe09.crc2.save();
            aufgabe09.crc2.translate(this.position.x, this.position.y);
            aufgabe09.crc2.fill();
            aufgabe09.crc2.restore();
            aufgabe09.crc2.closePath();
        }
    }
    aufgabe09.Bird = Bird;
})(aufgabe09 || (aufgabe09 = {}));
//# sourceMappingURL=birds.js.map