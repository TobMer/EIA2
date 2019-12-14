"use strict";
var lo9;
(function (lo9) {
    class Vector {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor; //this bezieht sich auf das jeweilige Objekt Scale. Also daher V1
            this.y *= _factor; // v1= This
        }
        add(_addend) {
            this.x += _addend.x; // addend= V2s
            this.y += _addend.y;
        }
    }
    let v1 = new Vector();
    v1.scale(2);
    console.log(v1);
})(lo9 || (lo9 = {}));
//# sourceMappingURL=lo9.js.map