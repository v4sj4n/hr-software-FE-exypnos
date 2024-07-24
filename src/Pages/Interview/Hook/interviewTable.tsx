import { Link } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DataTable from '../../../Components/Table/Table';
import { TableStyles } from '../../../Components/Input/Styles';
import Button from '../../../Components/Button/Button';
import { ButtonTypes } from '../../../Components/Button/ButtonTypes';
// 


interface Candidate {
  _id: string;
  Name: string;
  Position: string;
  InterviewDate: string | null;
}

interface CandidateTableProps {
  candidates: Candidate[];
  onSchedule?: (id: string) => void;
  onViewProfile?: (id: string) => void;
  
}

export default function CandidateTable({ candidates,onSchedule, onViewProfile  }: CandidateTableProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 80 },
    { field: 'Name', headerName: 'Name', width: 250 },
    { field: 'Position', headerName: 'Position', width: 150 },
    {
      field: 'InterviewDate',
      headerName: 'Interview Date',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Link style={{textDecoration:"none", color:"#4C556B"}} to={`/profile/${params.row.originalId}`}>
          {params.value}
        </Link>
      )
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
          <>
            <Button
            type={ButtonTypes.PRIMARY}
            onClick={() => onSchedule?.(params.row.originalId)}
            btnText={params.row.InterviewDate ? 'Reschedule' : 'Schedule'}
          />
          <Button
            type={ButtonTypes.PRIMARY}
            onClick={() => onViewProfile?.(params.row.originalId)}
            btnText="View Profile"           
        
          />
          </>
        )
      },
  ];

  const rows = candidates.map((candidate, index) => ({
    id: index + 1,
    originalId: candidate._id,
    Name: candidate.Name,
    Position: candidate.Position,
    InterviewDate: candidate.InterviewDate,
  }));

  return (
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(row) => row.id}
      additionalStyles={TableStyles}
    />
  );
}