"use strict";
var aufgabe10;
(function (aufgabe10) {
    class Tree extends aufgabe10.Object {
        constructor() {
            super();
            this.blätterZahl = 70;
            this.transform = aufgabe10.crc2.getTransform();
            this.blätter = new Path2D();
            this.maxRadius = 66;
            this.blätter.arc(500, 450, this.maxRadius, 0, 2 * Math.PI);
        }
        draw() {
            // Baumstamm
            aufgabe10.crc2.fillStyle = "HSL(30, 80%, 30%)";
            aufgabe10.crc2.fillRect(460, 450, 100, -200);
            aufgabe10.crc2.save();
            aufgabe10.crc2.translate(0, -120);
            do {
                this.y = Math.random() * 190; // Höhe der Blätter
                this.x = (Math.random() - 0.5) * 2 * this.maxRadius; // Radius der Kreise und Blätter
                aufgabe10.crc2.save();
                aufgabe10.crc2.translate(this.x, -this.y);
                let colorAngle = 123 - Math.random() * 60; // Farbe der Blätter
                let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
                aufgabe10.crc2.fillStyle = color;
                aufgabe10.crc2.fill(this.blätter);
                aufgabe10.crc2.restore();
            } while (--this.blätterZahl > 0);
            aufgabe10.crc2.restore();
            aufgabe10.crc2.setTransform(this.transform);
        }
    }
    aufgabe10.Tree = Tree;
})(aufgabe10 || (aufgabe10 = {}));
//# sourceMappingURL=tree.js.map