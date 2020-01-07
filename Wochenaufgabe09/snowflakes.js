"use strict";
var aufgabe09;
(function (aufgabe09) {
    class Snowflake {
        constructor() {
            let x = 800 * Math.random();
            let y = 600 * Math.random();
            console.log("Snowflakes constructor");
            this.position = new aufgabe09.Vector(x, y); // position DIESES Objekts
            this.velocity = new aufgabe09.Vector(0, 3); // Was macht das hier nochmal
        }
        move(_timeslice) {
            console.log("snowflakes move");
            this.position.add(this.velocity);
            if (this.position.y > 600)
                this.position.y -= aufgabe09.crc2.canvas.height; // Hier bewegen sich die SChneeflocken dauerhaft!Wieso?
        }
        draw() {
            aufgabe09.crc2.beginPath();
            aufgabe09.crc2.save();
            aufgabe09.crc2.translate(this.position.x, this.position.y);
            aufgabe09.crc2.fillStyle = "white";
            aufgabe09.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            aufgabe09.crc2.fill();
            aufgabe09.crc2.restore();
            aufgabe09.crc2.closePath();
        }
    }
    aufgabe09.Snowflake = Snowflake;
})(aufgabe09 || (aufgabe09 = {}));
//# sourceMappingURL=snowflakes.js.map