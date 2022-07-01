import axios, {AxiosResponse} from 'axios'

export default class SendWebhookUtil {

    constructor() {
    }

    public async post(url: string, body: any): Promise<any> {
        try {
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (e) {
            return e
        }

    }
}