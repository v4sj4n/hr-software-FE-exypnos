// import React, { createContext, useState, useEffect, useContext  } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { DropResult } from 'react-beautiful-dnd';
// import { useGetAllInterviews, applicantsData } from '.';
// import { formatDate, getInterviewsByPhase } from './utils';
// import AxiosInstance from '@/Helpers/Axios';



// export interface Interview extends applicantsData {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   positionApplied: string;
//   status: string;
//   _id: string;
//   firstInterviewDate?: string ;
//   secondInterviewDate?: string ;
//   customMessage: string;
//   currentPhase: string;
//   isDeleted?: boolean;
//   fullName: string;
//   customSubject:string;

// }




// interface InterviewContextType {
//   interviews: Interview[];
//   loading: boolean;
//   error: string | null;
//   selectedInterview: Interview | null;
//   isModalOpen: boolean;
//   isReschedule: boolean;
//   allPhasesPassed: boolean;
//   handleOpenModal: (interview: Interview, isReschedule: boolean) => void;
//   handleCloseModal: () => void;
//   handleReschedule: (interviewDate: string, notes: string,customMessage:string, customSubject:string) => void;
//   handleCancel: (interview: Interview) => void;
//   handleSchedule: (interviewDate: string, notes: string,customMessage:string, customSubject:string) => void;
//   onDragEnd: (result: DropResult) => void;
//   handleNavigateToProfile: (CandidateViewId: string) => void;
//   getInterviewsByPhase: (currentPhase: string) => Interview[];
//   formatDate: (dateString: string | number | Date | undefined) => string;
//   handleAccept: (interview: Interview) => void;
//   phases: string[];

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

// export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { data: interviewsData, error, loading } = useGetAllInterviews();
//   const [interviews, setInterviews] = useState<Interview[]>([]);
//   const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isReschedule, setIsReschedule] = useState(false);
//   const [allPhasesPassed] = useState(false);
//   const navigate = useNavigate();
//   const phases = [ 'first_interview', 'second_interview','rejected','employed'];
// //     const [customMessage, setCustomMessage] = useState('');
// //     const [customSubject, setCustomSubject] = useState('');
// //     const [secondInterviewDate, setSecondInterviewDate] = useState('');
// //     const [notes, setNotes] = useState('');
// // const [interviewDate, setInterviewDate] = useState('');



//   useEffect(() => {
//     if (interviewsData && Array.isArray(interviewsData)) {
//       const mappedInterviews: Interview[] = interviewsData.map((applicant) => {
//         let currentPhase = 'applicant';

//         if (applicant.secondInterviewDate) {
//             currentPhase = 'second_interview';
//             if(applicant.rejected){
//               currentPhase ='rejected';
//             } 
//         } else if (applicant.firstInterviewDate) {
//             currentPhase = 'first_interview';
//         }
  
//         return {
//           ...applicant,
//           fullName: `${applicant.firstName} ${applicant.lastName}`,
//           auth: { email: applicant.email },
//           secondInterviewDate: applicant.secondInterviewDate ? new Date(applicant.secondInterviewDate).toISOString() : undefined,
//           firstInterviewDate: applicant.firstInterviewDate ? new Date(applicant.firstInterviewDate).toISOString() : undefined,
//           notes: applicant.notes || '',
//           currentPhase: currentPhase,  
//           _id: applicant._id,
//           customMessage: applicant.customMessage || '',
//           customSubject: applicant.customSubject || '',
//         };
//       });
  
//       setInterviews(mappedInterviews);
//     }
//   }, [interviewsData]);


// const handleOpenModal = (interview: Interview, isReschedule = false) => {
//     console.log('Before setting modal open:', isModalOpen);
//     setSelectedInterview(interview);  
//     setIsModalOpen(true);
//     setIsReschedule(isReschedule);
//     console.log('After setting modal open:', isModalOpen);

//   };
  

//     const handleCloseModal = () => {
//         setIsModalOpen(false)
//         setSelectedInterview(null)
//     }


//     const { id } = useParams<{ id: string }>()

//     const handleCancel = async () => {
     
//         try {
//             await AxiosInstance.patch(`/applicant/${id}`, {
//                 status: 'rejected',
//             })
//             fetchApplicant()
//         } catch (error) {
//             console.error('Error rejecting applicant:', error)
//         }
//     };
    



// // Modify the handleReschedule function
// const handleReschedule = async (interviewDate: string, notes: string, customMessage: string, customSubject: string) => {
//   if (!selectedInterview) {
//     console.error('No interview selected for rescheduling');
//     return;
//   }

//   // let dateField: 'firstInterviewDate' | 'secondInterviewDate';
//   // let updatedPhase = selectedInterview.currentPhase; 

//   if (selectedInterview.currentPhase === 'first_interview') {
//     interviewDate = 'firstInterviewDate';
//   } else if (selectedInterview.currentPhase === 'second_interview') {
//     interviewDate = 'secondInterviewDate';
//   } else {
//     console.error('Invalid phase for rescheduling');
//     return;
//   }

//   try {
//     const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
//       interviewDate,
//       notes,
//       customMessage,
//       customSubject,
//     });

//     if (response.status === 200) {
//       setInterviews(prevInterviews =>
//         prevInterviews.map(interview =>
//           interview._id === selectedInterview._id
//             ? {
//                 ...interview,
//                interviewDate,
//                 notes,
//                 customMessage,
//                 customSubject,
//               }
//             : interview
//         )
//       );
//       setIsModalOpen(false);
//       handleCloseModal();
//     }
//   } catch (error) {
//     console.error('Failed to reschedule interview:', error);
//   }
// };



// // Modify the handleSchedule function
// const handleSchedule = async (interviewDate: string, notes: string, customMessage: string, customSubject: string) => {
//   if (!selectedInterview) {
//     console.error('No interview selected for scheduling');
//     return;
//   }

//   // Ensure we only handle the transition from first interview to second interview
//   if (selectedInterview.currentPhase !== 'first_interview') {
//     console.error('Interview is not in the first interview phase');
//     return;
//   }

//   const dateField = 'secondInterviewDate';
//   const newPhase = 'second_interview';

//   try {
//     const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
//       [dateField]: interviewDate,
//       notes,
//       customMessage,
//       customSubject,
//       currentPhase: newPhase
//     });

//     if (response.status === 200) {
//       setInterviews(prevInterviews => 
//         prevInterviews.map(interview => 
//           interview._id === selectedInterview._id 
//             ? { 
//                 ...interview, 
//                 [dateField]: new Date(interviewDate).toISOString(),  
//                 notes, 
//                 customMessage, 
//                 customSubject,
//                 currentPhase: newPhase
//               }
//             : interview
//         )
//       );
//       handleCloseModal();
//     }
//   } catch (error) {
//     console.error('Failed to schedule interview:', error);
//     // Handle error
//   }
// };




// // const handleSchedule = async () => {
// //   if (!selectedInterview) return

// //   try {
// //     await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
// //           interviewDate: selectedInterview.secondInterviewDate,
// //           customMessage: selectedInterview.customMessage,
// //           customSubject:selectedInterview.customSubject,
// //           notes: selectedInterview.notes,
// //       });
// //       setIsModalOpen(false);
// //   } catch (error) {
// //       console.error('Error updating interview:', error)
// //   }
// // }

// // Modify the handleAccept function
// const handleAccept = async (interview: Interview) => {
//     setSelectedInterview(interview);
//     setIsReschedule(false);
//     setIsModalOpen(true);
//     try {
//     const response = await AxiosInstance.patch(`/applicant/${interview._id}`, {
//       status: 'active'
//     });

//     if (response.status === 200) {
//       setInterviews(prevInterviews =>
//         prevInterviews.map(i =>
//           i._id === interview._id
//             ? { ...i, status: 'active', currentPhase: 'applicant' }
//             : i
//         )
//       );
//     }
//   } catch (error) {
//     console.error('Failed to update interview status:', error);
//   }
// };



//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const newInterviews = Array.from(interviews);
//     const [reorderedItem] = newInterviews.splice(result.source.index, 1);
//     reorderedItem.currentPhase = result.destination.droppableId;
//     newInterviews.splice(result.destination.index, 0, reorderedItem);

//     setInterviews(newInterviews);
//   };

//     const handleNavigateToProfile = (CandidateViewId: string) => {
//         navigate(`/view/${CandidateViewId}`)
//     }

//   return (
//     <InterviewContext.Provider
//       value={{
//         interviews,
//         loading,
//         error,
//         selectedInterview,
//         isModalOpen,
//         isReschedule,
//         allPhasesPassed,
//         handleOpenModal,
//         handleCloseModal,
//         handleReschedule,
//         handleSchedule,
//         handleCancel,
//         onDragEnd,
//         handleNavigateToProfile,
//           handleAccept,
       
//         getInterviewsByPhase: (phase: string) => getInterviewsByPhase(interviews, phase),
//         formatDate: (dateString: string | number | Date | undefined) => formatDate(dateString ?? ""),
//         phases,
//       }}
//     >
//       {children}
//     </InterviewContext.Provider>
//   );
// };


// function fetchApplicant() {
//   throw new Error('Function not implemented.');
// }

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, applicantsData } from '.';
import { formatDate, getInterviewsByPhase } from './utils';
import AxiosInstance from '@/Helpers/Axios';

// Define the Interview interface
export interface Interview extends applicantsData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  positionApplied: string;
  status: string;
  _id: string;
  firstInterviewDate?: string;
  secondInterviewDate?: string;
  customMessage: string;
  currentPhase: string;
  isDeleted?: boolean;
  fullName: string;
  customSubject: string;
}

// Define the context type
interface InterviewContextType {
  interviews: Interview[];
  loading: boolean;
  error: string | null;
  selectedInterview: Interview | null;
  isModalOpen: boolean;
  isReschedule: boolean;
  allPhasesPassed: boolean;
  handleOpenModal: (interview: Interview, isReschedule: boolean) => void;
  handleCloseModal: () => void;
  handleReschedule: (interviewDate: string, notes: string, customMessage: string, customSubject: string) => void;
  handleCancel: (interview: Interview) => void;
  handleSchedule: (interviewDate: string, notes: string, customMessage: string, customSubject: string) => void;
  onDragEnd: (result: DropResult) => void;
  handleNavigateToProfile: (CandidateViewId: string) => void;
  getInterviewsByPhase: (currentPhase: string) => Interview[];
  formatDate: (dateString: string | number | Date | undefined) => string;
  handleAccept: (interview: Interview) => void;
  phases: string[];
  fetchFilteredInterviews : (searchText: string) => Promise<Interview[]>;
}

// Create the context
const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

// Hook to use the context
export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterviewContext must be used within an InterviewProvider');
  }
  return context;
};

// Provider component
export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: interviewsData, error, loading } = useGetAllInterviews();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [allPhasesPassed] = useState(false);
  const navigate = useNavigate();
  const phases = ['first_interview', 'second_interview', 'rejected', 'employed'];

  // Map the interviews data to the format expected by the Interview interface
  useEffect(() => {
    if (interviewsData && Array.isArray(interviewsData)) {
      const mappedInterviews: Interview[] = interviewsData.map((applicant) => {
        let currentPhase = 'applicant';

        if (applicant.secondInterviewDate) {
          currentPhase = 'second_interview';
          if (applicant.status === 'rejected') {
            currentPhase = 'rejected';
          }
        } else if (applicant.firstInterviewDate) {
          currentPhase = 'first_interview';
        } else if (applicant.status === 'employed') {
          currentPhase = 'employed';
        }

        return {
          ...applicant,
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          auth: { email: applicant.email },
          secondInterviewDate: applicant.secondInterviewDate
            ? new Date(applicant.secondInterviewDate).toISOString()
            : undefined,
          firstInterviewDate: applicant.firstInterviewDate
            ? new Date(applicant.firstInterviewDate).toISOString()
            : undefined,
          notes: applicant.notes || '',
          currentPhase: currentPhase,
          _id: applicant._id,
          customMessage: applicant.customMessage || '',
          customSubject: applicant.customSubject || '',
        };
      });

      setInterviews(mappedInterviews);
    }
  }, [interviewsData]);

  const fetchFilteredInterviews = async (currentPhase: string, status: string, dateFilter: string, startDate?: Date, endDate?: Date) => {
    
    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
        params: {
          currentPhase,
          status,
          dateFilter,
          startDate: startDate ? startDate.toISOString() : undefined,
          endDate: endDate ? endDate.toISOString() : undefined,
        },
      });
      if (response.status === 200) {
        setInterviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

 

  const handleOpenModal = (interview: Interview, isReschedule = false) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };


  

  const handleCancel = async () => {
    if (!selectedInterview) return;
    await handleReject(selectedInterview._id);
    handleCloseModal();
  };

  const handleReschedule = async (
    interviewDate: string,
    notes: string,
    customMessage: string,
    customSubject: string
  ) => {
    if (!selectedInterview) {
      console.error('No interview selected for rescheduling');
      return;
    }
  
    let dateField: 'firstInterviewDate' | 'secondInterviewDate';
    if (selectedInterview.currentPhase === 'first_interview') {
      dateField = 'firstInterviewDate';
    } else if (selectedInterview.currentPhase === 'second_interview') {
      dateField = 'secondInterviewDate';
    } else {
      console.error('Invalid phase for rescheduling');
      return;
    }
  
    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
        [dateField]: interviewDate,
        notes,
        customMessage,
        customSubject,
      });
  
      if (response.status === 200) {
        setInterviews((prevInterviews) =>
          prevInterviews.map((interview) =>
            interview._id === selectedInterview._id
              ? {
                  ...interview,
                  [dateField]: interviewDate,
                  notes,
                  customMessage,
                  customSubject,
                }
              : interview
          )
        );
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to reschedule interview:', error);
    }
  };

  

  const handleSchedule = async (
    interviewDate: string,
    notes: string,
    customMessage: string,
    customSubject: string
  ) => {
    if (!selectedInterview) {
      console.error('No interview selected for scheduling');
      return;
    }

    const dateField = 'secondInterviewDate';
    const newPhase = 'second_interview';

    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
        [dateField]: interviewDate,
        notes,
        customMessage,
        customSubject,
        currentPhase: newPhase,
      });

      if (response.status === 200) {
        setInterviews((prevInterviews) =>
          prevInterviews.map((interview) =>
            interview._id === selectedInterview._id
              ? {
                  ...interview,
                  [dateField]: new Date(interviewDate).toISOString(),
                  notes,
                  customMessage,
                  customSubject,
                  currentPhase: newPhase,
                }
              : interview
          )
        );
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error);
    }
  };



  const handleAccept = async (interview: Interview) => {
    try {
      let newPhase = interview.currentPhase;
      let status = interview.status;
      if (interview.currentPhase === 'first_interview') {
        newPhase = 'second_interview';
        status = 'active';
      } else if (interview.currentPhase === 'second_interview') {
        newPhase = 'employed';
        status = 'employed';
        
      }
  
      const response = await AxiosInstance.patch(`/applicant/${interview._id}`, {
        status: status,
        currentPhase: newPhase,
      });
  
      if (response.status === 200) {
        setInterviews((prevInterviews) =>
          prevInterviews.map((i) =>
            i._id === interview._id
              ? { ...i, status: 'active', currentPhase: newPhase }
              : i
          )
        );
  
        // Close modal only if moving from first interview to second interview
        if (newPhase === 'second_interview') {
          setSelectedInterview(interview);
          setIsReschedule(false);
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error('Failed to update interview status:', error);
    }
  };
  

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.currentPhase = result.destination.droppableId;
    newInterviews.splice(result.destination.index, 0, reorderedItem);

    setInterviews(newInterviews);
  };



  

  const handleNavigateToProfile = (CandidateViewId: string) => {
    navigate(`/view/${CandidateViewId}`);
  };

  return (
    <InterviewContext.Provider
      value={{
        interviews,
        loading,
        error,
        selectedInterview,
        isModalOpen,
        isReschedule,
        allPhasesPassed,
        handleOpenModal,
        handleCloseModal,
        handleReschedule,
        handleSchedule,
        handleCancel,
        onDragEnd,
        handleNavigateToProfile,
        handleAccept,
        getInterviewsByPhase: (phase: string) => getInterviewsByPhase(interviews, phase),
        formatDate: (dateString: string | number | Date | undefined) =>
          formatDate(dateString ?? ''),
        phases,
        fetchFilteredInterviews,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};


function handleReject(_id: string) {
  throw new Error('Function not implemented.');
}

