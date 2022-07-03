import {WebhookClient, WebhookClientData} from 'discord.js'

export default class SendWebhookUtil {

    public async post(url: string, body: any): Promise<any> {

        const webhook = new WebhookClient({
            url
        })

        try {
            const x = await webhook.send({
                username: body.username,
                avatarURL: body.avatarUrl,
                content: body.content,
                files: body.filesUrl,
                allowedMentions: {
                    parse: []
                }
            })

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