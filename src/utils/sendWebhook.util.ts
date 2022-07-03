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
                status: 'success',
                message: 'Message sent',
                webhookId: x.id,
                guildId: x.guild_id,
                channelId: x.channel_id,
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }
}