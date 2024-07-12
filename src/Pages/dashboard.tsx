import React from 'react';

import Header from '../Components/header.tsx';
import Card from './Dashboard/components/card.tsx';
import InfoSection from './Dashboard/components/infoSection.tsx';
import SideBar from './Dashboard/components/sidebar.tsx';

const Dashboard:React.FC =()=> {
    return (
        <div className="dashboard">
          <Header />
          <div className='layout'>
            <SideBar />
            <div className='content'>
              <h4>Hi, Elisabeta! Here is what is happening with your team today</h4>
              <div className='card-container'>
                <Card title='Present' content='20' icon='Present' />
                <Card title='Absent' content='8' icon='Absent'/>
                <Card title='On Leave' content='5'icon='On Leave'  />
                <Card title='Remote' content='3'  icon ='Remote'/>
              </div>
              <InfoSection />
            </div>
          </div>
        </div>
      );
    };
    
    

export default Dashboard