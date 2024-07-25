import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { SvgIconProps } from '@mui/material';

export interface EmployeeRow {
    id: number;
    originalId: number;
    role: string;
    phone: string;
    email: string | undefined;
    fullName: string;
}

interface EmployeeContextType {
    rows: EmployeeRow[];
    columns: GridColDef[];
    headerIcons: { [key: string]: React.ComponentType<SvgIconProps> };
    headerTextColors: { [key: string]: string };
    getRowId: (row: EmployeeRow) => number;
}

export const EmployeeContext = React.createContext<EmployeeContextType | undefined>(undefined);

export const useEmployeeContext = () => {
    const context = React.useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployeeContext must be used within an EmployeeProvider');
    }
    return context;
};