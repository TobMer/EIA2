namespace Endabgabe {



    let score: number = 0; // Für den Score der Punkteanzahl

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62; // Der Goldene Schnitt ist bei 0.62

    let url: string = "https://fiepsonet.herokuapp.com/"; //Link zu dem Programm. Man kommt damit zu der Endabgabe


    let birdfood: Birdfood; //

    export let moveables: Moveable[] = []; // neues Array für Moveable, für alle bewegten Objekte
    console.log(moveables);

    let throwballArray: ThrowBall[] = [];
    let birdfoodsArray: Birdfood[] = []; // Array für das Bird Food und mit birdfoodsArray kann number gepusht werden

    function handleLoad(_event: Event): void {  //_event ist der Parameter und Event ist der Typ.(Typisierung)

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawbackground();


        drawSun(new Vector(100, 75));
        drawCloud(new Vector(500, 175), new Vector(250, 150));

        drawSnowman(new Vector(175, 560));
        drawMountains(new Vector(0, crc2.canvas.height * golden), 75, 200, "white", "grey");
        drawMountains(new Vector(0, crc2.canvas.height * golden), 50, 150, "lightgrey", "grey"); //zeichnet nochmal Berge
        //birdfood({ x: 0, y: crc2.canvas.height * golden}, 20, 20, "brown"); // BIRDFOOD

        let baum: Tree = new Tree;
        baum.draw();
        drawhat();

        drawBirdhouse();

        let background: ImageData = crc2.getImageData(0, 0, 800, 600);

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
    function drawbackground(): void {
        //console.log("Hintergrund");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(160, 60%, 30%)");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    }



    function drawSun(_position: Vector): void {
        console.log("Sonne", _position);

        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2); //=?

        gradient.addColorStop(0, "HSLA(60, 100%, 40%, 1)"); //Sonne
        gradient.addColorStop(1, "HSLA(60, 100%, 90%, 0)"); //Corona

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();


    }

    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("cloud", _position, _size);


        let nParticles: number = 70;
        let radiusParticle: number = 70;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI); // Farbe und Radius des PArtikels. Einer
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();


    }


    function drawMountains(_position: Vector, _min: number, _max: number, _colorHigh: string, _colorLow: string): void {
        console.log("Mountains" + _position, _min, _max, _colorHigh, _colorLow);
        console.log("Mountains");
        let stepMin: number = 50;
        let stepMax: number = 80;
        let x: number = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        }

        while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();



    }


    function drawSnowman(_position: Vector): void {

        crc2.save();
        crc2.translate(_position.x, _position.y);
        let path: Path2D = new Path2D();

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


    function drawhat(): void {

        crc2.beginPath();
        crc2.fillStyle = "black";
        crc2.fillRect(150, 360, 50, 60);
        crc2.fillRect(130, 410, 90, 10);

        let nose: Path2D = new Path2D;
        nose.arc(175, 442, 3, 0, 2 * Math.PI);
        crc2.fillStyle = "orange";
        crc2.fill(nose);
        crc2.stroke(nose);

    }

    function drawBirdhouse(): void { // 
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
        let loch: Path2D = new Path2D;
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
    function createBirds() {

        //console.log("create Birds");

        //let bird: Path2D = newFunction();
        let nBirds: number = 21;
        // crc2.save();
        //crc2.translate(_position.x, _position.y);

        for (let i: number = 0; i < nBirds; i++) {


            let bird: Bird = new Bird();
            moveables.push(bird); // ich pushe die Birds
        }

    }

    function drawSnowflake(): void {

        //console.log("snowflake");
        let nSnowflake: number = 120;

        for (let i: number = 0; i < nSnowflake; i++) {
            let snowflake: Snowflake = new Snowflake();
            moveables.push(snowflake); // snowflake wird in moveable array reingepusht
        }
    }




    function update(_backgroundData: ImageData): void {
        //console.log("Update!");

        crc2.putImageData(_backgroundData, 0, 0);

        for (let moveable of moveables) {// VÖGEL
            moveable.move(); // 1 ist ein Übergabeparameter
            moveable.draw();
        }

        for (let birdfood of birdfoodsArray) {
            birdfood.draw(); //Birdfood wird immer wieder geupdtatet
        }


        drawScore();
        for (let moveable of moveables) {// was passiert hier nochmal
            if (moveable instanceof Bird) { // es wird mit dem constructor gearbeitet
                if (moveable.greedy) {// hier wird geprüft ob die Birds hungrig sind oder nicht
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

        for (let i: number = 0; i < moveables.length; i++) {

            if (moveables[i] instanceof Bird) {

                if (moveables[i].hitbird) {
                    console.log("vogel getroffen");
                    moveables.splice(i, 1); //Die Schleife geht in die Moveables durch, da sind Snowflakes und Birds. ist Birds ein i und wird getroffen dann wird er Bird mit dem wert i rausgelöscht

                    score += 10;

                    console.log("vogel gelöscht");
                }
            }

        }
    }



    function throwFood(_event: MouseEvent): void {
        console.log(_event);
        let birdDestination: Vector = new Vector(_event.clientX, _event.clientY - 70);

        for (let moveable of moveables) {

            if (moveable instanceof Bird) {

                if (moveable.greedy) {

                    moveable.flytoTarget(birdDestination);
                }
            }

        }

        drawfood(birdDestination, new Vector(100, 100)); //Food wird in Array gepusht, gespeichert

    }


    function drawfood(_position: Vector, _size: Vector): void {
        console.log("Futter geworfen", _position, _size);

        let nParticles: number = 10; // Futter wird wie bei Schneeflocken erstellt


        for (let drawn: number = 0; drawn < nParticles; drawn++) { // schleife 
            let position: Vector = new Vector(0, 0);
            position.x = Math.random() * _size.x + _position.x - 50; //position da wo die vögel zu dem futter hinfliegen
            position.y = Math.random() * _size.y + _position.y - 50;

            birdfood = new Birdfood(position);
            birdfoodsArray.push(birdfood); // Bird Food Array wird gepusht

        }
        setTimeout(deleteFood, 2000);


    }

    export function flyAway(): void { //Birds fliegen vereinzelt weg, wegen der If Bedingung.


        for (let moveable of moveables) {

            if (moveable instanceof Bird) { //Moveable array wird durchgegangen und es wird BIRD KLasse geprüft und wenn JA, wird die eigenschaft Greedy geürpft aber sie ist true und dann kriegt er seine ursprümgliche Velocity 

                if (moveable.greedy) {
                    if (Math.random() * 8 < 0.6) { // nach einiger ZEit fliegne die Vögel weg und haben die lgeiche Velocity
                        moveable.velocity = new Vector(Math.random() * 2, Math.random() * 1);
                    }
                }
            }
        }


    }


    function deleteFood(): void {
        birdfoodsArray.splice(0, 10); //10 Futterpartikel vercshwinden ,also alle, nachdem die Zeit abgelaufen ist. Vögel ziehen weiter
    }




    function throwBall(_event: MouseEvent): void {
        console.log("ball werfen");
        let position: Vector = new Vector(_event.clientX, _event.clientY - 70);
        console.log(throwballArray);
        for (let ball of throwballArray) {
            ball.flytoTarget(position);
        }

        let ballIsHere: boolean = false; // der ball wird geprüft ob er da ist

        if (throwballArray.length >= 1) {
            ballIsHere = true;
        }

        if (ballIsHere == false) {
            drawBall();
        }



    }

    function drawBall(): void {

        let throwBall: ThrowBall = new ThrowBall();
        throwballArray.push(throwBall); // ich pushe das element Throwball in den Array

    }


    function drawScore(): void { //Rchteck des SCores

        crc2.beginPath();
        crc2.fillStyle = "black";
        crc2.strokeRect(699, 0, 100, 60);


        crc2.stroke();
        crc2.textBaseline = "alphabetic";
        crc2.font = "20px Helvetica";
        crc2.fillText("Score: " + score, 700, 40, 100);

        crc2.restore();
    }

    export function removeball(): void {
        console.log("ballweg");

        if (throwballArray.length > 0) {
            throwballArray.splice(0, 1);

        }

    }
    function handleSend(_name: string, _score: number): void {
        let query: string = "score=" + _score + "&name=" + _name;
        let response: Promise<Response> = fetch(url + "?" + query);
        //let responseText: Promise<string> = response.text();
        alert(response);
    }

    function handleEnd(): void {
        let name: any = prompt("Deine Punkte " + score, "Trage deinen Namen für die Highscore Liste ein"); //Zur Datenbank und zur Startseite!!
        if (name != null) {
            handleSend(name, score);
            //self das es 

        }
        window.open("https://tobmer.github.io/EIA2/Endabgabe_tobiasmerkle_birds/Startseite.html", "_self");
    }

}