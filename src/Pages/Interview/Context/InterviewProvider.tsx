import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropResult } from 'react-beautiful-dnd'
import { useGetAllInterviews } from '../Hook'
import { formatDate } from './../Hook/utils'
import AxiosInstance from '@/Helpers/Axios'
import Toast from '@/Components/Toast/Toast'
import { Interview } from '../interface/interface'
import { InterviewContext } from '../Context/InterviewContext'

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data: interviewsData, error, loading } = useGetAllInterviews()
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [selectedInterview, setSelectedInterview] =
        useState<Interview | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReschedule, setIsReschedule] = useState(false)
    const [currentPhase, setCurrentPhase] = useState<string>('first_interview')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [currentTab, setCurrentTab] = useState<string>('first_interview')
    const [isFiltered, setIsFiltered] = useState(false)
    const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>(
        [],
    )
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )
    const [showFilter, setShowFilter] = useState(false)
    const [sortByDate, setSortByDate] = useState(false)

    const phases = [
        'first_interview',
        'second_interview',
        'rejected',
        'employed',
    ]
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewsData && Array.isArray(interviewsData)) {
            const mappedInterviews: Interview[] = interviewsData.map(
                (applicant) => {
                    let currentPhase = 'applicant'
                    if (applicant.secondInterviewDate) {
                        currentPhase = 'second_interview'
                        if (applicant.status === 'rejected') {
                            currentPhase = 'rejected'
                        }
                    } else if (applicant.firstInterviewDate) {
                        currentPhase = 'first_interview'
                    } else if (applicant.status === 'employed') {
                        currentPhase = 'employed'
                    }

                    return {
                        ...applicant,
                        fullName: `${applicant.firstName} ${applicant.lastName}`,
                        auth: { email: applicant.email },
                        secondInterviewDate: applicant.secondInterviewDate
                            ? new Date(
                                  applicant.secondInterviewDate,
                              ).toISOString()
                            : undefined,
                        firstInterviewDate: applicant.firstInterviewDate
                            ? new Date(
                                  applicant.firstInterviewDate,
                              ).toISOString()
                            : undefined,
                        notes: applicant.notes || '',
                        currentPhase: currentPhase,
                        _id: applicant._id,
                        customMessage: applicant.customMessage || '',
                        customSubject: applicant.customSubject || '',
                    }
                },
            )
            const sortedInterviews = mappedInterviews.sort((a, b) => {
                const aDate =
                    a.currentPhase === 'second_interview'
                        ? new Date(a.secondInterviewDate!).getTime()
                        : new Date(a.firstInterviewDate!).getTime()
                const bDate =
                    b.currentPhase === 'second_interview'
                        ? new Date(b.secondInterviewDate!).getTime()
                        : new Date(b.firstInterviewDate!).getTime()

                return aDate - bDate
            })

            setInterviews(sortedInterviews)
            setFilteredInterviews(mappedInterviews)
        }
    }, [interviewsData])

    useEffect(() => {
        filterInterviews()
    }, [currentTab, interviews, isFiltered, startDate, endDate])

    const filterInterviews = () => {
        let filtered = interviews.filter((interview) => {
            if (
                currentTab === 'first_interview' &&
                interview.currentPhase === 'first_interview'
            )
                return true
            if (
                currentTab === 'second_interview' &&
                interview.currentPhase === 'second_interview'
            )
                return true
            if (currentTab === 'rejected' && interview.status === 'rejected')
                return true
            if (currentTab === 'employed' && interview.status === 'employed')
                return true
            return false
        })

        if (isFiltered && startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            end.setHours(23, 59, 59, 999)

            filtered = filtered.filter((interview) => {
                const interviewDateRaw =
                    interview.currentPhase === 'second_interview'
                        ? interview.secondInterviewDate
                        : interview.firstInterviewDate

                if (interviewDateRaw) {
                    const interviewDate = new Date(interviewDateRaw)
                    return interviewDate >= start && interviewDate <= end
                }
                return false
            })
        }

        setFilteredInterviews(filtered)
    }

    const handleApplyFilter = () => {
        setIsFiltered(true)
        setCurrentTab(currentPhase)
    }

    const handleClearFilter = () => {
        setIsFiltered(false)
        setCurrentPhase('first_interview')
        setStartDate('')
        setEndDate('')
        setCurrentTab('first_interview')
    }

    const handleOpenModal = useCallback(
        (interview: Interview, isReschedule = false) => {
            setSelectedInterview(interview)
            setIsModalOpen(true)
            setIsReschedule(isReschedule)
        },
        [],
    )

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedInterview(null)
    }, [])

    const handleTabChange = useCallback(
        (_event: React.SyntheticEvent, newValue: string) => {
            setCurrentTab(newValue)
        },
        [],
    )

    const handleCancel = async (interview: Interview) => {
        try {
            const response = await AxiosInstance.patch(
                `/applicant/${interview._id}`,
                {
                    status: 'rejected',
                    currentPhase: 'rejected',
                },
            )

            if (response.status === 200) {
                setInterviews((prevInterviews) =>
                    prevInterviews.map((i) =>
                        i._id === interview._id
                            ? {
                                  ...i,
                                  status: 'rejected',
                                  currentPhase: 'rejected',
                              }
                            : i,
                    ),
                )
                setFilteredInterviews((prevInterviews) =>
                    prevInterviews.filter((i) => i._id !== interview._id),
                )

                setToastMessage(
                    'This candidate will now be found in the rejected tab',
                )
                setToastSeverity('success')
                setToastOpen(true)
            }
        } catch (error) {
            console.error('Failed to cancel interview:', error)
            setToastMessage('Failed to reject the candidate')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }

    const handleSchedule = async (
        interviewDate: string,
        notes: string,
        customMessage: string,
        customSubject: string,
    ) => {
        if (!selectedInterview) {
            console.error('No interview selected for scheduling')
            return
        }

        const dateField = isReschedule
            ? selectedInterview.currentPhase === 'first_interview'
                ? 'firstInterviewDate'
                : 'secondInterviewDate'
            : 'secondInterviewDate'
        const newPhase = isReschedule
            ? selectedInterview.currentPhase
            : 'second_interview'

        try {
            const response = await AxiosInstance.patch(
                `/applicant/${selectedInterview._id}`,
                {
                    [dateField]: interviewDate,
                    notes,
                    customMessage,
                    customSubject,
                    currentPhase: newPhase,
                },
            )

            if (response.status === 200) {
                const updateInterview = (interview: Interview) =>
                    interview._id === selectedInterview._id
                        ? {
                              ...interview,
                              [dateField]: new Date(
                                  interviewDate,
                              ).toISOString(),
                              notes,
                              customMessage,
                              customSubject,
                              currentPhase: newPhase,
                          }
                        : interview

                setInterviews((prevInterviews) =>
                    prevInterviews.map(updateInterview),
                )
                setFilteredInterviews((prevInterviews) =>
                    prevInterviews.map(updateInterview),
                )
                handleCloseModal()
            }
        } catch (error) {
            console.error('Failed to schedule interview:', error)
        }
    }

    const handleAccept = async (interview: Interview) => {
        try {
            let newPhase = interview.currentPhase
            let status = interview.status

            if (interview.currentPhase === 'first_interview') {
                newPhase = 'second_interview'
                status = 'active'
                handleOpenModal(interview, false)
            } else if (interview.currentPhase === 'second_interview') {
                status = 'employed'
                newPhase = 'employed'
            }

            const response = await AxiosInstance.patch(
                `/applicant/${interview._id}`,
                {
                    status: status,
                    currentPhase: newPhase,
                },
            )

            if (response.status === 200) {
                const updateInterview = (i: Interview) =>
                    i._id === interview._id
                        ? { ...i, status: status, currentPhase: newPhase }
                        : i

                setInterviews((prevInterviews) =>
                    prevInterviews.map(updateInterview),
                )
                setFilteredInterviews((prevInterviews) =>
                    prevInterviews.map(updateInterview),
                )

                if (status === 'employed') {
                    setToastMessage(
                        'This candidate will now be found as an employee',
                    )
                    setToastSeverity('success')
                    setToastOpen(true)
                }
            }
        } catch (error) {
            console.error('Failed to update interview status:', error)
            setToastMessage('Failed to accept the candidate')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return

        const { source, destination } = result

        if (
            source.droppableId === 'employed' &&
            destination.droppableId !== 'employed'
        ) {
            return
        }

        const draggedInterview = filteredInterviews.find(
            (interview) => interview._id.toString() === result.draggableId,
        )

        if (!draggedInterview) return

        try {
            const response = await AxiosInstance.patch(
                `/applicant/${draggedInterview._id}`,
                {
                    currentPhase: destination.droppableId,
                    status:
                        destination.droppableId === 'employed'
                            ? 'employed'
                            : 'active',
                },
            )

            if (response.status === 200) {
                const updateInterview = (interview: Interview) =>
                    interview._id === draggedInterview._id
                        ? {
                              ...interview,
                              currentPhase: destination.droppableId,
                              status:
                                  destination.droppableId === 'employed'
                                      ? 'employed'
                                      : 'active',
                          }
                        : interview

                setInterviews((prevInterviews) =>
                    prevInterviews.map(updateInterview),
                )
                setFilteredInterviews((prevInterviews) =>
                    prevInterviews.map(updateInterview),
                )
            }
        } catch (error) {
            console.error('Failed to update interview phase:', error)
        }
    }

    const handleNavigateToProfile = (CandidateViewId: string) => {
        navigate(`/view/${CandidateViewId}`)
    }

    return (
        <InterviewContext.Provider
            value={{
                loading,
                error,
                interviews: filteredInterviews,
                selectedInterview,
                isModalOpen,
                isReschedule,
                setIsReschedule,
                allPhasesPassed: false,
                handleOpenModal,
                handleCloseModal,
                handleSchedule,
                handleCancel,
                onDragEnd,
                handleNavigateToProfile,
                handleAccept,
                formatDate,
                phases,
                handleTabChange,
                handleApplyFilter,
                handleClearFilter,
                currentTab,
                currentPhase,
                startDate,
                endDate,
                setCurrentPhase,
                setStartDate,
                setEndDate,
                filteredInterviews,
                isFiltered,
                getInterviewsByPhase: (phase: string) =>
                    filteredInterviews.filter(
                        (interview) => interview.currentPhase === phase,
                    ),
                fetchFilteredInterviews: async () => [],
                setFilteredInterviews,
                scheduleType: 'schedule',
                setScheduleType: () => {},
                showFilter,
                setShowFilter,
            }}
        >
            {children}
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={() => setToastOpen(false)}
            />
        </InterviewContext.Provider>
    )
}
