export interface User {
    _id: string
    token?: string
    name: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role: string
}

export interface Message {
    senderId: string
    recipientId: string
    message: string
    timestamp: string
    read?: boolean
}
