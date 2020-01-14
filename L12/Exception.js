"use strict";
var L12;
(function (L12) {
    let greets = [{ greet: "Hi" }, { greet: "Hallo" }, { greet: "Servus" }];
    try {
        let input = prompt("Lass dich grüßen!", "Gib hier eine Zahl ein");
        let greet = greets[Number(input)].greet;
        alert(greet);
    }
    catch (_error) {
        alert("Tschüss!");
        console.log(_error);
    }
    console.log("Done");
})(L12 || (L12 = {}));
//# sourceMappingURL=Exception.js.map