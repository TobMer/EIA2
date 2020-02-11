"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Bird extends Endabgabe.Moveable {
        constructor() {
            super(); // constructor der Superklasse Aufruf!!
            this.greedy = false; // hungrige birds
            this.colorgrade = 120 - Math.random() * 60;
            this.radiusBird = 20 + Math.random() * 10; //Radius der Vogelkörper vorher 24
            this.color = "HSLA(" + this.colorgrade + ", 100%, 59%, 1)"; //Hue, Saturation, Luminance(Farbton, Sättigung,Helligkeit)
            let x = 800 * Math.random();
            let y = 200 * Math.random();
            this.scale = 0.5 + Math.random() * 1; //Insgesamt die Körpergröße
            //console.log("Birds constructor");
            this.position = new Endabgabe.Vector(x, y); // position DIESES Objekts
            this.velocity = new Endabgabe.Vector(Math.random() * 2, Math.random() * 1); // WErt für die Geschwindigkeit. Mit new wird ein neues Objekt erstellt. SOzuzsagen ein Bauplan
            if (Math.random() * 6 <= 1) {
                console.log("hungrig");
                this.greedy = true;
            }
            //this.draw(); //Birds werden gezeichnet
        }
        // Die Birds bewegen sich vm linken Bildrand auf über den Bildrand
        move() {
            //console.log("Birds move");
            this.position.add(this.velocity);
            if (this.position.x > 900)
                this.position.x = -100;
            if (this.position.y > 700)
                this.position.y = -50;
        }
        draw() {
            let bird = new Path2D();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.save();
            Endabgabe.crc2.fillStyle = this.color;
            Endabgabe.crc2.translate(this.position.x, this.position.y);
            bird.ellipse(0, 0, 1 / 2 * this.radiusBird, this.radiusBird, 30, 0, 2 * Math.PI); // Körper der Vögel
            bird.moveTo(-10, 0);
            bird.lineTo(0, -24); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(10, 0); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(0, 24);
            bird.closePath();
            bird.moveTo(40, -8); //schnabel
            bird.lineTo(60, -16);
            bird.lineTo(40, -20);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.transform(this.scale, 0, 0, this.scale, 0, 0);
            bird.arc(30, -8, (1 / 2) * this.radiusBird, 0, 2 * Math.PI);
            bird.ellipse(5, -5, (1 / 3) * this.radiusBird, this.radiusBird, 13, 0, 2 * Math.PI);
            Endabgabe.crc2.fill(bird);
            bird = new Path2D();
            //let x: number = this.position.x;
            // let y: number = this.position.y;
            Endabgabe.crc2.fill();
            Endabgabe.crc2.stroke(bird);
            Endabgabe.crc2.restore();
            Endabgabe.crc2.closePath();
        }
        flytoTarget(_position) {
            console.log("TARGET");
            this.target = _position;
            let x = (this.target.x - this.position.x) * 0.03; // geschwindigkeit zu dem ziel 
            let y = (this.target.y - this.position.y) * 0.03;
            let velocitybird = new Endabgabe.Vector(x, y);
            this.velocity = velocitybird;
        }
        targetBird() {
            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 10 && this.position.y <= this.target.y + 10 && this.position.x >= this.target.x - 10 && this.position.y >= this.target.y - 10))) {
                this.velocity = new Endabgabe.Vector(0, 0); //Geschwindigkeit der Birds wirds 0 und sie bleiben setehen
                setTimeout(Endabgabe.flyAway, 4000); //in der if bedingung
            }
        }
        shootBird(_position) {
            this.target = _position;
            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 30 && this.position.y <= this.target.y + 30 && this.position.x >= this.target.x - 30 && this.position.y >= this.target.y - 30))) {
                this.hitbird = true; // if Bedingung ist erfüllt wenn Vogel an dieser Position ist oder wenn dort geklickt wurde
                console.log("Bin ich getroffen? " + this.hitbird);
            }
        }
    }
    Endabgabe.Bird = Bird;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=birds.js.map