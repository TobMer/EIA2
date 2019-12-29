"use strict";
var aufgabe09;
(function (aufgabe09) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
    let snowflakes = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        zeichneHintergrund();
        zeichneSonne({ x: 100, y: 75 });
        zeichneWolke({ x: 500, y: 175 }, { x: 250, y: 150 });
        zeichneSchneemann({ x: 175, y: 560 });
        zeichneBerge({ x: 0, y: crc2.canvas.height * golden }, 75, 200, "white", "grey");
        zeichneBerge({ x: 0, y: crc2.canvas.height * golden }, 50, 150, "lightgrey", "grey"); //zeichnet nochmal Berge
        zeichneBaum();
        zeichneHut();
        zeichnevogelhaus();
        drawBirds({ x: 0, y: 500 }, { x: 600, y: 600 });
        drawSnowflake();
        window.setInterval(update, 20, zeichneHintergrund);
    }
    //HIntergrund
    function zeichneHintergrund() {
        console.log("Hintergrund");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(160, 60%, 30%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function zeichneSonne(_position) {
        console.log("Sonne", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //=?
        gradient.addColorStop(0, "HSLA(60, 100%, 40%, 1)"); //Sonne
        gradient.addColorStop(1, "HSLA(60, 100%, 90%, 0)"); //Corona
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function zeichneWolke(_position, _size) {
        console.log("Wolke", _position, _size);
        let nParticles = 70;
        let radiusParticle = 70;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI); // Farbe und Radius des PArtikels. Einer
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function zeichneBerge(_position, _min, _max, _colorHigh, _colorLow) {
        console.log("Mountains" + _position, _min, _max, _colorHigh, _colorLow);
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 80;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    function zeichneBaum() {
        console.log("Tree");
        let transform = crc2.getTransform();
        // let x: number = Math.random() * 800;
        let blätterZahl = 70;
        let maxRadius = 66;
        let blätter = new Path2D();
        blätter.arc(500, 450, maxRadius, 0, 2 * Math.PI);
        // Baumstamm
        crc2.fillStyle = "HSL(30, 80%, 30%)";
        crc2.fillRect(460, 450, 100, -200);
        crc2.save();
        crc2.translate(0, -120);
        do {
            let y = Math.random() * 190; // Höhe der Blätter
            let x = (Math.random() - 0.5) * 2 * maxRadius; // Radius der Kreise und Blätter
            crc2.save();
            crc2.translate(x, -y);
            let colorAngle = 123 - Math.random() * 60; // Farbe der Blätter
            let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
            crc2.fillStyle = color;
            crc2.fill(blätter);
            crc2.restore();
        } while (--blätterZahl > 0);
        crc2.restore();
        crc2.setTransform(transform);
    }
    function zeichneSchneemann(_position) {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        let path = new Path2D();
        path.arc(0, 0, 40, 0, 2 * Math.PI); //Kreis 1
        crc2.fillStyle = "white";
        crc2.fill(path);
        crc2.strokeStyle = "black";
        crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -70, 30, 0, 2 * Math.PI); //Kreis2
        crc2.stroke(path);
        crc2.fillStyle = "white";
        crc2.fill(path);
        crc2.strokeStyle = "black";
        crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -120, 20, 0, 2 * Math.PI); // Kreis 3
        crc2.fillStyle = "white"; // Weiße Farbe
        crc2.fill(path);
        // Führt es aus
        crc2.strokeStyle = "black"; // schwarze Umrandung
        crc2.stroke(path); // Führt es aus
        path = new Path2D();
        // drawCircle("#000", 3);
        crc2.restore();
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
        crc2.beginPath();
        crc2.fillStyle = "black";
        crc2.fillRect(150, 360, 50, 60);
        crc2.fillRect(130, 410, 90, 10);
        let nose = new Path2D;
        nose.arc(175, 442, 3, 0, 2 * Math.PI);
        crc2.fillStyle = "orange";
        crc2.fill(nose);
        crc2.stroke(nose);
    }
    function zeichnevogelhaus() {
        console.log("vogelhaus");
        //Stützstab
        crc2.beginPath();
        crc2.fillStyle = "HSL(70, 70%, 15%)";
        crc2.fillRect(590, 600, 25, -200);
        crc2.closePath(); //verbindet den ersten und letzten Punkt, dadurch schließt er den Pfad
        crc2.stroke();
        crc2.beginPath();
        crc2.fillStyle = "black";
        //Kästchen
        crc2.fillStyle = "HSL(230, 70%, 50%)";
        crc2.fillRect(550, 310, 100, 100);
        //Loch
        let loch = new Path2D;
        loch.arc(600, 370, 15, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill(loch);
        crc2.stroke(loch);
        //Dach
        crc2.beginPath();
        crc2.moveTo(530, 310);
        crc2.lineTo(670, 310);
        crc2.lineTo(600, 270);
        crc2.closePath();
        crc2.fillStyle = "darkbrown";
        crc2.fill();
    }
    // tslint:disable-next-line:typedef
    function drawBirds(_position, _size) {
        let bird = new Path2D();
        let nBirds = 21;
        let radiusBird = 24 + Math.random() * 10;
        let colorgrade = 120 - Math.random() * 60;
        let color = "HSLA(" + colorgrade + ", 100%, 59%, 1)";
        crc2.fillStyle = color;
        bird.ellipse(0, 0, 1 / 2 * radiusBird, radiusBird, 30, 0, 2 * Math.PI); // Körper der Vögel
        bird.moveTo(-10, 0);
        bird.lineTo(0, -24); //neuen Pfad aufmachen SChnäbel
        bird.lineTo(10, 0); //neuen Pfad aufmachen SChnäbel
        bird.lineTo(0, 24);
        bird.closePath();
        // crc2.fill(bird);
        bird.moveTo(40, -8);
        bird.lineTo(60, -16);
        bird.lineTo(40, -20);
        bird.arc(30, -8, (1 / 2) * radiusBird, 0, 2 * Math.PI);
        // vogel.ellipse(5, -5, (1 / 3) * radiusVogel, radiusVogel, 13, 0, 2 * Math.PI);
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < nBirds; drawn++) {
            let farbgrad = 120 - Math.random() * 60;
            let color = "HSLA(" + farbgrad + ", 100%, 59%, 1)";
            // let scale: number = 0.7 + Math.random() * 1;
            crc2.fillStyle = color;
            crc2.save();
            let x = Math.random() * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            // crc2.transform(scale, 0, 0, scale, 0, 0);
            crc2.fill(bird);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawSnowflake() {
        console.log("snowflake");
        let nSnowflake = 100;
        for (let i = 0; i < nSnowflake; i++) {
            let snowflake = new aufgabe09.Snowflake();
            snowflakes.push(snowflake);
        }
    }
    function update(_backgroundData) {
        console.log("Update!");
        crc2.putImageData(_backgroundData, 0, 0);
        for (let snowflakes of snowflake) {
            snowflakes.move(1);
            snowflakes.draw();
        }
    }
})(aufgabe09 || (aufgabe09 = {}));
//# sourceMappingURL=aufgabe09.js.map