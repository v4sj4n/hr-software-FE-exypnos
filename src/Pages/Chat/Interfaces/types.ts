// src/Pages/Chat/Interfaces/types.ts
export interface User {
    _id: string; // ObjectId as string
    token?: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
}

export interface Message {
    senderId: string; // ObjectId as string
    recipientId: string; // ObjectId as string
    message: string;
    timestamp: string; // ISO Date string
    read?: boolean; // Optional field to track read/unread status
}
