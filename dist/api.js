"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header({
        "Access-Control-Allow-Methods": "GET, POST,  PUT, DELETE , OPTIONS",
    });
    next();
});
var users = require("./routes/user");
//const express = require("express");
//const bodyParser = require("body-parser");
app.use(body_parser_1.default.json());
app.use("/users", users);
var corsOption = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOption));
app.listen(3300, function () {
    console.log("Server is now listening at port 3300");
});
//# sourceMappingURL=api.js.map