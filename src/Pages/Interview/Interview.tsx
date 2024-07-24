import DataTable from '../../Components/Table/Table'
import { useGetAllInterviews } from './Hook';
import style from './styles/Interview.module.css'

export default function Interview() {

  const {interviews} = useGetAllInterviews();
  const rows = interviews.map((interview, index) => ({
    id: index + 1,
    firstName: interview.firstName,
    lastName: interview.lastName,
    email: interview.auth?.email,
    phone: interview.phone,
    position: interview.position,
    date: interview.date,
    time: interview.time,
    notes: interview.notes,
    cvAttachment: interview.cvAttachment,


  }));
  const columns = [
    { field: 'id', headerName: 'No', width: 80 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 250 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'time', headerName: 'Time', width: 200 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'cvAttachment', headerName: 'CV', width: 200 },


];
const getRowId = (row) => row.id;


    
  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor: "#f0f5ff" }}>
    <div className={style.title}>Interviews</div>
    <DataTable rows={rows} columns={columns} getRowId={getRowId} />
</div>
  )
}
