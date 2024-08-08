export interface EventsData {
    _id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    creatingTime: string;
    location: string;
    poll: {
      question: string;
      options: {
        option: string;
        votes: number;
        voters: { _id: string; firstName: string; lastName: string; }[];
      }[];
      isMultipleVote: boolean;
    };
    onClose: () => void;
    
  }
  
  export interface EventsCreationData {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    poll: {
      question: string;
      options: {
        option: string;
        votes: number;
        voters: { _id: string; firstName: string; lastName: string; }[]; 
      }[];
      isMultipleVote: boolean;
    };
  }
  