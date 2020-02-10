"use strict";
var aufgabe10;
(function (aufgabe10) {
    window.addEventListener("load", handleLoad);
    let golden = 0.62;
    let moveables = []; // neues Array für Moveable, für alle bewegten Objekte
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        aufgabe10.crc2 = canvas.getContext("2d");
        zeichneHintergrund();
        zeichneSonne({ x: 100, y: 75 });
        zeichneWolke({ x: 500, y: 175 }, { x: 250, y: 150 });
        zeichneSchneemann({ x: 175, y: 560 });
        zeichneBerge({ x: 0, y: aufgabe10.crc2.canvas.height * golden }, 75, 200, "white", "grey");
        zeichneBerge({ x: 0, y: aufgabe10.crc2.canvas.height * golden }, 50, 150, "lightgrey", "grey"); //zeichnet nochmal Berge
        //birdfood({ x: 0, y: crc2.canvas.height * golden}, 20, 20, "brown"); // BIRDFOOD
        let baum = new aufgabe10.Tree;
        baum.draw();
        zeichneHut();
        zeichnevogelhaus();
        //drawBirds({ x: 0, y: 500 }, { x: 600, y: 600 });
        //drawsnowflake({ x: 0, y: 600 }, { x: 800, y: 600 });
        let background = aufgabe10.crc2.getImageData(0, 0, 800, 600);
        window.setInterval(update, 20, background);
        drawSnowflake();
        createBirds();
    }
    //HIntergrund
    function zeichneHintergrund() {
        //console.log("Hintergrund");
        let gradient = aufgabe10.crc2.createLinearGradient(0, 0, 0, aufgabe10.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(160, 60%, 30%)");
        aufgabe10.crc2.fillStyle = gradient;
        aufgabe10.crc2.fillRect(0, 0, aufgabe10.crc2.canvas.width, aufgabe10.crc2.canvas.height);
    }
    function zeichneSonne(_position) {
        console.log("Sonne", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = aufgabe10.crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //=?
        gradient.addColorStop(0, "HSLA(60, 100%, 40%, 1)"); //Sonne
        gradient.addColorStop(1, "HSLA(60, 100%, 90%, 0)"); //Corona
        aufgabe10.crc2.save();
        aufgabe10.crc2.translate(_position.x, _position.y);
        aufgabe10.crc2.fillStyle = gradient;
        aufgabe10.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        aufgabe10.crc2.fill();
        aufgabe10.crc2.restore();
    }
    function zeichneWolke(_position, _size) {
        console.log("Wolke", _position, _size);
        let nParticles = 70;
        let radiusParticle = 70;
        let particle = new Path2D();
        let gradient = aufgabe10.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI); // Farbe und Radius des PArtikels. Einer
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        aufgabe10.crc2.save();
        aufgabe10.crc2.translate(_position.x, _position.y);
        aufgabe10.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            aufgabe10.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            aufgabe10.crc2.translate(x, y);
            aufgabe10.crc2.fill(particle);
            aufgabe10.crc2.restore();
        }
        aufgabe10.crc2.restore();
    }
    function zeichneBerge(_position, _min, _max, _colorHigh, _colorLow) {
        console.log("Mountains" + _position, _min, _max, _colorHigh, _colorLow);
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 80;
        let x = 0;
        aufgabe10.crc2.save();
        aufgabe10.crc2.translate(_position.x, _position.y);
        aufgabe10.crc2.beginPath();
        aufgabe10.crc2.moveTo(0, 0);
        aufgabe10.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            aufgabe10.crc2.lineTo(x, y);
        } while (x < aufgabe10.crc2.canvas.width);
        aufgabe10.crc2.lineTo(x, 0);
        aufgabe10.crc2.closePath();
        let gradient = aufgabe10.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        aufgabe10.crc2.fillStyle = gradient;
        aufgabe10.crc2.fill();
        aufgabe10.crc2.restore();
    }
    /*
        function zeichneBaum(): void {
            console.log("Tree");
    
        }
     */
    function zeichneSchneemann(_position) {
        aufgabe10.crc2.save();
        aufgabe10.crc2.translate(_position.x, _position.y);
        let path = new Path2D();
        path.arc(0, 0, 40, 0, 2 * Math.PI); //Kreis 1
        aufgabe10.crc2.fillStyle = "white";
        aufgabe10.crc2.fill(path);
        aufgabe10.crc2.strokeStyle = "black";
        aufgabe10.crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -70, 30, 0, 2 * Math.PI); //Kreis2
        aufgabe10.crc2.stroke(path);
        aufgabe10.crc2.fillStyle = "white";
        aufgabe10.crc2.fill(path);
        aufgabe10.crc2.strokeStyle = "black";
        aufgabe10.crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -120, 20, 0, 2 * Math.PI); // Kreis 3
        aufgabe10.crc2.fillStyle = "white"; // Weiße Farbe
        aufgabe10.crc2.fill(path);
        // Führt es aus
        aufgabe10.crc2.strokeStyle = "black"; // schwarze Umrandung
        aufgabe10.crc2.stroke(path); // Führt es aus
        path = new Path2D();
        // drawCircle("#000", 3);
        aufgabe10.crc2.restore();
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
        aufgabe10.crc2.beginPath();
        aufgabe10.crc2.fillStyle = "black";
        aufgabe10.crc2.fillRect(150, 360, 50, 60);
        aufgabe10.crc2.fillRect(130, 410, 90, 10);
        let nose = new Path2D;
        nose.arc(175, 442, 3, 0, 2 * Math.PI);
        aufgabe10.crc2.fillStyle = "orange";
        aufgabe10.crc2.fill(nose);
        aufgabe10.crc2.stroke(nose);
    }
    function zeichnevogelhaus() {
        console.log("vogelhaus");
        //Stützstab
        aufgabe10.crc2.beginPath();
        aufgabe10.crc2.fillStyle = "HSL(70, 70%, 15%)";
        aufgabe10.crc2.fillRect(590, 600, 25, -200);
        aufgabe10.crc2.closePath(); //verbindet den ersten und letzten Punkt, dadurch schließt er den Pfad
        aufgabe10.crc2.stroke();
        aufgabe10.crc2.beginPath();
        aufgabe10.crc2.fillStyle = "black";
        //Kästchen
        aufgabe10.crc2.fillStyle = "HSL(230, 70%, 50%)";
        aufgabe10.crc2.fillRect(550, 310, 100, 100);
        //Loch
        let loch = new Path2D;
        loch.arc(600, 370, 15, 0, 2 * Math.PI);
        aufgabe10.crc2.fillStyle = "black";
        aufgabe10.crc2.fill(loch);
        aufgabe10.crc2.stroke(loch);
        //Dach
        aufgabe10.crc2.beginPath();
        aufgabe10.crc2.moveTo(530, 310);
        aufgabe10.crc2.lineTo(670, 310);
        aufgabe10.crc2.lineTo(600, 270);
        aufgabe10.crc2.closePath();
        aufgabe10.crc2.fillStyle = "darkbrown";
        aufgabe10.crc2.fill();
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
            let bird = new aufgabe10.Bird();
            moveables.push(bird); // ich pushe die Birds
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
            let snowflake = new aufgabe10.Snowflake();
            moveables.push(snowflake); // snowflake wird in moveable array reingepusht
        }
    }
    function update(_backgroundData) {
        //console.log("Update!");
        void aufgabe10.crc2.putImageData(_backgroundData, 0, 0);
        for (let moveable of moveables) { // VÖGEL
            moveable.move(); // 1 ist ein Übergabeparameter
            moveable.draw();
        }
        //function birdfood ()
    }
})(aufgabe10 || (aufgabe10 = {}));
//# sourceMappingURL=aufgabe10.js.map