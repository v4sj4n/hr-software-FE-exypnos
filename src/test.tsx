// import React, {
//     createContext,
//     useState,
//     useEffect,
//     useContext,
//     Dispatch,
// } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DropResult } from 'react-beautiful-dnd'
// import { useGetAllInterviews, applicantsData } from '.'
// import { formatDate, getInterviewsByPhase } from './utils'
// import AxiosInstance from '@/Helpers/Axios'
// import Toast from '@/Components/Toast/Toast'

// export interface Interview extends applicantsData {
//     phase: string
//     firstName: string
//     lastName: string
//     phoneNumber: string
//     email: string
//     positionApplied: string
//     status: string
//     _id: string
//     firstInterviewDate?: string
//     secondInterviewDate?: string
//     customMessage: string
//     currentPhase: string
//     isDeleted?: boolean
//     fullName: string
//     customSubject: string
//     startDate: string
//     endDate: string
// }

// interface InterviewContextType {
//     interviews: Interview[]
//     loading: boolean
//     error: Error | null
//     selectedInterview: Interview | null
//     isModalOpen: boolean
//     isReschedule: boolean
//     setIsReschedule: Dispatch<React.SetStateAction<boolean>>
//     allPhasesPassed: boolean
//     handleOpenModal: (interview: Interview, isReschedule: boolean) => void
//     handleCloseModal: () => void
//     handleCancel: (interview: Interview) => void
//     handleSchedule: (
//         interviewDate: string,
//         notes: string,
//         customMessage: string,
//         customSubject: string,
//     ) => void
//     onDragEnd: (result: DropResult) => void
//     handleNavigateToProfile: (CandidateViewId: string) => void
//     getInterviewsByPhase: (currentPhase: string) => Interview[]
//     formatDate: (dateString: string | number | Date | undefined) => string
//     handleAccept: (interview: Interview) => void
//     phases: string[]
//     handleTabChange: ( event: React.SyntheticEvent, newValue: string) => void
//     handleApplyFilter: () => void
//     handleClearFilter: () => void

//    fetchFilteredInterviews: (
//     currentPhase?: string,
//     status?: string,
//     startDate?: Date,
//     endDate?: Date,
// ) => Promise<Interview[]>

//     setFilteredInterviews: Dispatch<React.SetStateAction<Interview[]>>
//     scheduleType: 'schedule' | 'reschedule'
//     setScheduleType: Dispatch<React.SetStateAction<'schedule' | 'reschedule'>>
// }

// const InterviewContext = createContext<InterviewContextType | undefined>(
//     undefined,
// )

// export const useInterviewContext = () => {
//     const context = useContext(InterviewContext)
//     if (!context) {
//         throw new Error(
//             'useInterviewContext must be used within an InterviewProvider',
//         )
//     }
//     return context
// }

// export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const { data: interviewsData, error, loading } = useGetAllInterviews()
//     const [interviews, setInterviews] = useState<Interview[]>([])
//     const [selectedInterview, setSelectedInterview] =
//         useState<Interview | null>(null)
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [isReschedule, setIsReschedule] = useState(false)
//     const [allPhasesPassed] = useState(false)
//     const navigate = useNavigate()
//     const [currentPhase, setCurrentPhase] = useState<string>('first_interview')
//     const [startDate, setStartDate] = useState<string>('')
//     const [endDate, setEndDate] = useState<string>('')
//     const [currentTab, setCurrentTab] = useState<string>('first_interview')
//     // const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([])
//     const [isFiltered, setIsFiltered] = useState(false)

//     const phases = [
//         'first_interview',
//         'second_interview',
//         'rejected',
//         'employed',
//     ]
//     const [scheduleType, setScheduleType] = useState<'schedule' | 'reschedule'>(
//         'schedule',
//     )
//     const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>(
//         [],
//     )
//     const [toastOpen, setToastOpen] = useState(false)
//     const [toastMessage, setToastMessage] = useState('')
//     const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
//         'success',
//     )

//     useEffect(() => {
//         if (interviewsData && Array.isArray(interviewsData)) {
//             const mappedInterviews: Interview[] = interviewsData.map(
//                 (applicant) => {
//                     let currentPhase = 'applicant'

//                     if (applicant.secondInterviewDate) {
//                         currentPhase = 'second_interview'
//                         if (applicant.status === 'rejected') {
//                             currentPhase = 'rejected'
//                         }
//                     } else if (applicant.firstInterviewDate) {
//                         currentPhase = 'first_interview'
//                     } else if (applicant.status === 'employed') {
//                         currentPhase = 'employed'
//                     }

//                     return {
//                         ...applicant,
//                         fullName: `${applicant.firstName} ${applicant.lastName}`,
//                         auth: { email: applicant.email },
//                         secondInterviewDate: applicant.secondInterviewDate
//                             ? new Date(
//                                   applicant.secondInterviewDate,
//                               ).toISOString()
//                             : undefined,
//                         firstInterviewDate: applicant.firstInterviewDate
//                             ? new Date(
//                                   applicant.firstInterviewDate,
//                               ).toISOString()
//                             : undefined,
//                         notes: applicant.notes || '',
//                         currentPhase: currentPhase,
//                         _id: applicant._id,
//                         customMessage: applicant.customMessage || '',
//                         customSubject: applicant.customSubject || '',
//                     }
//                 },
//             )

//             setInterviews(mappedInterviews)
//             setFilteredInterviews(mappedInterviews)
//         }
//     }, [interviewsData])

//     const fetchFilteredInterviews = async (
//         currentPhase?: string,
//         status?: string,
//         startDate?: Date,
//         endDate?: Date,
//     ): Promise<Interview[]> => {
//         try {
//             const params: any = {};
            
//             if (currentPhase) params.currentPhase = currentPhase;
//             if (status) params.status = status;
//             if (startDate) params.startDate = startDate.toISOString();  
//             if (endDate) params.endDate = endDate.toISOString();      
    
//             console.log('Fetching with params:', params); 
    
//             const response = await AxiosInstance.get(`/applicant`, { params });
    
//             if (response.status === 200) {
//                 if (Array.isArray(response.data)) {
//                     const filteredData = response.data as Interview[];
//                     setFilteredInterviews(filteredData);
//                     return filteredData;
//                 } else {
//                     console.error('Unexpected response data format:', response.data);
//                     return [];
//                 }
//             } else {
//                 console.error('Failed to fetch interviews, status code:', response.status);
//                 return [];
//             }
//         } catch (error) {
//             console.error('Error fetching interviews:', error);
//             return [];
//         }
//     };
//     useEffect(() => {
//         fetchFilteredInterviews().then(setFilteredInterviews)
//     }, [])

//     useEffect(() => {
//         filterInterviews()
//     }, [currentTab, interviews, isFiltered, startDate, endDate])

//     const filterInterviews = () => {
//         let filtered = interviews.filter((interview) => {
//             if (currentTab === 'first_interview' && interview.currentPhase === 'first_interview') return true
//             if (currentTab === 'second_interview' && interview.currentPhase === 'second_interview') return true
//             if (currentTab === 'rejected' && interview.status === 'rejected') return true
//             if (currentTab === 'employed' && interview.status === 'employed') return true
//             return false
//         })

//         if (isFiltered && startDate && endDate) {
//             const start = new Date(startDate as string);
//             const end = new Date(endDate as string);
//             end.setHours(23, 59, 59, 999); 
        
//             filtered = filtered.filter((interview) => {
//                 const interviewDateRaw = interview.currentPhase === 'second_interview'
//                     ? interview.secondInterviewDate
//                     : interview.firstInterviewDate;
                
//                 if (interviewDateRaw) {
//                     const interviewDate = new Date(interviewDateRaw);
//                     return interviewDate >= start && interviewDate <= end;
//                 }
        
//                 return false;
//             });
//         }
        
//         setFilteredInterviews(filtered);
//     }        

//     const handleTabChange = (
//         _event: React.SyntheticEvent,
//         newValue: string,
//     ) => {
//         setCurrentTab(newValue)
//     }

//     const handleApplyFilter = () => {
//         setIsFiltered(true)
//         setCurrentTab(currentPhase)
//     }

//     const handleClearFilter = () => {
//         setIsFiltered(false)
//         setCurrentPhase('first_interview')
//         setStartDate('')
//         setEndDate('')
//         setCurrentTab('first_interview')
//     }
    

//     const handleOpenModal = (interview: Interview, isReschedule = false) => {
//         setSelectedInterview(interview)
//         setIsModalOpen(true)
//         setIsReschedule(isReschedule)
//     }

//     const handleCloseModal = () => {
//         setIsModalOpen(false)
//         setSelectedInterview(null)
//     }

//     const handleCancel = async (interview: Interview) => {
//         try {
//             const response = await AxiosInstance.patch(`/applicant/${interview._id}`, {
//                 status: 'rejected', 
//                 currentPhase: 'rejected',
//             });
    
//             if (response.status === 200) {
//                 setInterviews((prevInterviews) =>
//                     prevInterviews.map((i) =>
//                         i._id === interview._id
//                             ? { ...i, status: 'rejected', currentPhase: 'rejected' }
//                             : i
//                     )
//                 );
//                 setFilteredInterviews((prevInterviews) =>
//                     prevInterviews.filter((i) => i._id !== interview._id)
//                 );
    
//                 setToastMessage('This candidate will now be found in the rejected tab');
//                 setToastSeverity('success');
//                 setToastOpen(true);
//             }
//         } catch (error) {
//             console.error('Failed to cancel interview:', error);
//             setToastMessage('Failed to reject the candidate');
//             setToastSeverity('error');
//             setToastOpen(true);
//         }
//     };
    

//     const handleSchedule = async (
//         interviewDate: string,
//         notes: string,
//         customMessage: string,
//         customSubject: string,
//     ) => {
//         if (!selectedInterview) {
//             console.error('No interview selected for scheduling')
//             return
//         }

//         const dateField = isReschedule
//             ? selectedInterview.currentPhase === 'first_interview'
//                 ? 'firstInterviewDate'
//                 : 'secondInterviewDate'
//             : 'secondInterviewDate'
//         const newPhase = isReschedule
//             ? selectedInterview.currentPhase
//             : 'second_interview'

//         try {
//             const response = await AxiosInstance.patch(
//                 `/applicant/${selectedInterview._id}`,
//                 {
//                     [dateField]: interviewDate,
//                     notes,
//                     customMessage,
//                     customSubject,
//                     currentPhase: newPhase,
//                 },
//             )

//             if (response.status === 200) {
//                 setInterviews((prevInterviews) =>
//                     prevInterviews.map((interview) =>
//                         interview._id === selectedInterview._id
//                             ? {
//                                   ...interview,
//                                   [dateField]: new Date(
//                                       interviewDate,
//                                   ).toISOString(),
//                                   notes,
//                                   customMessage,
//                                   customSubject,
//                                   currentPhase: newPhase,
//                               }
//                             : interview,
//                     ),
//                 )
//                 setFilteredInterviews((prevInterviews) =>
//                     prevInterviews.map((interview) =>
//                         interview._id === selectedInterview._id
//                             ? {
//                                   ...interview,
//                                   [dateField]: new Date(
//                                       interviewDate,
//                                   ).toISOString(),
//                                   notes,
//                                   customMessage,
//                                   customSubject,
//                                   currentPhase: newPhase,
//                               }
//                             : interview,
//                     ),
//                 )
//                 handleCloseModal()
//             }
//         } catch (error) {
//             console.error('Failed to schedule interview:', error)
//         }
//     }

//     const handleAccept = async (interview: Interview) => {
//         try {
//             let newPhase = interview.currentPhase
//             let status = interview.status

//         if (interview.currentPhase === 'first_interview') {
//             newPhase = 'second_interview';
//             status = 'active';
//             handleOpenModal(interview, false); 
//         } 
//         else if (interview.currentPhase === 'second_interview') {
            
//             status = 'employed';
//             newPhase = 'employed';
//         }

//             const response = await AxiosInstance.patch(
//                 `/applicant/${interview._id}`,
//                 {
//                     status: status,
//                     currentPhase: newPhase,
//                 },
//             )

//             if (response.status === 200) {
//                 setInterviews((prevInterviews) =>
//                     prevInterviews.map((i) =>
//                         i._id === interview._id
//                             ? { ...i, status: status, currentPhase: newPhase }
//                             : i,
//                     ),
//                 )
//                 setFilteredInterviews((prevInterviews) =>
//                     prevInterviews.map((i) =>
//                         i._id === interview._id
//                             ? { ...i, status: status, currentPhase: newPhase }
//                             : i,
//                     ),
//                 )

//                 if (status === 'employed') {
//                     setToastMessage(
//                         'This candidate will now be found as an employee',
//                     )
//                     setToastSeverity('success')
//                     setToastOpen(true)
//                 }
//             }
//         } catch (error) {
//             console.error('Failed to update interview status:', error)
//             setToastMessage('Failed to accept the candidate')
//             setToastSeverity('error')
//             setToastOpen(true)
//         }
//     }

//     const onDragEnd = async (result: DropResult) => {
//         if (!result.destination) return

//         const { source, destination } = result

//         if (
//             source.droppableId === 'employed' &&
//             destination.droppableId !== 'employed'
//         ) {
//             return
//         }

//         const draggedInterview = filteredInterviews.find(
//             (interview) => interview._id.toString() === result.draggableId,
//         )

//         if (!draggedInterview) return

//         try {
//             const response = await AxiosInstance.patch(
//                 `/applicant/${draggedInterview._id}`,
//                 {
//                     currentPhase: destination.droppableId,
//                     status:
//                         destination.droppableId === 'employed'
//                             ? 'employed'
//                             : 'active',
//                 },
//             )

//             if (response.status === 200) {
//                 setInterviews((prevInterviews) =>
//                     prevInterviews.map((interview) =>
//                         interview._id === draggedInterview._id
//                             ? {
//                                   ...interview,
//                                   currentPhase: destination.droppableId,
//                                   status:
//                                       destination.droppableId === 'employed'
//                                           ? 'employed'
//                                           : 'active',
//                               }
//                             : interview,
//                     ),
//                 )
//                 setFilteredInterviews((prevInterviews) =>
//                     prevInterviews.map((interview) =>
//                         interview._id === draggedInterview._id
//                             ? {
//                                   ...interview,
//                                   currentPhase: destination.droppableId,
//                                   status:
//                                       destination.droppableId === 'employed'
//                                           ? 'employed'
//                                           : 'active',
//                               }
//                             : interview,
//                     ),
//                 )
//             }
//         } catch (error) {
//             console.error('Failed to update interview phase:', error)
//         }
//     }

//     const handleNavigateToProfile = (CandidateViewId: string) => {
//         navigate(`/view/${CandidateViewId}`)
//     }

//     return (
//         <InterviewContext.Provider
//             value={{
//                 loading,
//                 error,
//                 interviews: filteredInterviews,
//                 selectedInterview,
//                 isModalOpen,
//                 isReschedule,
//                 allPhasesPassed,
//                 handleOpenModal,
//                 handleCloseModal,
//                 handleSchedule,
//                 handleCancel,
//                 onDragEnd,
//                 handleNavigateToProfile,
//                 handleAccept,
//                 getInterviewsByPhase: (phase: string) =>
//                     getInterviewsByPhase(interviews, phase),
//                 formatDate: (dateString: string | number | Date | undefined) =>
//                     formatDate(dateString ?? ''),
//                 phases,
//                 fetchFilteredInterviews,
//                 scheduleType,
//                 setIsReschedule,
//                 setScheduleType,
//                 setFilteredInterviews,
//                 handleTabChange,
//                 handleApplyFilter,
//                 handleClearFilter,
//             }}
//         >
//             {children}
//             <Toast
//                 open={toastOpen}
//                 message={toastMessage}
//                 severity={toastSeverity}
//                 onClose={() => false}
//             />
//         </InterviewContext.Provider>
//     )
// }
