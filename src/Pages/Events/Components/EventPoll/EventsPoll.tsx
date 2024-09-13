import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { Tooltip } from '@mui/material'
import styles from './style/EventsPoll.module.css'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/Context/AuthProvider'
import { EventPollProps, Poll, PollOption, Voter } from './Interface/Interface'

const EventPoll: React.FC<EventPollProps> = ({ poll, eventId, userId }) => {
    const { currentUser } = useAuth()
    const [localPoll, setLocalPoll] = useState<Poll>(poll)
    const isAdmin = currentUser?.role === 'hr'

    useEffect(() => {
        setLocalPoll(poll)
    }, [poll, userId])

    const hasUserVoted = (voters: Voter[]): boolean => {
        return userId
            ? voters.some((voter) => voter._id === userId.toString())
            : false
    }

    const handleVote = async (option: string) => {
        if (!userId) return

        const existingVotedOption = localPoll.options.find((opt) =>
            opt.voters.some((voter) => voter._id === userId.toString()),
        )

        try {
            if (existingVotedOption && existingVotedOption.option !== option) {
                await AxiosInstance.delete(`/event/${eventId}/vote`, {
                    data: { option: existingVotedOption.option, userId },
                })

                setLocalPoll((prevPoll) => ({
                    ...prevPoll,
                    options: prevPoll.options.map((opt) =>
                        opt.option === existingVotedOption.option
                            ? {
                                  ...opt,
                                  votes: opt.votes - 1,
                                  voters: opt.voters.filter(
                                      (voter) =>
                                          voter._id !== userId.toString(),
                                  ),
                              }
                            : opt,
                    ),
                }))
            }

            await AxiosInstance.post(`/event/${eventId}/vote`, {
                option,
                userId,
            })

            setLocalPoll((prevPoll) => ({
                ...prevPoll,
                options: prevPoll.options.map((opt) =>
                    opt.option === option
                        ? {
                              ...opt,
                              votes: opt.votes + 1,
                              voters: [
                                  ...opt.voters,
                                  {
                                      _id: userId.toString(),
                                      firstName: currentUser?.firstName || '',
                                      lastName: currentUser?.lastName || '',
                                  },
                              ],
                          }
                        : opt,
                ),
            }))
        } catch (error) {
            console.error('Error updating vote:', error)
            setLocalPoll(poll)
        }
    }

    const renderOptionContent = (option: PollOption) => {
        const userVoted = hasUserVoted(option.voters)

        return (
            <div className={styles.optionContent}>
                <span>{option.option}</span>
                <div className={styles.optionStats}>
                    {renderDevCheckbox(userVoted)}
                    {renderAdminTooltip(option)}
                </div>
            </div>
        )
    }

    const renderDevCheckbox = (userVoted: boolean) => {
        if (isAdmin) return null

        return (
            <span>
                <Checkbox
                    checked={userVoted}
                    color="success"
                    size="small"
                    sx={{ padding: 0 }}
                />
            </span>
        )
    }

    const renderAdminTooltip = (option: PollOption) => {
        if (!isAdmin) return null

        return (
            <Tooltip
                title={
                    <div>
                        {option.voters.map((voter, index) => (
                            <div
                                key={index}
                            >{`${voter.firstName} ${voter.lastName}`}</div>
                        ))}
                    </div>
                }
            >
                <span className={styles.voteCount}>{option.votes}</span>
            </Tooltip>
        )
    }

    return (
        <div className={styles.eventPoll}>
            <div className={styles.border} />
            <div className={styles.title}>{localPoll.question}</div>
            {localPoll.options.map((option, index) => {
                const userVoted = hasUserVoted(option.voters)
                return (
                    <div
                        key={index}
                        className={`${styles.option} ${userVoted ? styles.activeOption : ''}`}
                        onClick={() => handleVote(option.option)}
                    >
                        {renderOptionContent(option)}
                    </div>
                )
            })}
        </div>
    )
}

export default EventPoll