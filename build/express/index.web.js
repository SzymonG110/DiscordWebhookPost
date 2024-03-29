"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendWebhook_util_1 = __importDefault(require("../utils/sendWebhook.util"));
const axios_1 = __importDefault(require("axios"));
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
        this.app.post('/check', async (req, res) => {
            try {
                if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                    return res.status(401).send('Unauthorized');
                if (!req.body.webhookUrl)
                    return res.status(400).send('Missing webhookUrl');
                const postData = await axios_1.default.get(req.body.webhookUrl);
                if (postData.data && postData.data.id && !isNaN(Number(postData.data.id))) {
                    res.send(postData.data);
                }
                else {
                    res.send({
                        status: '500',
                        message: 'Failed!',
                        error: postData
                    });
                }
            }
            catch (e) {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: `${e}`
                });
            }
        });
        this.app.post('/', async (req, res) => {
            try {
                if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                    return res.status(401).send('Unauthorized');
                if (!req.body.webhookUrl || !req.body.webhookData)
                    return res.status(400).send('Missing data');
                const postData = await new sendWebhook_util_1.default().post(req.body.webhookUrl, req.body.webhookData);
                if (postData.success) {
                    res.send({
                        status: '200',
                        message: 'Webhook sent successfully',
                        data: postData
                    });
                }
                else {
                    res.send({
                        status: '500',
                        message: 'Webhook failed to send',
                        error: postData
                    });
                }
            }
            catch (e) {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: `${e}`
                });
                console.log(e);
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
