import React from 'react';
import SideBar from '../../src/Components/sidebar.tsx'
import Header from '../Components/header.tsx';
import Card from './Dashboard/components/card.tsx';
import InfoSection from './Dashboard/components/infoSection.tsx';
import style from '../../src/Pages/Dashboard/style/dashboard.module.css';
import NewApplications from './Dashboard/components/applications.tsx';

const Dashboard:React.FC =()=> {
    return (
        <div className={style.dashboard}>
          <Header />
          <div className={style.layout}>
            
            <SideBar />
            <div className={style.content}>
              <h4>Hi, Elisabeta! Here is what is happening with your team today</h4>
              <div className={style.cardContainer}>
                <Card title='Present' content='20' icon='Present' />
                <Card title='Absent' content='8' icon='Absent'/>
                <Card title='On Leave' content='5'icon='On Leave'  />
                <Card title='Remote' content='3'  icon ='Remote'/>
              </div>
              <div className={style.newApplications}>
            <NewApplications />
          </div>
              <div className={style.infoSection}>
              <InfoSection />

              </div>
            </div>

          </div>

        </div>

      );
    };
    
    

export default Dashboard