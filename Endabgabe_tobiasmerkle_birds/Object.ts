namespace Endabgabe {

    export class Object {

        gradient: CanvasGradient;
        position: Vector;
        scale: Number;
        x: number;
        y: number;

        constructor() {

            this.scale = 0.7 + Math.random() * 1;
        }
        draw(): void {}
    }
}