import React from 'react';
import styles from './EventsPoll.module.css';
import AxiosInstance from '@/Helpers/Axios';
import { Tooltip } from '@mui/material';


interface EventPollProps {
  poll: {
    question: string;
    options: Array<{ option: string, votes: number }>;
  };
  onVote: (option: string) => void;
  eventId: number;
  userId: number | undefined;
}

const EventPoll: React.FC<EventPollProps> = ({ poll, onVote, eventId, userId }) => {

  const handleVote = (option: string) => {
    AxiosInstance.post(`/event/${eventId}/vote`, { option, userId })
      .then(response => {
        console.log(response, 'Vote updated successfully');
        onVote(option);
      })
      .catch(error => {
        console.error('Error updating vote:', error);
      });
  };

  return (
    <div className={styles.eventPoll}>
      <h3>{poll.question}</h3>
      {poll.options.map((option, index) => {
        return (
          <div
            key={index}
            className={styles.option}
            onClick={() => handleVote(option.option)}
          >
            <input
              type="radio"
              checked={false}
              readOnly
            />
            <div className={styles.optionContent}>
              <span>{option.option}</span>
              <div className={styles.optionStats}>
                <Tooltip title={`${option.votes} `}>
                  <span>{option.votes}</span>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventPoll;
