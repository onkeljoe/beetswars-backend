"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routes(app) {
    app.get("/api/v1/rounds", (req, res) => {
        console.log(req.body);
        return res.sendStatus(200);
    });
    app.get("/api/v1/chartdata", (req, res) => {
        console.log(req.body);
        return res.sendStatus(200);
    });
    app.all("/", (req, res) => {
        return res.send("Nothing to see here");
    });
}
exports.default = routes;
