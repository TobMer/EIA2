"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Snowflake extends Endabgabe.Moveable {
        // extends erweitert klasse Moveable.
        constructor() {
            super();
            let x = 800 * Math.random();
            let y = 600 * Math.random();
            //console.log("Snowflakes constructor");
            this.position = new Endabgabe.Vector(x, y); // position DIESES Objekts
            this.velocity = new Endabgabe.Vector(0, 3); // Was macht das hier nochmal
        }
        move() {
            //console.log("snowflakes move");
            this.position.add(this.velocity);
            if (this.position.y > 600)
                this.position.y -= Endabgabe.crc2.canvas.height; // Hier bewegen sich die SChneeflocken dauerhaft!Wieso?
        }
        draw() {
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(this.position.x, this.position.y);
            Endabgabe.crc2.fillStyle = "white";
            Endabgabe.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            Endabgabe.crc2.fill();
            Endabgabe.crc2.restore();
            Endabgabe.crc2.closePath();
        }
    }
    Endabgabe.Snowflake = Snowflake;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=snowflakes.js.map