import { 
    Dashboard as DashboardIcon, 
    Group as GroupIcon, 
    Laptop as LaptopIcon, 
    Event as EventIcon, 
    History as HistoryIcon, 
    Business as BusinessIcon, 
    People as PeopleIcon, 
    Menu as MenuIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import React ,{ useState } from 'react';
import style from '../../src/Components/sidebar.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';



const SideBar: React.FC<{ isOpen: boolean; toggleSidebar: () => void; }> = ({ isOpen, toggleSidebar }) => {
    // const [isOpen, setIsOpen] = useState(true);
    const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };
   

    const toggleEmployeeDropdown = () => {
        setEmployeeDropdownOpen(!employeeDropdownOpen);
    };

    const toggleEventsDropdown = () => {
        setEventsDropdownOpen(!eventsDropdownOpen);
    };

    return (
        <div>
            <div className={style.toggleButton} onClick={toggleSidebar}>
                <MenuIcon />
            </div>
            <nav className={`${style.nav} ${isOpen ? style.navOpen : style.navClosed}`}>
                <div className={style.navbar}>
                    <div className={style.item}>
                        <a className={style.link} href="/dashboard">
                            <DashboardIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Dashboard</span>}
                        </a>
                    </div>
                    <div className={style.item}>
                        <a className={style.link} href="/recruiting">
                            <PeopleIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Recruiting</span>}
                        </a>
                    </div>
                    <div className={style.item} onClick={toggleEmployeeDropdown}>
                        <a className={style.link} href="#employee">
                            <GroupIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Employee</span>}
                            {employeeDropdownOpen ? <ExpandLessIcon className={style.expandIcon} /> : <ExpandMoreIcon className={style.expandIcon} />}
                        </a>
                    </div>
                    <div className={`${style.dropdownMenu} ${employeeDropdownOpen ? style.open : ''}`}>
                        <a className={style.dropdownItem} href="/employee">Employees</a>
                        <a className={style.dropdownItem} href="/payroll">Payroll</a>
                        <a className={style.dropdownItem} href="/noLeave">On Leave</a>
                        <a className={style.dropdownItem} href="/promotion">Promotion</a>
                    </div>
                    <div className={style.item}>
                        <a className={style.link} href="/assets">
                            <LaptopIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Assets</span>}
                        </a>
                    </div>
                    <div className={style.item}>
                        <a className={style.link} href="/structure">
                            <BusinessIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Structure</span>}
                        </a>
                    </div>
                    <div className={style.item} onClick={toggleEventsDropdown}>
                        <a className={style.link} href="#events">
                            <EventIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Events</span>}
                            {eventsDropdownOpen ? <ExpandLessIcon className={style.expandIcon} /> : <ExpandMoreIcon className={style.expandIcon} />}
                        </a>
                    </div>
                    <div className={`${style.dropdownMenu} ${eventsDropdownOpen ? style.open : ''}`}>
                        <a className={style.dropdownItem} href="/activities">Activities</a>
                        <a className={style.dropdownItem} href="/career">Career</a>
                    </div>
                    <div className={style.item}>
                        <a className={style.link} href="/historic">
                            <HistoryIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Historic</span>}
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SideBar;