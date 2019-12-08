"use strict";
console.log("L08 Workshop starting");
window.addEventListener("load", handleLoad);
let crc2;
function handleLoad(_event) {
    let canvas = document.querySelector("canvas");
    crc2 = canvas.getContext("2d");
    console.log(crc2);
    //KREIS
    let path = new Path2D();
    path.arc(60, 60, 50, 0, 2 * Math.PI);
    crc2.stroke(path);
    //DREIECK
    crc2.beginPath(); //Bildlich Stift wird angesetzt
    crc2.moveTo(200, 50); //soll anfangen zu zeichnen
    crc2.lineTo(200, 100); //Punkte in der Koordinate, eine Linie
    crc2.lineTo(250, 100); //Punkte in der Koordinate, eine Linie
    crc2.closePath(); //verbindet den ersten und letzten Punkt, dadurch schließt er den Pfad
    crc2.stroke(); // Zeichnet den Pfad
    //TEXT
    crc2.fillStyle = "#FF0010";
    crc2.fillText("Hi was geht", 40, 40); // ("text", x, y) Nach unten wird die Zahl höher, schmale Schrift
    crc2.strokeText("EIA geht ab", 40, 80); //("text", x, y) Nach oben wird die Zahl niedriger, fette Schrift
    //KOORDINATENSYSTEM
    crc2.beginPath();
    crc2.moveTo(2.1, 1);
    crc2.lineTo(2.1, 10);
    crc2.moveTo(4.5, 1);
    crc2.lineTo(4.5, 10);
    crc2.moveTo(7.5, 1);
    crc2.lineTo(10.5, 10);
    crc2.stroke();
    //Farbverlauf
    let gradient = crc2.createLinearGradient(100, 300, 100, 500);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(.5, "red");
    gradient.addColorStop(1, "gold");
    crc2.fillStyle = gradient;
    crc2.fillRect(100, 100, 600, 400);
    let pattern = document.createElement('canvas').getContext('2d');
    pattern.canvas.width = 40;
    pattern.canvas.height = 20;
    pattern.fillStyle = '#fec';
    pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
    pattern.moveTo(0, 10);
    pattern.lineTo(10, 10);
    pattern.lineTo(20, 0);
    pattern.lineTo(30, 0);
    pattern.lineTo(40, 10);
    pattern.lineTo(30, 20);
    pattern.lineTo(20, 20);
    pattern.lineTo(10, 10);
    pattern.stroke();
    crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat');
    crc2.fillRect(0, 0, canvas.width, canvas.height);
}
//# sourceMappingURL=Canvas.js.map