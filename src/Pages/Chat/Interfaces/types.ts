export interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
  }
  
  export interface Message {
    senderId: string;
    recipientId: string;
    message: string;
    timestamp: string;
  }
  