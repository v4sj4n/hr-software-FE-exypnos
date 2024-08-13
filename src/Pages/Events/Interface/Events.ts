export interface EventsData {
    _id: number;
    title: string;
    description: string;
    startDate: string;
    endDate:string;
    time: string;
    creatingTime: string;
    file: string;
    location: string;
    type: string;
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
    startDate: string;
    endDate: string;
    location: string;
    participants: string[];
    type: string;
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
  