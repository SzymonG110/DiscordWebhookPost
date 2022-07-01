"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class SendWebhookUtil {
    constructor() {
    }
    async post(url, body) {
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        }
        catch (e) {
            return e;
        }
    }
}
exports.default = SendWebhookUtil;
