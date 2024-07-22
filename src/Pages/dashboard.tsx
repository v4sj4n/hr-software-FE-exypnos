import React , {useState} from "react";
import SideBar from "../../src/Components/sidebar.tsx";
import Header from "../Components/header.tsx";
import Card from "./Dashboard/components/card.tsx";
import InfoSection from "./Dashboard/components/infoSection.tsx";
import style from "../../src/Pages/Dashboard/style/dashboard.module.css";
import PieChartComponent from "./Dashboard/components/piechart.tsx";
import Calendar from "./Dashboard/components/calendar.tsx";

const Dashboard: React.FC = () => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
};


  const data = [
    { name: "Present", value: 20 },
    { name: "Absent", value: 10 },
    { name: "On Leave", value: 5 },
    { name: "Remote", value: 15 },
  ];

  return (
    <div className={style.dashboardContainer}>
      <Header  isOpen= {isOpen}/>
      <div className={style.mainContent}>
        <SideBar isOpen= {isOpen} toggleSidebar={toggleSidebar} />
        <div className={style.rightContent}>
          <div className={style.welcome}>
            <h2>Welcome, Elisabeta!</h2>
            <p>Here's what's happening with your team today</p>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardGreen}><Card title="Present" content="20" icon="Present" /></div>
            <div className={style.cardBlue}><Card title="Absent" content="8" icon="Absent" /></div>
            <div className={style.cardYellow}><Card title="On Leave" content="5" icon="On Leave" /></div>
            <div className={style.cardPurple}><Card title="Remote" content="3" icon="Remote" /></div>
          </div>
          <div className={style.middleRow}>
            <div className={style.calendar}>
              <h3>Calendar</h3>
              <Calendar />
            </div>
            <div className={style.infoSection}>
              <InfoSection />
            </div>
            <div className={style.pieChartDiv}>
              <h3>Employee Status</h3>
              <PieChartComponent data={data} />
            </div>
          </div>
          <div className={style.employeeProfile}>
            <h3>Employee Profiles</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;