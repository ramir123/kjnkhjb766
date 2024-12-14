export async function sendWebhookNotification(type: 'new' | 'ready', data: any) {
  const WEBHOOKS = {
    new: 'https://discord.com/api/webhooks/1317290004367675483/sP8sIPXutvaBeH-K91Df9ZxCAoFC_clu4lQXBGL3sgm0_ZZP6FpOWM2CVXiLr3HnFEbC',
    ready: 'https://discord.com/api/webhooks/1317507030730145842/nYrLrd-Gb347otpj3mVz0uPk2i2x-OT4EmZvyJ8NNHXaz-4xV0IShU-WoOwMZZjuYsBm'
  };

  const webhookUrl = WEBHOOKS[type];

  const embed = type === 'ready' ? {
    title: '🚀 Order Ready for Delivery',
    color: 0x00ff00,
    fields: [
      { name: 'IGN', value: data.ign, inline: true },
      { name: 'Customer', value: data.customerName, inline: true },
      { name: 'RP Total', value: data.rpTotal.toString(), inline: true },
      { name: 'DZD Amount', value: data.dzdAmount.toString(), inline: true },
      { name: 'Fish Size', value: data.fishSize, inline: true },
    ],
    timestamp: new Date().toISOString(),
  } : {
    title: '🎮 New Order Created',
    color: 0x3498db,
    fields: [
      { name: 'IGN', value: data.ign, inline: true },
      { name: 'Customer', value: data.customerName, inline: true },
      { name: 'Status', value: data.status, inline: true },
      { name: 'RP Total', value: data.rpTotal.toString(), inline: true },
      { name: 'DZD Amount', value: data.dzdAmount.toString(), inline: true },
      { name: 'Fish Size', value: data.fishSize, inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (error) {
    console.error('Failed to send webhook notification:', error);
  }
}