import { User } from "../types/user";


export const loginUser = async (username:string, password:string): Promise<User> => {
    //conectarse al back y traer toda la info del usuario
    return {id:"userId", email:"betsii77@gmail.com", name:"Bianca Nazareno"}
};


export const registerUser = async (userData:User): Promise<User> => {
    //enviar este usuario a la bd y retornarlo mismo
    return {id:"userId", email:userData.email, name:userData.name}
};