import express, {Application, Request, Response} from 'express'

export default class IndexWeb {

    app: Application = express()

    constructor() {

        this.postEndpoint()

        this.listen()
    }

    private postEndpoint(): void {
        this.app.post('/', (req: Request, res: Response) => {

            console.log(req)
            console.log(res)
            res.send('a')

        })
    }

    public listen(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    }
}