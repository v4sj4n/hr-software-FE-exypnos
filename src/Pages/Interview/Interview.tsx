import DataTable from '../../Components/Table/Table'
import style from './styles/Interview.module.css'
import Button from '../../Components/Button/Button';
import { GridRenderCellParams } from '@mui/x-data-grid'; 
import RescheduleModal from './Component/ScheduleForm'
import { useState } from 'react';
import { ButtonTypes } from '../../Components/Button/ButtonTypes';

interface Interview {
  fullName: string;
  auth: { email: string };
  phone: string;
  position: string;
  date: string;
  time: string;
  cvAttachment: string;
}

const dummyInterviews: Interview[] = [
  {
    fullName: "Artemisa Nuri",
    auth: { email: "artemisa.nuri@example.com" },
    phone: "123-456-7890",
    position: "Software Engineer",
    date: "2024-07-25",
    time: "14:00",
    cvAttachment: "artemisa_nuri_cv.pdf",
  },
  {
    fullName: "Gerti Kadiu",
    auth: { email: "gerti.kadiu@example.com" },
    phone: "987-654-3210",
    position: "Project Manager",
    date: "2024-07-26",
    time: "10:30",
    cvAttachment: "gerti_kadiu_cv.pdf",
  },
  {
    fullName: "Redi Balla",
    auth: { email: "redi.balla@example.com" },
    phone: "456-789-0123",
    position: "UX Designer",
    date: "2024-07-27",
    time: "11:00",
    cvAttachment: "redi_balla_cv.pdf",
  },
  {
    fullName: "Vasjan Cupri",
    auth: { email: "vasjan.cupri@example.com" },
    phone: "789-012-3456",
    position: "Data Scientist",
    date: "2024-07-28",
    time: "15:30",
    cvAttachment: "vasjan_cupri_cv.pdf",
  },
  {
    fullName: "Selma Bakiu",
    auth: { email: "selma.bakiu@example.com" },
    phone: "234-567-8901",
    position: "Game Developer",
    date: "2024-07-29",
    time: "13:00",
    cvAttachment: "selma_bakiu_cv.pdf",
  },
];

export default function Interview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const [interviews, setInterviews] = useState<Interview[]>(dummyInterviews);

  const rows = interviews.map((interview, index) => ({
    id: index + 1,
    fullName: interview.fullName,
    email: interview.auth?.email,
    phone: interview.phone,
    position: interview.position,
    date: interview.date,
    time: interview.time,
    cvAttachment: interview.cvAttachment,
  }));

  const handleOpenModal = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleReschedule = (date: string, time: string) => {
    if (selectedInterview) {
      const updatedInterviews = interviews.map(interview => 
        interview.fullName === selectedInterview.fullName
          ? { ...interview, date, time }
          : interview
      );
      setInterviews(updatedInterviews);
    }
    handleCloseModal();
  };

  const columns = [
    { field: 'id', headerName: 'No', Maxwidth: '10px'},
    { field: 'fullName', headerName: ' Name' },
    { field: 'email', headerName: 'Email', flex:1 },
    { field: 'phone', headerName: 'Phone', flex:1 },
    { field: 'position', headerName: 'Position'},
    { field: 'date', headerName: 'Date', flex:1 },
    { field: 'time', headerName: 'Time', flex:1  },
    { field: 'cvAttachment', headerName: 'CV', flex:1 },
    {
      field: 'reschedule',
      headerName: 'Reschedule',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Button type={ButtonTypes.PRIMARY}
          btnText="Reschedule"
          marginTop='10px'
          width="90px"
          height="35px" 
          padding='1opx' 
          display='flex'
          justifyContent= 'center'
          alignItems='center'      
          onClick={() => handleOpenModal(params.row as Interview)}>
        </Button>
      ),
    },
  ];

  const getRowId = (row: any) => row.id;

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor: "#f0f5ff" }}>
      <div className={style.title}>Interviews</div>
      <DataTable rows={rows} columns={columns} getRowId={getRowId} />
      {selectedInterview && (
        <RescheduleModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleReschedule={handleReschedule}
          selectedInterview={selectedInterview}
        />
      )}
    </div>
  );
}