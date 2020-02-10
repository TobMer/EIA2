"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var MyFuwa_last;
(function (MyFuwa_last) {
    let highscores;
    let databaseURL;
    let dbName = "Eia2";
    let dbCollection = "score";
    databaseURL = "mongodb+srv://Test_Tobias:<persia>@cluster0-emcuj.mongodb.net/test?retryWrites=true&w=majority";
    databaseURL = "mongodb://localhost:27017";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Server starting on port: " + port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscores = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database connection is ", highscores != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }
            if (url.query["command"] == "retrieve") {
                let report = await retrievehighscores();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                console.log("urlQuery: ", url.query);
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                function storeOrder(_order) {
                    highscores.insert(_order); // sasgt was in die collection eingetragen werden soll(url.query wird eingetragen)
                    storeOrder(url.query);
                    console.log(jsonString);
                }
            }
            _response.end();
        }
        async function retrievehighscores() {
            // console.log("Asking DB about highscores ", highscores.find());
            let cursor = await highscores.find();
            let answer = await cursor.toArray();
            console.log("DB CursorToArray", answer);
            if (answer != null) {
                return answer;
            }
            else
                return "We encountered tecnical problems. Please try again later";
        }
    }
})(MyFuwa_last = exports.MyFuwa_last || (exports.MyFuwa_last = {}));
//# sourceMappingURL=server.js.map