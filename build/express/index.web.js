"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendWebhook_util_1 = __importDefault(require("../utils/sendWebhook.util"));
class IndexWeb {
    constructor() {
        this.app = (0, express_1.default)();
        this.configure();
        this.postEndpoint();
        this.listen();
    }
    configure() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    postEndpoint() {
        this.app.post('/', async (req, res) => {
            if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                return res.status(401).send('Unauthorized');
            const postData = await new sendWebhook_util_1.default().post("https://discord.com/api/webhooks/992423581436874792/mUUzP8YJYSxaP8zXWJXSZZp3z2gR02FdWIxk3HY7_MsU_iX40NIp32cBCRCb0eMhpD_p", req.body.webhookData);
            if (`${postData.status}`.startsWith('2')) {
                res.send({
                    status: '200',
                    message: 'Webhook sent successfully'
                });
            }
            else {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: postData.response.data.message
                });
            }
        });
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    }
}
exports.default = IndexWeb;
