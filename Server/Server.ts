console.log("Du bist wunderbar und EIA macht Spaß");

let x: number = 0;
console.log(x);
x++;
console.warn(x);
setTimeout(handleTimeout, 2000);
console.log(process.env.COMPUTERNAME);
console.log(process.env.USERNAME);
console.log(process.env.PORT);

console.log(process.argv);
console.log("Hallo" + process.argv[2]);

process.addListener("exit", handleExit);

function handleTimeout(
    _event: Event): void {
    console.log("Timeout");
}

function handleExit(_event: Event): void {

    console.log("Tschüss");
}
