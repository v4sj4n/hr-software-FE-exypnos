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
import style from './sidebar.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const SideBar: React.FC<{ isOpen: boolean; toggleSidebar: () => void; }> = ({ isOpen, toggleSidebar }) => {
    // const [isOpen, setIsOpen] = useState(true);
    const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

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
                        <Link to= "/dashboard" className={style.link} >
                            <DashboardIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Dashboard</span>}
                        </Link>
                    </div>
                    <div className={style.item}>
                        <Link to="/recruitment" className={style.link} >
                            <PeopleIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Recruiting</span>}
                        </Link>
                    </div>
                    <div className={style.item} onClick={toggleEmployeeDropdown}>
                        <Link to="#employee" className={style.link} >
                            <GroupIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Employee</span>}
                            {employeeDropdownOpen ? <ExpandLessIcon className={style.expandIcon} /> : <ExpandMoreIcon className={style.expandIcon} />}
                        </Link>
                    </div>
                    <div className={`${style.dropdownMenu} ${employeeDropdownOpen ? style.open : ''}`}>
                        <Link to="/employees">Employees className={style.dropdownItem} </Link>
                        <Link to="/payroll">Payroll className={style.dropdownItem} </Link>
                        <Link  to="/noLeave">On Leave className={style.dropdownItem}</Link>
                        <Link to="/promotion">Promotion className={style.dropdownItem} </Link>
                    </div>
                    <div className={style.item}>
                        <Link to="/assets" className={style.link} >
                            <LaptopIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Assets</span>}
                        </Link>
                    </div>
                    <div className={style.item}>
                        <Link  to="/structure" className={style.link}>
                            <BusinessIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Structure</span>}
                        </Link>
                    </div>
                    <div className={style.item} onClick={toggleEventsDropdown}>
                        <Link to="#events" className={style.link} >
                            <EventIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Events</span>}
                            {eventsDropdownOpen ? <ExpandLessIcon className={style.expandIcon} /> : <ExpandMoreIcon className={style.expandIcon} />}
                        </Link>
                    </div>
                    <div className={`${style.dropdownMenu} ${eventsDropdownOpen ? style.open : ''}`}>
                        <Link  to="/activities">Activities className={style.dropdownItem}</Link>
                        <Link  to="/career">Career className={style.dropdownItem}</Link>
                    </div>
                    <div className={style.item}>
                        <Link to="/historic" className={style.link} >
                            <HistoryIcon className={style.icon} />
                            {isOpen && <span className={style.text}>Historic</span>}
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default SideBar;