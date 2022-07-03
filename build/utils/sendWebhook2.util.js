"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class SendWebhookUtil {
    async post(url, body) {
        const webhook = new discord_js_1.WebhookClient({
            url
        });
        try {
            const x = await webhook.send({
                username: body.username,
                avatarURL: body.avatarUrl,
                content: body.content,
                files: body.filesUrl,
                allowedMentions: {
                    parse: []
                }
            });
            return {
                status: 'success',
                message: 'Message sent',
                webhookId: x.id,
                guildId: x.guild_id,
                channelId: x.channel_id,
            };
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}
exports.default = SendWebhookUtil;
