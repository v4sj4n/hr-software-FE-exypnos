import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { SvgIconProps } from '@mui/material';

export interface CandidateRow {
    id: number;
    originalId: string | number;
    fullName: string;
    phoneNumber: string;
    email: string;
    experience: string;
    applicationMethod: string;
    age: string;
    positionApplied: string;
    technologiesUsed: string[];
    salaryExpectations: string;
    status: string;
}
  

interface CandidateContextType {
    rows: CandidateRow[];
    columns: GridColDef[];
    headerIcons: { [key: string]: React.ComponentType<SvgIconProps> };
    headerTextColors: { [key: string]: string };
    getRowId: (row: CandidateRow) => number;
}

export const CandidateContext = React.createContext<CandidateContextType | undefined>(undefined);

export const useCandidateContext = () => {
    const context = React.useContext(CandidateContext);
    if (context === undefined) {
        throw new Error('useEmployeeContext must be used within an EmployeeProvider');
    }
    return context;
};