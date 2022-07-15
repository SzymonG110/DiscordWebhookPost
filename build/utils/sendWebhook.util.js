"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class SendWebhookUtil {
    async post(url, body) {
        const webhook = new discord_js_1.WebhookClient({
            url
        });
        try {
            if (body.avatar_url)
                body.avatarUrl = body.avatar_url;
            const x = await webhook.send(body);
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
