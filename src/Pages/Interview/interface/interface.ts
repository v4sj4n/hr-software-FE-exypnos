import { Dispatch } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { applicantsData }  from '@/Pages/Candidates/Interfaces/Candidate'


export interface Interview {
    phase: string
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
    notes:string
}


export interface InterviewContextType {
    interviews: Interview[]
    loading: boolean
    error: Error | null
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
    handleTabChange: (event: React.SyntheticEvent, newValue: string) => void
    handleApplyFilter: () => void
    handleClearFilter: () => void
    currentTab: string
    currentPhase: string
    startDate: string
    endDate: string
    setCurrentPhase: Dispatch<React.SetStateAction<string>>
    setStartDate: Dispatch<React.SetStateAction<string>>
    setEndDate: Dispatch<React.SetStateAction<string>>
    filteredInterviews: Interview[]
    isFiltered: boolean

    fetchFilteredInterviews: (
        currentPhase?: string,
        status?: string,
        startDate?: Date,
        endDate?: Date,
    ) => Promise<Interview[]>

    setFilteredInterviews: Dispatch<React.SetStateAction<Interview[]>>
    scheduleType: 'schedule' | 'reschedule'
    setScheduleType: Dispatch<React.SetStateAction<'schedule' | 'reschedule'>>
}
 export interface RescheduleModalProps {
    open: boolean
    handleClose: () => void
    handleSchedule: (
        interviewDate: string,
        notes: string,
        customMessage: string,
        customSubject: string,
        useCustomEmail: boolean,
    ) => void
    selectedInterview: Interview
    isReschedule: boolean
}
