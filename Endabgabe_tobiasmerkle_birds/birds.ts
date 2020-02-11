
namespace Endabgabe {


    export class Bird extends Moveable { //erweitert mit extend. Wird ausgeführt durch super()

        radiusBird: number;
        colorgrade: number;
        color: string;
        scale: number;
        greedy: boolean = false; // hungrige birds
        target: Vector;
        hitbird: boolean; //getroffener vogel



        constructor() {
            super(); // constructor der Superklasse Aufruf!!
            this.colorgrade = 120 - Math.random() * 60;
            this.radiusBird = 20 + Math.random() * 10; //Radius der Vogelkörper vorher 24
            this.color = "HSLA(" + this.colorgrade + ", 100%, 59%, 1)"; //Hue, Saturation, Luminance(Farbton, Sättigung,Helligkeit)
            let x: number = 800 * Math.random();
            let y: number = 200 * Math.random();
            this.scale = 0.5 + Math.random() * 1; //Insgesamt die Körpergröße
            //console.log("Birds constructor");

            this.position = new Vector(x, y); // position DIESES Objekts
            this.velocity = new Vector(Math.random() * 2, Math.random() * 1); // WErt für die Geschwindigkeit. Mit new wird ein neues Objekt erstellt. SOzuzsagen ein Bauplan



            if (Math.random() * 6 <= 1) {
                console.log("hungrig");
                this.greedy = true;
            }

            //this.draw(); //Birds werden gezeichnet


        }

        // Die Birds bewegen sich vm linken Bildrand auf über den Bildrand
            move(): void {
            //console.log("Birds move");
            this.position.add(this.velocity);

            if (this.position.x > 900)

                this.position.x = - 100;
            if (this.position.y > 700)
                this.position.y = - 50;
        }


        draw(): void {  //mit if bedingung else einbauen dass die Beine bekommen

            let bird: Path2D = new Path2D();


            crc2.beginPath();
            crc2.beginPath();
            crc2.save();

            crc2.fillStyle = this.color;
            crc2.translate(this.position.x, this.position.y);
            //ab hier rotiert der Körper der Vögel
            bird.ellipse(0, 0, 1 / 2 * this.radiusBird, this.radiusBird, 30, 0, 2 * Math.PI); // Körper der Vögel
            bird.moveTo(-10, 0);
            bird.lineTo(0, -24); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(10, 0); //neuen Pfad aufmachen SChnäbel
            bird.lineTo(0, 24);
            bird.closePath();


            bird.moveTo(40, -8); //schnabel
            bird.lineTo(60, -16);
            bird.lineTo(40, -20);
            crc2.stroke();




            crc2.transform(this.scale, 0, 0, this.scale, 0, 0);

            bird.arc(30, -8, (1 / 2) * this.radiusBird, 0, 2 * Math.PI);
            bird.ellipse(5, -5, (1 / 3) * this.radiusBird, this.radiusBird, 13, 0, 2 * Math.PI);
            crc2.fill(bird);


            bird = new Path2D();
            //let x: number = this.position.x;
            // let y: number = this.position.y;


            crc2.fill();
            crc2.stroke(bird);
            crc2.restore();
            crc2.closePath();
        }


        flytoTarget(_position: Vector): void {
            console.log("TARGET");
            this.target = _position;


            let x: number = (this.target.x - this.position.x) * 0.03; // geschwindigkeit zu dem ziel 
            let y: number = (this.target.y - this.position.y) * 0.03;

            let velocitybird: Vector = new Vector(x, y);

            this.velocity = velocitybird;

        }
        

        targetBird(): void {

            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 10 && this.position.y <= this.target.y + 10 && this.position.x >= this.target.x - 10 && this.position.y >= this.target.y - 10))) {
                this.velocity = new Vector(0, 0); //Geschwindigkeit der Birds wirds 0 und sie bleiben setehen


            }
            setTimeout(flyAway, 4000);
        }

        shootBird(_position: Vector): void {
            this.target = _position;
            if (this.target && (this.position == this.target || (this.position.x <= this.target.x + 30 && this.position.y <= this.target.y + 30 && this.position.x >= this.target.x - 30 && this.position.y >= this.target.y - 30))) {
                this.hitbird = true; // if Bedingung ist erfüllt wenn Vogel an dieser Position ist oder wenn dort geklickt wurde
                console.log("Bin ich getroffen? " + this.hitbird);
            }
        }
    }
}