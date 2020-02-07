namespace L02_BlackmailerCompanion {

    console.log("Start");
    let chosenCharacter: string = "A";
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void { //hier wird was aktiviert
        let mail: HTMLElement = <HTMLElement>document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter); //funktion ist weiter unten
    }


    function placeLetter(_event: MouseEvent): void {
        console.log(_event);
        let x: number = _event.offsetX;
        let y: number = _event.offsetY;

        let mail: HTMLElement = <HTMLElement>_event.target;

        let letter: HTMLSpanElement = document.createElement("span");
        mail.appendChild(letter);

        letter.textContent = chosenCharacter;
        letter.style.left = x + "px";
        letter.style.left = y + "px"; //Buchstabe erscheint

        letter.addEventListener("click", deleteLetter);

    }

    function chooseCharacter(_event: KeyboardEvent): void {
        // console.log(_event);
        chosenCharacter = _event.key;

    }
    function deleteLetter(_event: MouseEvent): void { // Bei klick löscht das element
        let target: Node = <Node>_event.target;
        let parent: Node = <Node>target.parentNode;
        parent.removeChild(target);

    }
}

