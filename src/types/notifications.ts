export interface Notification {
    message: string,
    image?: string,
    imageName?: string,
    user: {
        name: string,
        email: string,
        id?: string
    },
    userId?: string,
    createdDate: Date
}