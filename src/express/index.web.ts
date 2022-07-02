import ex, {Application, Request, Response} from 'express'
import SendWebhookUtil from "../utils/sendWebhook.util";

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

            try {

                if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                    return res.status(401).send('Unauthorized')

                if (!req.body.webhookUrl)
                    return res.status(400).send('Missing webhookUrl')

                const postData = await new SendWebhookUtil().post(req.body.webhookUrl, req.body.webhookData)
                if (`${postData.status}`.startsWith('2')) {
                    res.send({
                        status: '200',
                        message: 'Webhook sent successfully',
                        data: JSON.parse(postData.config.data)
                    })
                } else {
                    res.send({
                        status: '500',
                        message: 'Webhook failed to send',
                        error_code: postData.code,
                        error: postData
                    })
                }
            } catch (e) {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: e
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