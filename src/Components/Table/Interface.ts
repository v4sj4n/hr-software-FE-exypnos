export interface TableProps {
    initialValue?: string;
    id?: string;
    type?: boolean | string;
    icon?: React.ReactNode;
    name: string;
    width?: string | number;
    field?: string;
    headerName: string;
    flex?: number | string;
    rednderHeader?: (params: React.ChangeEvent<HTMLInputElement>) => void;
    rendeerCell?: (params: React.ChangeEvent<HTMLInputElement>) => void;
  }