"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Tree extends Object {
        constructor() {
            super();
            this.blätterZahl = 70;
            this.transform = Endabgabe.crc2.getTransform();
            this.blätter = new Path2D();
            this.maxRadius = 66;
            this.blätter.arc(500, 450, this.maxRadius, 0, 2 * Math.PI);
        }
        draw() {
            // Baumstamm
            Endabgabe.crc2.fillStyle = "HSL(30, 80%, 30%)";
            Endabgabe.crc2.fillRect(460, 450, 100, -200);
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(0, -120);
            do {
                this.y = Math.random() * 190; // Höhe der Blätter
                this.x = (Math.random() - 0.5) * 2 * this.maxRadius; // Radius der Kreise und Blätter
                Endabgabe.crc2.save();
                Endabgabe.crc2.translate(this.x, -this.y);
                let colorAngle = 123 - Math.random() * 60; // Farbe der Blätter
                let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
                Endabgabe.crc2.fillStyle = color;
                Endabgabe.crc2.fill(this.blätter);
                Endabgabe.crc2.restore();
            } while (--this.blätterZahl > 0);
            Endabgabe.crc2.restore();
            Endabgabe.crc2.setTransform(this.transform);
        }
    }
    Endabgabe.Tree = Tree;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=tree.js.map