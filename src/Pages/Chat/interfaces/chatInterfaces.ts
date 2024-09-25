export interface Conversation {
    _id: string;
    participants: string[];
  }
  
  export interface Message {
    conversationId: string;
    content: string;
    sender: string;
  }
  
  export interface ConversationListProps {
    conversations: Conversation[];
    selectConversation: (conversationId: string) => void;
  }
  
  export interface ChatWindowProps {
    messages: Message[];
    sendMessage: (message: string) => void;
  }
  