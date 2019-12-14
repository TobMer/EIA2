"use strict";
var l08aufgabe;
(function (l08aufgabe) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let golden = 0.62;
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
        zeichneHut({ x: 175, y: 575 });
        zeichnevogelhaus({ x: 600, y: 425 });
        zeichneVögel({ x: 0, y: 500 }, { x: 600, y: 600 });
        zeichneschneeflocken({ x: 0, y: 600 }, { x: 800, y: 600 });
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
        let nBranches = 50;
        let maxRadius = 60;
        let branch = new Path2D();
        branch.arc(500, 470, maxRadius, 0, 2 * Math.PI);
        crc2.fillStyle = "HSL(30, 70%, 40%)"; // Baumstamm
        crc2.fillRect(500, 450, 20, -100);
        crc2.save();
        crc2.translate(0, -120);
        do {
            let y = Math.random() * 150;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            crc2.save();
            crc2.translate(0, -y);
            crc2.translate(x, 0);
            let colorAngle = 120 - Math.random() * 60;
            let color = "HSLA(" + colorAngle + ", 50%, 60%, 0.5)";
            crc2.fillStyle = color;
            crc2.fill(branch);
            crc2.restore();
        } while (--nBranches > 0);
        crc2.restore();
        crc2.setTransform(transform);
    }
    function zeichneSchneemann(_position) {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        let path = new Path2D();
        path.arc(0, 0, 40, 0, 2 * Math.PI); //KReis 1
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
        crc2.strokeStyle = "black"; // schwarze umrandung
        crc2.stroke(path); // Führt es aus
        path = new Path2D();
        drawCircle("#000", 200, 160, 3);
        crc2.restore();
    }
    function drawCircle(color, x, y, radius) {
        crc2.strokeStyle = crc2.fillStyle = color;
        crc2.beginPath();
        crc2.arc(175, 500, radius, 0, Math.PI * 2, true);
        crc2.arc(175, 485, radius, 0, Math.PI * 2, true);
        crc2.arc(175, 470, radius, 0, Math.PI * 2, true);
        crc2.stroke();
        crc2.fill();
    }
    function zeichneHut(_position) {
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
    function zeichnevogelhaus(_position, _size) {
        console.log("vogelhaus", _position, _size);
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
        let dach = new Path2D;
        crc2.beginPath();
        crc2.moveTo(530, 310);
        crc2.lineTo(670, 310);
        crc2.lineTo(600, 270);
        crc2.closePath();
        crc2.fillStyle = "darkbrown";
        crc2.fill();
    }
    // tslint:disable-next-line:typedef
    function zeichneVögel(_position, _size) {
        let nVögel = 21;
        let radiusVogel = 7 + Math.random() * 10;
        let vogel = new Path2D();
        vogel.arc(0, 0, radiusVogel, 0, 2 * Math.PI);
        let kopf = 0 - radiusVogel;
        vogel.arc(kopf, -2, (1 / 2) * radiusVogel, 0, 2 * Math.PI);
        vogel.ellipse(5, -5, (1 / 3) * radiusVogel, radiusVogel, 13, 0, 2 * Math.PI);
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < nVögel; drawn++) {
            let colorAngle = 120 - Math.random() * 290;
            let color = "HSLA(" + colorAngle + ", 90%, 50 %, 0.7)";
            let scale = 0.7 + Math.random() * 1;
            crc2.fillStyle = color;
            crc2.save();
            let x = Math.random() * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.transform(scale, 0, 0, scale, 0, 0);
            crc2.fill(vogel);
            crc2.restore();
            crc2.fillStyle = "green";
        }
        crc2.restore();
    }
    function zeichneschneeflocken(_position, _size) {
        let nParticles = 244;
        let radiusParticle = 5;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x = Math.random() * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
    }
})(l08aufgabe || (l08aufgabe = {}));
//# sourceMappingURL=aufgabe08.js.map