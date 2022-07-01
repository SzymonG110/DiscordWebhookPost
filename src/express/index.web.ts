import ex, {Application, Request, Response} from 'express'
import SendWebhookUtil from "../utils/sendWebhook.util";
import {AxiosResponse} from "axios";

export default class IndexWeb {

    app: Application = ex()

    constructor() {

        this.configure()
        this.postEndpoint()
        this.listen()
    }

    private configure(): void {
        this.app.use(ex.json())
        this.app.use(ex.urlencoded({extended: false}))
    }

    private postEndpoint(): void {
        this.app.post('/', async (req: Request, res: Response) => {

            if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                return res.status(401).send('Unauthorized')

            const postData = await new SendWebhookUtil().post("https://discord.com/api/webhooks/992423581436874792/mUUzP8YJYSxaP8zXWJXSZZp3z2gR02FdWIxk3HY7_MsU_iX40NIp32cBCRCb0eMhpD_p", req.body.webhookData)
            if (`${postData.status}`.startsWith('2')) {
                res.send({
                    status: '200',
                    message: 'Webhook sent successfully'
                })
            } else {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: postData.response.data.message
                })
            }
        })
    }

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    }
}