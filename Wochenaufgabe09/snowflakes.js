"use strict";
var aufgabe09;
(function (aufgabe09) {
    class Snowflake {
        constructor(_size) {
            let x = 800 * Math.random();
            let y = 600 * Math.random();
            console.log("Snowflakes constructor");
            this.position = new aufgabe09.Vector(x, y); // position DIESES Objekts
            this.velocity = new aufgabe09.Vector(0, 3);
        }
        move(_timeslice) {
            console.log("Asteroids move");
        }
        draw() {
            console.log("schneeflocken  draw");
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
        }
    }
    aufgabe09.Snowflake = Snowflake;
})(aufgabe09 || (aufgabe09 = {}));
//# sourceMappingURL=snowflakes.js.map