import codeviderLogo from '../../../Assets/codevider_logo.ico'
import style from '../../../Pages/Dashboard/style/sidebar.module.css'
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar : React.FC = () => {
    return ( 
        <nav className={style.nav}>
            <div className={style.logo}>
                <img alt='logo' src={codeviderLogo}/> 
                </div>
               <ul className={style.navbar}>    
               <li className="item"><a className="link" href="/dashboard">Dashboard</a> </li>
                <li className="item"><a className="link" href="/employee"> Employee </a></li>
                <li className="item"><a className="link" href="/recruiting">Recruting</a></li>
                <li className="item"><a className="link" href="/payroll">Payroll</a></li>
                <li className="item"><a className="link" href="/promotion">Promotion</a></li>
                <li className="item"><a className="link" href="/noLeave">On Leave </a></li>
                <li className="item"><a className="link" href="/assets">Assets</a></li>
                <li className="item"><a className="link" href="/structure">Structure</a></li>
                <li className="item"><a className="link" href="/events">Events</a></li>
                <li className="item"><a className="link" href="/vacancies">Open Vacancies</a></li>
                

            </ul>
        </nav>
    );
};

export default SideBar