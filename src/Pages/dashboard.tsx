import React from 'react';
import SideBar from '../../src/Components/sidebar.tsx'
import Header from '../Components/header.tsx';
import Card from './Dashboard/components/card.tsx';
import InfoSection from './Dashboard/components/infoSection.tsx';
import style from '../../src/Pages/Dashboard/style/dashboard.module.css';
import PieChartComponent from './Dashboard/components/piechart.tsx';
import Calendar from './Dashboard/components/calendar.tsx';


const Dashboard: React.FC = () => {
  const data = [
    { name: 'Present', value: 20 },
    { name: 'Absent', value: 10 },
    { name: 'On Leave', value: 5 },
    { name: 'Remote', value: 15 },
  ];

  return (
    <>
      <div className={style.dashboard}>
        <Header />
        <div className={style.layout}>
          <SideBar className={style.sidebar} />
         
            <div className={style.topSection}>
              <div className={style.welcome}>
                <h4>Hi, Elisabeta! Here is what is happening with your team today</h4>
              </div>
              <div className={style.calendar}>
                <h2>Calendar</h2>
                <Calendar />
              </div>
            </div>
            <div className={style.infoSection}>
              <InfoSection />
            </div>
            </div>
            <div className={style.cardContainer}>
        <div className={style.cardGreen}>
        <Card title='Present' content='20' icon='Present' />
        </div>
        <div className={style.cardBlue}>
        
        <Card title='Absent' content='8' icon='Absent' />
        </div>
        <div className={style.cardYellow}>

        <Card title='On Leave' content='5' icon='On Leave' />
        </div>
        <div className={style.cardPurple}>

        <Card title='Remote' content='3' icon='Remote' />
      </div>
      </div>
          </div>
          <div className={style.content}>
         
            <div className={style.pieChart}>

              <h2>Employee Status</h2>
              <PieChartComponent data={data} />
              
            </div>
           
            </div>
    </>
  );
};

export default Dashboard;