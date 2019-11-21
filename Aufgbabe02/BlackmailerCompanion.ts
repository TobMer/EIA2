namespace L02_BlackmailerCompanion {

    console.log("Start");
    // let chosenCharacter: string;
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        let mail: HTMLElement = <HTMLElement>document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter);
    }


    function placeLetter(_event: MouseEvent): void {

        console.log(_event);
      
    }
    function chooseCharacter(_event: KeyboardEvent): void {

        // console.log(_event);

        // chosenCharacter = _event.key;
}
}


