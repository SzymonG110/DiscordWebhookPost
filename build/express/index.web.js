"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class IndexWeb {
    constructor() {
        this.app = (0, express_1.default)();
        this.postEndpoint();
        this.listen();
    }
    postEndpoint() {
        this.app.post('/', (req, res) => {
            console.log(req);
            console.log(res);
            res.send('a');
        });
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    }
}
exports.default = IndexWeb;
