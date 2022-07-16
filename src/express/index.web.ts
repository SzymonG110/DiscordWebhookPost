import ex, {Application, Request, Response} from 'express'
import SendWebhookUtil from '../utils/sendWebhook.util'
import axios from "axios";

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
        this.app.post('/check', async (req: Request, res: Response) => {

            try {

                if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                    return res.status(401).send('Unauthorized')

                if (!req.body.webhookUrl)
                    return res.status(400).send('Missing webhookUrl')

                const postData = await axios.get(req.body.webhookUrl)
                if (postData.data && postData.data.id && !isNaN(Number(postData.data.id))) {
                    res.send(postData.data)
                } else {
                    res.send({
                        status: '500',
                        message: 'Failed!',
                        error: postData
                    })
                }
            } catch (e) {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: `${e}`
                })
            }

        })

        this.app.post('/', async (req: Request, res: Response) => {

            try {

                if (!req.body.token || req.body.token !== process.env.ACCESS_TOKEN)
                    return res.status(401).send('Unauthorized')

                if (!req.body.webhookUrl)
                    return res.status(400).send('Missing webhookUrl')

                const postData = await new SendWebhookUtil().post(req.body.webhookUrl, req.body.webhookData)
                if (postData.success) {
                    res.send({
                        status: '200',
                        message: 'Webhook sent successfully',
                        data: postData
                    })
                } else {
                    res.send({
                        status: '500',
                        message: 'Webhook failed to send',
                        error: postData
                    })
                }
            } catch (e) {
                res.send({
                    status: '500',
                    message: 'Webhook failed to send',
                    error: `${e}`
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