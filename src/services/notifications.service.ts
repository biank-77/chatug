import fs from 'fs';
import path from 'path';
import { DB } from "../lib/firestore";
import { BCK, BUCKET_NAME } from "../lib/storage";
import { Notification, NotificationType } from "../types/notifications";


export const getNotifications = async (type:NotificationType): Promise<Notification[]|[]> => {
        const docRef = DB.collection('notifications').where("type", "==", type).orderBy("createdDate", "desc")
        const docsContainer = await docRef.get();
        if (!docsContainer.size) return [];
        const docs = []
        for(const doc of docsContainer.docs){
            const dataDoc: Notification = doc.data()
            const user = (await DB.doc(`users/${dataDoc.userId}`).get()).data()
            docs.push({...dataDoc, user:{email:user.email, name:user.name}})
        }
        return docs

};

export const saveNotification = async (notificationData: Notification) =>{
    let imagePath =""
    if(notificationData.image && notificationData.imageName){
       const imageData = saveBase64Image(notificationData.image, notificationData.imageName)
       const  { filepath, filename, extension } = imageData;
       await storeImageOnBucket(filename, filepath, extension)
       imagePath =`https://storage.googleapis.com/${BUCKET_NAME}/notifications/${filename}`
        fs.unlinkSync(filepath);
    }
    const docRef = await DB.collection("notifications").add({...notificationData, image:imagePath})
    const user = (await DB.doc(`users/${notificationData.userId}`).get()).data()
    return {...notificationData, id:docRef.id, user}
}

function saveBase64Image(base64Image:string, filename: string) {
    
  const matches = base64Image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Formato base64 inválido');
  }

  const extension = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const filepath = path.join(__dirname, 'uploads', filename);

  fs.writeFileSync(filepath, buffer);
  return { filepath, filename, extension };
}

const storeImageOnBucket = async(imageName: string, tempFilePath:string, extension: string)=>{
    const file = BCK.file(`notifications/${imageName}`);

    await BCK.upload(tempFilePath, {
        destination: file,
        resumable: false,
        contentType: `image/${extension}`,
        metadata: {
        cacheControl: 'public, max-age=31536000',
        },
    });

}