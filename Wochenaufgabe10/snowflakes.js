"use strict";
var aufgabe10;
(function (aufgabe10) {
    class Snowflake {
        constructor() {
            let x = 800 * Math.random();
            let y = 600 * Math.random();
            //console.log("Snowflakes constructor");
            this.position = new aufgabe10.Vector(x, y); // position DIESES Objekts
            this.velocity = new aufgabe10.Vector(0, 3); // Was macht das hier nochmal
        }
        move(_timeslice) {
            //console.log("snowflakes move");
            this.position.add(this.velocity);
            if (this.position.y > 600)
                this.position.y -= aufgabe10.crc2.canvas.height; // Hier bewegen sich die SChneeflocken dauerhaft!Wieso?
        }
        draw() {
            aufgabe10.crc2.beginPath();
            aufgabe10.crc2.save();
            aufgabe10.crc2.translate(this.position.x, this.position.y);
            aufgabe10.crc2.fillStyle = "white";
            aufgabe10.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            aufgabe10.crc2.fill();
            aufgabe10.crc2.restore();
            aufgabe10.crc2.closePath();
        }
    }
    aufgabe10.Snowflake = Snowflake;
})(aufgabe10 || (aufgabe10 = {}));
//# sourceMappingURL=snowflakes.js.map