import React from 'react';
import styles from './EventsPoll.module.css';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface EventPollProps {
  question: string;
  options: PollOption[];
  onVote: (id: string) => void;
}

const EventPoll: React.FC<EventPollProps> = ({ question, options, onVote }) => {
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className={styles.eventPoll}>
      <h3>{question}</h3>
      {options.map(option => {
        const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        return (
          <div 
            key={option.id} 
            className={styles.option}
            onClick={() => onVote(option.id)}
          >
            <input 
              type="radio" 
              checked={false}
              readOnly
            />
            <span>{option.text}</span>
            <span className={styles.percent}>{percent}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default EventPoll;