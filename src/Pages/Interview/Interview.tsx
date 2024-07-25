import DataTable from '../../Components/Table/Table'
//import { useGetAllInterviews } from './Hook';
import style from './styles/Interview.module.css'


const dummyInterviews = [
  {
    firstName: "Artemisa",
    lastName: "Nuri",
    auth: { email: "artemisa.nuri@example.com" },
    phone: "123-456-7890",
    position: "Software Engineer",
    date: "2024-07-25",
    time: "14:00",
    notes: "Experienced in React",
    cvAttachment: "artemisa_nuri_cv.pdf",
  },
  {
    firstName: "Gerti",
    lastName: "Kadiu",
    auth: { email: "gerti.kadiu@example.com" },
    phone: "987-654-3210",
    position: "Project Manager",
    date: "2024-07-26",
    time: "10:30",
    notes: "5 years of experience",
    cvAttachment: "gerti_kadiu_cv.pdf",
  },
  {
    firstName: "Redi",
    lastName: "Balla",
    auth: { email: "redi.balla@example.com" },
    phone: "456-789-0123",
    position: "UX Designer",
    date: "2024-07-27",
    time: "11:00",
    notes: "Portfolio attached",
    cvAttachment: "redi_balla_cv.pdf",
  },
  {
    firstName: "Vasjan",
    lastName: "Cupri",
    auth: { email: "vasjan.cupri@example.com" },
    phone: "789-012-3456",
    position: "Data Scientist",
    date: "2024-07-28",
    time: "15:30",
    notes: "PhD in Machine Learning",
    cvAttachment: "vasjan_cupri_cv.pdf",
  },
  {
    firstName: "Selma",
    lastName: "Bakiu",
    auth: { email: "selma.bakiu@example.com" },
    phone: "234-567-8901",
    position: "Game Developer",
    date: "2024-07-29",
    time: "13:00",
    notes: "3 years of  3d developing",
    cvAttachment: "selma_bakiu_cv.pdf",
  },
];


export default function Interview() {

  // const {interviews} = useGetAllInterviews();
  const interviews= dummyInterviews;
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
    { field: 'id', headerName: 'No', width: 50 },
    { field: 'firstName', headerName: 'First name', width: 120 },
    { field: 'lastName', headerName: 'Last name', width: 120 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'notes', headerName: 'Notes', width: 150 },
    { field: 'cvAttachment', headerName: 'CV', width: 150 },


];
const getRowId = (row) => row.id;


    
  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor: "#f0f5ff" }}>
    <div className={style.title}>Interviews</div>
    <DataTable rows={rows} columns={columns} getRowId={getRowId} />
</div>
  )
}
