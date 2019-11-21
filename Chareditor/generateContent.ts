namespace Charactereditor {
    document.addEventListener("loadend", handleload);
    //let adress: string =""//Für Später

    function handleload(): void {
        generateContent(categoryArray);

        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
        form.addEventListener("change", handlechange);

        let slider: HTMLInputElement = <HTMLInputElement>document.getElementById("input");
        slider.addEventListener("input", handleinput);

        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
        button.addEventListener("click", handleclick);


     

    }
    function generateContent(_accessoires: Category): void {
        // for (let key in _accessoires) {
        //    let key: string = _accessoires ="[value"
        // }
    }

    function handlechange(): void {
   console.log("click");

//    let formData
    }

    function handleinput(): void {
//
    }

    function handleclick(): void {
//
    }

}