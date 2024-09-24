export interface Message {
    _id: string
    conversationId: string
    senderId: string
    text: string
}

export interface Conversation {
    _id: string
    name: string
}
