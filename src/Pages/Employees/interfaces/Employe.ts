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

export interface EmployeeContextType {
    rows: EmployeeRow[];
    columns: GridColDef[];
    headerIcons: { [key: string]: React.ComponentType<SvgIconProps> };
    headerTextColors: { [key: string]: string };
    getRowId: (row: EmployeeRow) => number;
}


export interface UserProfileData {
    auth: {
        email: string;
    };
    lastName: string;
    phone: string;
    pob: string;
    dob: string;
    gender: string;
    role: string;
    firstName: string;
    imageUrl: string;
    file: string;
    _id: number;
}

export const EmployeeContext = React.createContext<EmployeeContextType | undefined>(undefined);
