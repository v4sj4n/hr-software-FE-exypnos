import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from '@mui/material';
import styles from './EventsPoll.module.css';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/Context/AuthProvider';

interface Voter {
  _id: string;
  firstName: string;
  lastName: string;
}

interface PollOption {
  option: string;
  votes: number;
  voters: Voter[];
}

interface Poll {
  question: string;
  options: PollOption[];
}

interface EventPollProps {
  poll: Poll;
  eventId: number;
  userId: number | undefined;
}


const EventPoll: React.FC<EventPollProps> = ({ poll, eventId, userId }) => {
  const { currentUser } = useAuth();
  const [localPoll, setLocalPoll] = useState<Poll>(poll);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setLocalPoll(poll);
    setHasVoted(poll.options.some(option => hasUserVoted(option.voters)));
  }, [poll, userId]);

  const hasUserVoted = (voters: Voter[]): boolean => {
    return userId ? voters.some(voter => voter._id === userId.toString()) : false;
  };

  const handleVote = (option: string) => {
    if (!userId || hasVoted) return;

    setLocalPoll(prevPoll => ({
      ...prevPoll,
      options: prevPoll.options.map(opt =>
        opt.option === option
          ? {
              ...opt,
              votes: opt.votes + 1,
              voters: [
                ...opt.voters,
                {
                  _id: userId.toString(),
                  firstName: currentUser?.firstName || '',
                  lastName: currentUser?.lastName || ''
                }
              ]
            }
          : opt
      )
    }));

    setHasVoted(true);

    AxiosInstance.post(`/event/${eventId}/vote`, { option, userId })
      .then(response => console.log(response, 'Vote updated successfully'))
      .catch(error => {
        console.error('Error updating vote:', error);
        setLocalPoll(poll);
        setHasVoted(false);
      });
  };

  const renderOptionContent = (option: PollOption) => {
    const userVoted = hasUserVoted(option.voters);

    return (
      <div className={styles.optionContent}>
        <span>{option.option}</span>
        <div className={styles.optionStats}>
          {renderDevCheckbox(userVoted)}
          {renderAdminTooltip(option)}
        </div>
      </div>
    );
  };

  const renderDevCheckbox = (userVoted: boolean) => {
    if (currentUser?.role !== 'dev') return null;

    return (
      <span>
        <Checkbox
          checked={userVoted}
          color="success"
          size="small"
          sx={{ padding: 0 }}
        />
      </span>
    );
  };

  const renderAdminTooltip = (option: PollOption) => {
    if (currentUser?.role !== 'admin') return null;

    return (
      <Tooltip
        title={
          <div>
            {option.voters.map((voter, index) => (
              <div key={index}>{`${voter.firstName} ${voter.lastName}`}</div>
            ))}
          </div>
        }
      >
        <span className={styles.voteCount}>{option.votes}</span>
      </Tooltip>
    );
  };

  return (
    <div className={styles.eventPoll}>
      <div className={styles.border} />
      <div className={styles.title}>{localPoll.question}</div>
      {localPoll.options.map((option, index) => {
        const userVoted = hasUserVoted(option.voters);
        return (
          <div
            key={index}
            className={`${styles.option} ${userVoted ? styles.activeOption : ''} ${
              hasVoted && !userVoted ? styles.disabledOption : ''
            }`}
            onClick={() => !hasVoted && handleVote(option.option)}
          >
            {renderOptionContent(option)}
          </div>
        );
      })}
    </div>
  );
};

export default EventPoll;