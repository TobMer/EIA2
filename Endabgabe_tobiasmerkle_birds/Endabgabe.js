"use strict";
var Endabgabe;
(function (Endabgabe) {
    /*interface Vector {
        x: number;
        y: number;

    }*/
    let score = 0; // Für den Score der Punkteanzahl
    window.addEventListener("load", handleLoad);
    let golden = 0.62; // Der Goldene Schnitt ist bei 0.62
    let url = "https://fiepsonet.herokuapp.com/"; //Link zu dem Programm. Man kommt damit zu der Endabgabe
    let birdfood; //
    Endabgabe.moveables = []; // neues Array für Moveable, für alle bewegten Objekte
    console.log(Endabgabe.moveables);
    let throwballArray = [];
    let birdfoodsArray = []; // Array für das Bird Food und mit birdfoodsArray kann number gepusht werden
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe.crc2 = canvas.getContext("2d");
        drawbackground();
        drawSun(new Endabgabe.Vector(100, 75));
        drawCloud(new Endabgabe.Vector(500, 175), new Endabgabe.Vector(250, 150));
        drawSnowman(new Endabgabe.Vector(175, 560));
        drawMountains(new Endabgabe.Vector(0, Endabgabe.crc2.canvas.height * golden), 75, 200, "white", "grey");
        drawMountains(new Endabgabe.Vector(0, Endabgabe.crc2.canvas.height * golden), 50, 150, "lightgrey", "grey"); //zeichnet nochmal Berge
        //birdfood({ x: 0, y: crc2.canvas.height * golden}, 20, 20, "brown"); // BIRDFOOD
        let baum = new Endabgabe.Tree;
        baum.draw();
        drawhat();
        drawBirdhouse();
        //drawBirds({ x: 0, y: 500 }, { x: 600, y: 600 });
        //drawsnowflake({ x: 0, y: 600 }, { x: 800, y: 600 });
        let background = Endabgabe.crc2.getImageData(0, 0, 800, 600);
        window.setInterval(update, 20, background);
        drawScore();
        drawSnowflake();
        createBirds();
        drawBall();
        window.addEventListener("auxclick", throwFood); //WErfe Futter
        window.addEventListener("click", throwBall); // Werfe Ball
        window.setTimeout(handleEnd, 20000);
    }
    //HIntergrund
    function drawbackground() {
        //console.log("Hintergrund");
        let gradient = Endabgabe.crc2.createLinearGradient(0, 0, 0, Endabgabe.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(160, 60%, 30%)");
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.fillRect(0, 0, Endabgabe.crc2.canvas.width, Endabgabe.crc2.canvas.height);
    }
    function drawSun(_position) {
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
    function drawCloud(_position, _size) {
        console.log("cloud", _position, _size);
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
    function drawMountains(_position, _min, _max, _colorHigh, _colorLow) {
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
    function drawSnowman(_position) {
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
    function drawhat() {
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
    function drawBirdhouse() {
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
        //console.log("create Birds");
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
            Endabgabe.moveables.push(bird); // ich pushe die Birds
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
            Endabgabe.moveables.push(snowflake); // snowflake wird in moveable array reingepusht
        }
    }
    function update(_backgroundData) {
        //console.log("Update!");
        void Endabgabe.crc2.putImageData(_backgroundData, 0, 0);
        for (let moveable of Endabgabe.moveables) { // VÖGEL
            moveable.move(); // 1 ist ein Übergabeparameter
            moveable.draw();
        }
        for (let birdfood of birdfoodsArray) {
            birdfood.draw(); //Birdfood wird immer wieder geupdtatet
        }
        drawScore();
        for (let moveable of Endabgabe.moveables) { // was passiert hier nochmal
            if (moveable instanceof Endabgabe.Bird) { // es wird mit dem constructor gearbeitet
                if (moveable.greedy) {
                    moveable.targetBird();
                }
            }
        }
        for (let throwBall of throwballArray) {
            throwBall.update();
        }
        for (let throwBall of throwballArray) {
            throwBall.chillontarget();
        }
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            if (Endabgabe.moveables[i] instanceof Endabgabe.Bird) {
                if (Endabgabe.moveables[i].hitbird) {
                    console.log("vogel getroffen");
                    Endabgabe.moveables.splice(i, 1); //Die Schleife geht in die Moveables durch, da sind Snowflakes und Birds. ist Birds ein i und wird getroffen dann wird er Bird mit dem wert i rausgelöscht
                    score += 10;
                    console.log("vogel gelöscht");
                }
            }
        }
    }
    function throwFood(_event) {
        console.log(_event);
        let birdDestination = new Endabgabe.Vector(_event.clientX, _event.clientY - 70);
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird) {
                if (moveable.greedy) {
                    moveable.flytoTarget(birdDestination);
                }
            }
        }
        drawfood(birdDestination, new Endabgabe.Vector(100, 100)); //Food wird in Array gepusht, gespeichert
    }
    function drawfood(_position, _size) {
        console.log("Futter geworfen", _position, _size);
        let nParticles = 10; // Futter wird wie bei Schneeflocken erstellt
        for (let drawn = 0; drawn < nParticles; drawn++) { // schleife 
            let position = new Endabgabe.Vector(0, 0);
            position.x = Math.random() * _size.x + _position.x - 50; //position da wo die vögel zu dem futter hinfliegen
            position.y = Math.random() * _size.y + _position.y - 50;
            birdfood = new Endabgabe.Birdfood(position);
            birdfoodsArray.push(birdfood); // Bird Food Array wird gepusht
        }
        setTimeout(deleteFood, 2000);
    }
    function flyAway() {
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird) { //Moveable array wird durchgegangen und es wird BIRD KLasse geprüft und wenn JA, wird die eigenschaft Greedy geürpft aber sie ist true und dann kriegt er seine ursprümgliche Velocity 
                if (moveable.greedy) {
                    if (Math.random() * 8 < 0.6) { // nach einiger ZEit fliegne die Vögel weg und haben die lgeiche Velocity
                        moveable.velocity = new Endabgabe.Vector(Math.random() * 2, Math.random() * 1);
                    }
                }
            }
        }
    }
    Endabgabe.flyAway = flyAway;
    function deleteFood() {
        birdfoodsArray.splice(0, 10); //10 Futterpartikel vercshwinden ,also alle, nachdem die Zeit abgelaufen ist. Vögel ziehen weiter
    }
    function throwBall(_event) {
        console.log("ball werfen");
        let position = new Endabgabe.Vector(_event.clientX, _event.clientY - 70);
        console.log(throwballArray);
        for (let ball of throwballArray) {
            ball.flytoTarget(position);
        }
        let ballIsHere = false; // der ball wird geprüft ob er da ist
        if (throwballArray.length >= 1) {
            ballIsHere = true;
        }
        if (ballIsHere == false) {
            drawBall();
        }
    }
    function drawBall() {
        let throwBall = new Endabgabe.ThrowBall();
        throwballArray.push(throwBall); // ich pushe das element Throwball in den Array
    }
    function drawScore() {
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.strokeRect(699, 0, 100, 60);
        Endabgabe.crc2.stroke();
        Endabgabe.crc2.textBaseline = "alphabetic";
        Endabgabe.crc2.font = "20px Helvetica";
        Endabgabe.crc2.fillText("Score: " + score, 700, 40, 100);
        Endabgabe.crc2.restore();
    }
    function removeball() {
        console.log("ballweg");
        if (throwballArray.length > 0) {
            throwballArray.splice(0, 1);
        }
    }
    Endabgabe.removeball = removeball;
    function handleSend(_name, _score) {
        let query = "score=" + _score + "&name=" + _name;
        let response = fetch(url + "?" + query);
        //let responseText: Promise<string> = response.text();
        alert(response);
    }
    function handleEnd() {
        let name = prompt("Your Score " + score, "Please enter your name"); //Zur Datenbank und zur Startseite!!
        if (name != null) {
            handleSend(name, score);
            //self das es 
        }
        window.open("https://tobmer.github.io/EIA2/Endabgabe_tobiasmerkle_birds/Startseite.html", "_self");
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Endabgabe.js.map