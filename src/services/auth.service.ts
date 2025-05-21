import { DB } from "../lib/firestore";
import { User } from "../types/user";


export const loginUser = async (username:string, password:string): Promise<User|undefined> => {
     try {
        const docRef = DB.collection('users').where("email", "==", username).where("password", "==", password)
        const docsContainer = await docRef.get();
        if (!docsContainer.size) return;
        const doc = docsContainer.docs[0]
        return {...(doc?.data()||{}), id:doc.id}
    } catch (error) {
        return;
    }
};


export const registerUser = async (userData:User): Promise<User> => {
    const docRef = await DB.collection('users').add(userData);
    console.log('Documento creado con ID:', docRef.id);
    return {...userData, id:docRef.id}
};