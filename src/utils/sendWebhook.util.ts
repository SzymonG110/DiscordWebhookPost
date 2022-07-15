import {WebhookClient} from 'discord.js'

export default class SendWebhookUtil {

    public async post(url: string, body: any): Promise<any> {

        const webhook = new WebhookClient({
            url
        })

        try {
            body.avatarURL = body.avatar_url

            const x = await webhook.send(body)

            return {
                success: true,
                webhookId: x.id,
                channelId: x.channel_id,
            }
        } catch (e) {
            return {success: false, error: [(e as any).message, (e as any).path]}
        }
    }
}