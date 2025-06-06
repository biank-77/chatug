// backend.js o donde manejes la lógica del servidor
const { Expo } = require('expo-server-sdk');

// Puedes reutilizar esta instancia
const expo = new Expo();

export async function sendPushNotification(token:string, titulo:string, cuerpo:string) {
  // Verifica que el token es válido
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token inválido: ${token}`);
    return;
  }

  const messages = [
    {
      to: token,
      sound: 'default',
      title: titulo,
      body: cuerpo,
      data: { extraData: 'valor opcional' },
    },
  ];

  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
console.log("hmmmm???")
    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    }
  } catch (error) {
    console.error(error);
  }
}
