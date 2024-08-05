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
        options: { option: string; votes: number }[];
        isMultipleVote: boolean;
    };
}


export interface PollOption {
    option: string;
    votes: number;
    voters: string[]; // Array of user IDs who voted
  }
  
  export interface Poll {
    question: string;
    options: PollOption[];
    isMultipleVote: boolean;
  }
  
  export interface EventsCreationData {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    poll: {
        question: string;
        options: { option: string; votes: number }[];
        isMultipleVote: boolean;
    };
}