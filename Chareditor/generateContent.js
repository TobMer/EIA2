"use strict";
var Charactereditor;
(function (Charactereditor) {
    document.addEventListener("loadend", handleload);
    //let adress: string =""//Für Später
    function handleload() {
        generateContent(Charactereditor.categoryArray);
        let form = document.getElementById("form");
        form.addEventListener("change", handlechange);
        let slider = document.getElementById("input");
        slider.addEventListener("input", handleinput);
        let button = document.getElementById("button");
        button.addEventListener("click", handleclick);
    }
    function generateContent(_accessoires) {
        for (let key in _accessoires) {
        }
    }
    function handlechange() {
        console.log("click");
        let formData;
    }
    function handleinput() {
    }
    function handleclick() {
    }
})(Charactereditor || (Charactereditor = {}));
//# sourceMappingURL=generateContent.js.map