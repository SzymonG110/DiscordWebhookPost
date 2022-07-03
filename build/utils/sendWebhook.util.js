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
                success: true,
                webhookId: x.id,
                channelId: x.channel_id,
            };
        }
        catch (e) {
            return { success: false, error: [e.message, e.path] };
        }
    }
}
exports.default = SendWebhookUtil;
