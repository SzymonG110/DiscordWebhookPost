"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const index_web_1 = __importDefault(require("./express/index.web"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class App {
    constructor() {
        new index_web_1.default();
    }
}
exports.App = App;
new App();
