export interface applicantsData {
    fullName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: number;
    interviewDate: string;
    startDate: string;
    endDate: string;
    phase: string;
    notes: string;
    
}



export interface RescheduleInterview{
    _id: string;
    fullName: string;
    interviewDate: string;
    startDate: string;
    endDate: string;
    notes: string;
    phase: string;
}

export interface Interview {
    fullName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: number;
    interviewDate: string;
    startDate: string;
    endDate: string;
    phase: string;
    notes: string;
}