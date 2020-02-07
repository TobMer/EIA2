"use strict";
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", handleLoad);
    let golden = 0.62;
    let url = "https://fiepsonet.herokuapp.com/"; //Link zu dem Programm. Man kommt damit zu der Endabgabe
    let moveables = []; // neues Array für Moveable, für alle bewegten Objekte
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe.crc2 = canvas.getContext("2d");
        zeichneHintergrund();
        zeichneSonne({ x: 100, y: 75 });
        zeichneWolke({ x: 500, y: 175 }, { x: 250, y: 150 });
        zeichneSchneemann({ x: 175, y: 560 });
        zeichneBerge({ x: 0, y: Endabgabe.crc2.canvas.height * golden }, 75, 200, "white", "grey");
        zeichneBerge({ x: 0, y: Endabgabe.crc2.canvas.height * golden }, 50, 150, "lightgrey", "grey"); //zeichnet nochmal Berge
        //birdfood({ x: 0, y: crc2.canvas.height * golden}, 20, 20, "brown"); // BIRDFOOD
        let baum = new Endabgabe.Tree;
        baum.draw();
        zeichneHut();
        zeichnevogelhaus();
        //drawBirds({ x: 0, y: 500 }, { x: 600, y: 600 });
        //drawsnowflake({ x: 0, y: 600 }, { x: 800, y: 600 });
        let background = Endabgabe.crc2.getImageData(0, 0, 800, 600);
        window.setInterval(update, 20, background);
        drawSnowflake();
        createBirds();
    }
    //HIntergrund
    function zeichneHintergrund() {
        //console.log("Hintergrund");
        let gradient = Endabgabe.crc2.createLinearGradient(0, 0, 0, Endabgabe.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(160, 60%, 30%)");
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.fillRect(0, 0, Endabgabe.crc2.canvas.width, Endabgabe.crc2.canvas.height);
    }
    function zeichneSonne(_position) {
        console.log("Sonne", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = Endabgabe.crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //=?
        gradient.addColorStop(0, "HSLA(60, 100%, 40%, 1)"); //Sonne
        gradient.addColorStop(1, "HSLA(60, 100%, 90%, 0)"); //Corona
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Endabgabe.crc2.fill();
        Endabgabe.crc2.restore();
    }
    function zeichneWolke(_position, _size) {
        console.log("Wolke", _position, _size);
        let nParticles = 70;
        let radiusParticle = 70;
        let particle = new Path2D();
        let gradient = Endabgabe.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI); // Farbe und Radius des PArtikels. Einer
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        Endabgabe.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Endabgabe.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Endabgabe.crc2.translate(x, y);
            Endabgabe.crc2.fill(particle);
            Endabgabe.crc2.restore();
        }
        Endabgabe.crc2.restore();
    }
    function zeichneBerge(_position, _min, _max, _colorHigh, _colorLow) {
        console.log("Mountains" + _position, _min, _max, _colorHigh, _colorLow);
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 80;
        let x = 0;
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(0, 0);
        Endabgabe.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            Endabgabe.crc2.lineTo(x, y);
        } while (x < Endabgabe.crc2.canvas.width);
        Endabgabe.crc2.lineTo(x, 0);
        Endabgabe.crc2.closePath();
        let gradient = Endabgabe.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.fill();
        Endabgabe.crc2.restore();
    }
    /*
        function zeichneBaum(): void {
            console.log("Tree");
    
        }
     */
    function zeichneSchneemann(_position) {
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        let path = new Path2D();
        path.arc(0, 0, 40, 0, 2 * Math.PI); //Kreis 1
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fill(path);
        Endabgabe.crc2.strokeStyle = "black";
        Endabgabe.crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -70, 30, 0, 2 * Math.PI); //Kreis2
        Endabgabe.crc2.stroke(path);
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fill(path);
        Endabgabe.crc2.strokeStyle = "black";
        Endabgabe.crc2.stroke(path);
        path = new Path2D();
        path.arc(0, -120, 20, 0, 2 * Math.PI); // Kreis 3
        Endabgabe.crc2.fillStyle = "white"; // Weiße Farbe
        Endabgabe.crc2.fill(path);
        // Führt es aus
        Endabgabe.crc2.strokeStyle = "black"; // schwarze Umrandung
        Endabgabe.crc2.stroke(path); // Führt es aus
        path = new Path2D();
        // drawCircle("#000", 3);
        Endabgabe.crc2.restore();
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
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.fillRect(150, 360, 50, 60);
        Endabgabe.crc2.fillRect(130, 410, 90, 10);
        let nose = new Path2D;
        nose.arc(175, 442, 3, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "orange";
        Endabgabe.crc2.fill(nose);
        Endabgabe.crc2.stroke(nose);
    }
    function zeichnevogelhaus() {
        console.log("vogelhaus");
        //Stützstab
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillStyle = "HSL(70, 70%, 15%)";
        Endabgabe.crc2.fillRect(590, 600, 25, -200);
        Endabgabe.crc2.closePath(); //verbindet den ersten und letzten Punkt, dadurch schließt er den Pfad
        Endabgabe.crc2.stroke();
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillStyle = "black";
        //Kästchen
        Endabgabe.crc2.fillStyle = "HSL(230, 70%, 50%)";
        Endabgabe.crc2.fillRect(550, 310, 100, 100);
        //Loch
        let loch = new Path2D;
        loch.arc(600, 370, 15, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.fill(loch);
        Endabgabe.crc2.stroke(loch);
        //Dach
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(530, 310);
        Endabgabe.crc2.lineTo(670, 310);
        Endabgabe.crc2.lineTo(600, 270);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fillStyle = "darkbrown";
        Endabgabe.crc2.fill();
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
            let bird = new Endabgabe.Bird();
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
            let snowflake = new Endabgabe.Snowflake();
            moveables.push(snowflake); // snowflake wird in moveable array reingepusht
        }
    }
    function update(_backgroundData) {
        //console.log("Update!");
        void Endabgabe.crc2.putImageData(_backgroundData, 0, 0);
        for (let moveable of moveables) { // VÖGEL
            moveable.move(); // 1 ist ein Übergabeparameter
            moveable.draw();
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Endabgabe.js.map