namespace Endabgabe {
    window.addEventListener("load", handleLoad);

    let url: string = "https://fiepsonet.herokuapp.com/";

    function handleLoad(_event: Event): void {
    document.getElementById("Score.js").addEventListener("click", handleRetriveHS);

    }

    async function handleRetriveHS(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();

        let scorelists: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
        scorelists.innerText = responseText;

        
    }
}