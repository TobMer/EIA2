namespace aufgabe10 {
    export class Tree extends Object {

        blätterZahl: number = 70;
        transform: DOMMatrix = crc2.getTransform();
        blätter: Path2D = new Path2D();
        maxRadius: number = 66;

        constructor() {
            super();

            this.blätter.arc(500, 450, this.maxRadius, 0, 2 * Math.PI);

        }

        draw(): void {
            // Baumstamm
            crc2.fillStyle = "HSL(30, 80%, 30%)";
            crc2.fillRect(460, 450, 100, -200);
            crc2.save();
            crc2.translate(0, -120);

            do {
                this.y = Math.random() * 190; // Höhe der Blätter
                this.x = (Math.random() - 0.5) * 2 * this.maxRadius; // Radius der Kreise und Blätter
                
                crc2.save();
                crc2.translate(this.x, -this.y);

                let colorAngle: number = 123 - Math.random() * 60; // Farbe der Blätter
                let color: string = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";

                crc2.fillStyle = color;
                crc2.fill(this.blätter);
                crc2.restore();
            } while (--this.blätterZahl > 0);

            crc2.restore();
            crc2.setTransform(this.transform);
        }
    }



}