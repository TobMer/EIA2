"use strict";
var aufgabe09;
(function (aufgabe09) {
    window.addEventListener("load", handleLoad);
    let golden = 0.62;
    let snowflakes = [];
    let birds = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        aufgabe09.crc2 = canvas.getContext("2d");
        zeichneHintergrund();
        zeichneSonne({ x: 100, y: 75 });
        zeichneWolke({ x: 500, y: 175 }, { x: 250, y: 150 });
        zeichneSchneemann({ x: 175, y: 560 });
        zeichneBerge({ x: 0, y: aufgabe09.crc2.canvas.height * golden }, 75, 200, "white", "grey");
        zeichneBerge({ x: 0, y: aufgabe09.crc2.canvas.height * golden }, 50, 150, "lightgrey", "grey"); //zeichnet nochmal Berge
        zeichneBaum();
        zeichneHut();
        zeichnevogelhaus();
        //drawBirds({ x: 0, y: 500 }, { x: 600, y: 600 });
        //drawsnowflake({ x: 0, y: 600 }, { x: 800, y: 600 });
        let background = aufgabe09.crc2.getImageData(0, 0, 800, 600);
        window.setInterval(update, 20, background);
        drawSnowflake();
        createBirds();
    }
    //HIntergrund
    function zeichneHintergrund() {
        //console.log("Hintergrund");
        let gradient = aufgabe09.crc2.createLinearGradient(0, 0, 0, aufgabe09.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(160, 60%, 30%)");
        aufgabe09.crc2.fillStyle = gradient;
        aufgabe09.crc2.fillRect(0, 0, aufgabe09.crc2.canvas.width, aufgabe09.crc2.canvas.height);
    }
    function zeichneSonne(_position) {
        console.log("Sonne", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = aufgabe09.crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //=?
        gradient.addColorStop(0, "HSLA(60, 100%, 40%, 1)"); //Sonne
        gradient.addColorStop(1, "HSLA(60, 100%, 90%, 0)"); //Corona
        aufgabe09.crc2.save();
        aufgabe09.crc2.translate(_position.x, _position.y);
        aufgabe09.crc2.fillStyle = gradient;
        aufgabe09.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        aufgabe09.crc2.fill();
        aufgabe09.crc2.restore();
    }
    function zeichneWolke(_position, _size) {
        console.log("Wolke", _position, _size);
        let nParticles = 70;
        let radiusParticle = 70;
        let particle = new Path2D();
        let gradient = aufgabe09.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI); // Farbe und Radius des PArtikels. Einer
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        aufgabe09.crc2.save();
        aufgabe09.crc2.translate(_position.x, _position.y);
        aufgabe09.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            aufgabe09.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            aufgabe09.crc2.translate(x, y);
            aufgabe09.crc2.fill(particle);
            aufgabe09.crc2.restore();
        }
        aufgabe09.crc2.restore();
    }
    function zeichneBerge(_position, _min, _max, _colorHigh, _colorLow) {
        console.log("Mountains" + _position, _min, _max, _colorHigh, _colorLow);
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 80;
        let x = 0;
        aufgabe09.crc2.save();
        aufgabe09.crc2.translate(_position.x, _position.y);
        aufgabe09.crc2.beginPath();
        aufgabe09.crc2.moveTo(0, 0);
        aufgabe09.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            aufgabe09.crc2.lineTo(x, y);
        } while (x < aufgabe09.crc2.canvas.width);
        aufgabe09.crc2.lineTo(x, 0);
        aufgabe09.crc2.closePath();
        let gradient = aufgabe09.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        aufgabe09.crc2.fillStyle = gradient;
        aufgabe09.crc2.fill();
        aufgabe09.crc2.restore();
    }
    function zeichneBaum() {
        console.log("Tree");
        let transform = aufgabe09.crc2.getTransform();
        // let x: number = Math.random() * 800;
        let blätterZahl = 70;
        let maxRadius = 66;
        let blätter = new Path2D();
        blätter.arc(500, 450, maxRadius, 0, 2 * Math.PI);
        // Baumstamm
        aufgabe09.crc2.fillStyle = "HSL(30, 80%, 30%)";
        aufgabe09.crc2.fillRect(460, 450, 100, -200);
        aufgabe09.crc2.save();
        aufgabe09.crc2.translate(0, -120);
        do {
            let y = Math.random() * 190; // Höhe der Blätter
            let x = (Math.random() - 0.5) * 2 * maxRadius; // Radius der Kreise und Blätter
            aufgabe09.crc2.save();
            aufgabe09.crc2.translate(x, -y);
            let colorAngle = 123 - Math.random() * 60; // Farbe der Blätter
            let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
            aufgabe09.crc2.fillStyle = color;
            aufgabe09.crc2.fill(blätter);
            aufgabe09.crc2.restore();
        } while (--blätterZahl > 0);
        aufgabe09.crc2.restore();
        aufgabe09.crc2.setTransform(transform);
    }
    function zeichneSchneemann(_position) {
        aufgabe09.crc2.save();
        aufgabe09.crc2.translate(_position.x, _position.y);
        let path = new Path2D();
        path.arc(0, 0, 40, 0, 2 * Math.PI); //Kreis 1
        aufgabe09.crc2.fillStyle = "white";
        aufgabe09.crc2.fill(path);
        aufgabe09.crc2.strokeStyle = "black";
        aufgabe09.crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -70, 30, 0, 2 * Math.PI); //Kreis2
        aufgabe09.crc2.stroke(path);
        aufgabe09.crc2.fillStyle = "white";
        aufgabe09.crc2.fill(path);
        aufgabe09.crc2.strokeStyle = "black";
        aufgabe09.crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -120, 20, 0, 2 * Math.PI); // Kreis 3
        aufgabe09.crc2.fillStyle = "white"; // Weiße Farbe
        aufgabe09.crc2.fill(path);
        // Führt es aus
        aufgabe09.crc2.strokeStyle = "black"; // schwarze Umrandung
        aufgabe09.crc2.stroke(path); // Führt es aus
        path = new Path2D();
        // drawCircle("#000", 3);
        aufgabe09.crc2.restore();
    }
    // function drawCircle(color: string, radius: number): void {
    //     crc2.strokeStyle = crc2.fillStyle = color;
    //     crc2.beginPath();
    //     crc2.arc(175, 500, radius, 0, Math.PI * 2, true);
    //     crc2.arc(175, 485, radius, 0, Math.PI * 2, true);
    //     crc2.arc(175, 470, radius, 0, Math.PI * 2, true);
    //     crc2.stroke();
    //     crc2.fill();
    // }
    function zeichneHut() {
        aufgabe09.crc2.beginPath();
        aufgabe09.crc2.fillStyle = "black";
        aufgabe09.crc2.fillRect(150, 360, 50, 60);
        aufgabe09.crc2.fillRect(130, 410, 90, 10);
        let nose = new Path2D;
        nose.arc(175, 442, 3, 0, 2 * Math.PI);
        aufgabe09.crc2.fillStyle = "orange";
        aufgabe09.crc2.fill(nose);
        aufgabe09.crc2.stroke(nose);
    }
    function zeichnevogelhaus() {
        console.log("vogelhaus");
        //Stützstab
        aufgabe09.crc2.beginPath();
        aufgabe09.crc2.fillStyle = "HSL(70, 70%, 15%)";
        aufgabe09.crc2.fillRect(590, 600, 25, -200);
        aufgabe09.crc2.closePath(); //verbindet den ersten und letzten Punkt, dadurch schließt er den Pfad
        aufgabe09.crc2.stroke();
        aufgabe09.crc2.beginPath();
        aufgabe09.crc2.fillStyle = "black";
        //Kästchen
        aufgabe09.crc2.fillStyle = "HSL(230, 70%, 50%)";
        aufgabe09.crc2.fillRect(550, 310, 100, 100);
        //Loch
        let loch = new Path2D;
        loch.arc(600, 370, 15, 0, 2 * Math.PI);
        aufgabe09.crc2.fillStyle = "black";
        aufgabe09.crc2.fill(loch);
        aufgabe09.crc2.stroke(loch);
        //Dach
        aufgabe09.crc2.beginPath();
        aufgabe09.crc2.moveTo(530, 310);
        aufgabe09.crc2.lineTo(670, 310);
        aufgabe09.crc2.lineTo(600, 270);
        aufgabe09.crc2.closePath();
        aufgabe09.crc2.fillStyle = "darkbrown";
        aufgabe09.crc2.fill();
    }
    // tslint:disable-next-line:typedef
    function createBirds() {
        console.log("create Birds");
        //let bird: Path2D = newFunction();
        let nBirds = 21;
        // crc2.save();
        //crc2.translate(_position.x, _position.y);
        for (let i = 0; i < nBirds; i++) {
            // crc2.save();
            // let x: number = Math.random();
            // let y: number = - Math.random();
            // crc2.translate(x, y);
            // crc2.transform(scale, 0, 0, scale, 0, 0);
            // crc2.restore();
            let bird = new aufgabe09.Bird();
            birds.push(bird); // ich pushe die Birds
        }
        // crc2.restore();
        // function newFunction(): Path2D {
        //     return new Path2D();
        // }
    }
    function drawSnowflake() {
        //console.log("snowflake");
        let nSnowflake = 120;
        for (let i = 0; i < nSnowflake; i++) {
            let snowflake = new aufgabe09.Snowflake();
            snowflakes.push(snowflake);
        }
    }
    function update(_backgroundData) {
        //console.log("Update!");
        void aufgabe09.crc2.putImageData(_backgroundData, 0, 0);
        for (let snowflake of snowflakes) { // SCHNEEFLOCKEN
            snowflake.move(1);
            snowflake.draw();
        }
        for (let bird of birds) { // VÖGEL
            bird.move(1);
            bird.draw();
        }
    }
})(aufgabe09 || (aufgabe09 = {}));
//# sourceMappingURL=aufgabe09.js.map