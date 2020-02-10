"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Birdfood {
        constructor(_position) {
            this.position = _position;
            for (let i = 1; i <= 10; i++) {
                //setTimeout();
            }
        }
        draw() {
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(this.position.x, this.position.y);
            Endabgabe.crc2.lineWidth = 1 / this.size;
            Endabgabe.crc2.fillStyle = "brown";
            Endabgabe.crc2.arc(0, 0, 3, 0, 2 * Math.PI); //Radius des Futters
            Endabgabe.crc2.fill();
            Endabgabe.crc2.restore();
            Endabgabe.crc2.closePath();
        }
    }
    Endabgabe.Birdfood = Birdfood;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=birdfood.js.map