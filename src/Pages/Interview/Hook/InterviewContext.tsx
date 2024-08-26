import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    Dispatch,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { DropResult } from 'react-beautiful-dnd'
import { useGetAllInterviews, applicantsData } from '.'
import { formatDate, getInterviewsByPhase } from './utils'
import AxiosInstance from '@/Helpers/Axios'

// Define the Interview interface
export interface Interview extends applicantsData {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    positionApplied: string
    status: string
    _id: string
    firstInterviewDate?: string
    secondInterviewDate?: string
    customMessage: string
    currentPhase: string
    isDeleted?: boolean
    fullName: string
    customSubject: string
    startDate: string
    endDate: string
}

// Define the context type
interface InterviewContextType {
    interviews: Interview[]
    loading: boolean
    error: string | null
    selectedInterview: Interview | null
    isModalOpen: boolean
    isReschedule: boolean
    setIsReschedule: Dispatch<React.SetStateAction<boolean>>
    allPhasesPassed: boolean
    handleOpenModal: (interview: Interview, isReschedule: boolean) => void
    handleCloseModal: () => void
    handleCancel: (interview: Interview) => void
    handleSchedule: (
        interviewDate: string,
        notes: string,
        customMessage: string,
        customSubject: string,
    ) => void
    onDragEnd: (result: DropResult) => void
    handleNavigateToProfile: (CandidateViewId: string) => void
    getInterviewsByPhase: (currentPhase: string) => Interview[]
    formatDate: (dateString: string | number | Date | undefined) => string
    handleAccept: (interview: Interview) => void
    phases: string[]
    fetchFilteredInterviews: (
        currentPhase?: string,
        startDate?: Date,
        endDate?: Date,
    ) => Promise<Interview[]>
    scheduleType: 'schedule' | 'reschedule'
    setScheduleType: Dispatch<React.SetStateAction<string>>
}

const InterviewContext = createContext<InterviewContextType | undefined>(
    undefined,
)

export const useInterviewContext = () => {
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error(
            'useInterviewContext must be used within an InterviewProvider',
        )
    }
    return context
}

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data: interviewsData, error, loading } = useGetAllInterviews()
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [selectedInterview, setSelectedInterview] =
        useState<Interview | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReschedule, setIsReschedule] = useState(false)
    const [allPhasesPassed] = useState(false)
    const navigate = useNavigate()
    const phases = [
        'first_interview',
        'second_interview',
        'rejected',
        'employed',
    ]
    const [scheduleType, setScheduleType] = useState<'schedule' | 'reschedule'>(
        'schedule',
    )
    const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>(
        [],
    )

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

            setInterviews(mappedInterviews)
        }
    }, [interviewsData])

    const fetchFilteredInterviews = async (
        currentPhase?: string,
        startDate?: Date,
        endDate?: Date,
    ) => {
        try {
            const response = await AxiosInstance.get(`/applicant`, {
                params: {
                    currentPhase,
                    startDate: startDate ? startDate.toISOString() : undefined,
                    endDate: endDate ? endDate.toISOString() : undefined,
                },
            })
            console.log('fetchFilteredInterviews', response.data)

            if (response.status === 200) {
                const filteredData = response.data
                setFilteredInterviews(filteredData)
                return filteredData
            }
        } catch (error) {
            console.error('Error fetching interviews:', error)
            return []
        }
    }

    const handleOpenModal = (interview: Interview, isReschedule = false) => {
        setSelectedInterview(interview)
        setIsModalOpen(true)
        setIsReschedule(isReschedule)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedInterview(null)
    }

    const handleCancel = async () => {
        if (!selectedInterview) return
        await handleReject(selectedInterview._id)
        handleCloseModal()
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
                setInterviews((prevInterviews) =>
                    prevInterviews.map((interview) =>
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
                            : interview,
                    ),
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
            } else if (interview.currentPhase === 'second_interview') {
                newPhase = 'employed'
                status = 'employed'
            }

            const response = await AxiosInstance.patch(
                `/applicant/${interview._id}`,
                {
                    status: status,
                    currentPhase: newPhase,
                },
            )

            if (response.status === 200) {
                setInterviews((prevInterviews) =>
                    prevInterviews.map((i) =>
                        i._id === interview._id
                            ? { ...i, status: status, currentPhase: newPhase }
                            : i,
                    ),
                )

                if (newPhase === 'second_interview') {
                    setSelectedInterview(interview)
                    setIsReschedule(false)
                    setIsModalOpen(true)
                }
            }
        } catch (error) {
            console.error('Failed to update interview status:', error)
        }
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) return

        const { source, destination } = result

        if (
            source.droppableId === 'employed' &&
            destination.droppableId !== 'employed'
        ) {
            return
        }

        const interviewsCopy = [...interviews]
        const [removedInterview] = interviewsCopy.splice(source.index, 1)
        removedInterview.currentPhase = destination.droppableId
        interviewsCopy.splice(destination.index, 0, removedInterview)

        setInterviews(interviewsCopy)
    }

    const handleNavigateToProfile = (CandidateViewId: string) => {
        navigate(`/view/${CandidateViewId}`)
    }

    return (
        <InterviewContext.Provider
            value={{
                loading,
                error,
                selectedInterview,
                isModalOpen,
                isReschedule,
                allPhasesPassed,
                handleOpenModal,
                handleCloseModal,
                handleSchedule,
                handleCancel,
                onDragEnd,
                handleNavigateToProfile,
                handleAccept,
                getInterviewsByPhase: (phase: string) =>
                    getInterviewsByPhase(interviews, phase),
                formatDate: (dateString: string | number | Date | undefined) =>
                    formatDate(dateString ?? ''),
                phases,
                fetchFilteredInterviews,
                interviews: filteredInterviews,
                scheduleType,
                setIsReschedule,
                setScheduleType,
            }}
        >
            {children}
        </InterviewContext.Provider>
    )
}

function handleReject(_id: string) {
    throw new Error('Function not implemented.')
}
