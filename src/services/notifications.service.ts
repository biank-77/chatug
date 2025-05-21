import { DB } from "../lib/firestore";
import { Notification } from "../types/notifications";

export const getNotifications = async (): Promise<Notification[]|[]> => {
        const docRef = DB.collection('notifications').orderBy("createdDate", "desc")
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
    const docRef = await DB.collection("notifications").add(notificationData)
    return {...notificationData, id:docRef.id}
}