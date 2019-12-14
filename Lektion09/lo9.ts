namespace lo9 {

    class Vector {
        x: number = 0;
        y: number = 0;

        set(_x: number, _y: number): void {// viel. nochmal nachfragen. Es werden neue sachen hinzugefügt
            this.x = _x;
            this.y = _y;
        }

        scale(_factor: number): void {
            this.x *= _factor;  //this bezieht sich auf das jeweilige Objekt Scale. Also daher V1
            this.y *= _factor; // v1= This
        }

        add(_addend: Vector): void { //addend bezieht sich auf V2
            this.x += _addend.x; // addend= V2s
            this.y += _addend.y;
        }
    }

    let v1: Vector = new Vector();
    v1.scale(2);
    console.log(v1);

}



