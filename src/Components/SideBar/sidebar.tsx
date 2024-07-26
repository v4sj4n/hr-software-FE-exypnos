import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Laptop as LaptopIcon,
  Event as EventIcon,
  History as HistoryIcon,
  Business as BusinessIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import React, { useState } from 'react'
import style from './sidebar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const SideBar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
  isOpen,
  toggleSidebar,
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false)
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false)

  const toggleEmployeeDropdown = () => {
    setEmployeeDropdownOpen(!employeeDropdownOpen)
  }
  const toggleEventsDropdown = () => {
    setEventsDropdownOpen(!eventsDropdownOpen)
  }



  return (
    <div>
      <div className={style.toggleButton} onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      <nav
        className={`${style.nav} ${isOpen ? style.navOpen : style.navClosed}`}
      >
        <div className={style.navbar}>
          <div className={style.item}>
            <Link to="/dashboard" className={style.link}>
              <DashboardIcon className={style.icon} />
              {isOpen && <span className={style.text}>Dashboard</span>}
            </Link>
          </div>
          <div className={style.item}>
            <Link to="/recruitment" className={style.link}>
              <GroupAddIcon className={style.icon} />
              {isOpen && <span className={style.text}>Recruiting</span>}
            </Link>
          </div>
          <div className={style.item} onClick={toggleEmployeeDropdown}>
            <Link to="#employee" className={style.link}>
              <GroupIcon className={style.icon} />
              {isOpen && <span className={style.text}>Employee</span>}
              {employeeDropdownOpen ? (
                <ExpandLessIcon className={style.expandIcon} />
              ) : (
                <ExpandMoreIcon className={style.expandIcon} />
              )}
            </Link>
          </div>
          <div
            className={`${style.dropdownMenu} ${
              employeeDropdownOpen ? style.open : ''
            }`}
          >
            <Link to="/employees" className={style.dropdownItem}>
              Employees

            </Link>
 
            <Link to="/payroll" className={style.dropdownItem}>
              Payroll{' '} 
            </Link>
           
            <Link to="/vacation" className={style.dropdownItem}>
              Vacation{' '}
            </Link>
            <Link to="/promotion" className={style.dropdownItem}>
              Promotion{' '}
            </Link>
          </div>
          <div className={style.item}>
            <Link to="/assets" className={style.link}>
              <LaptopIcon className={style.icon} />
              {isOpen && <span className={style.text}>Assets</span>}
            </Link>
          </div>
          <div className={style.item}>
            <Link to="/structure" className={style.link}>
              <BusinessIcon className={style.icon} />
              {isOpen && <span className={style.text}>Structure</span>}
            </Link>
          </div>
          <div className={style.item} onClick={toggleEventsDropdown}>
            <Link to="/events" className={style.link}>
              <EventIcon className={style.icon} />
              {isOpen && <span className={style.text}>Events</span>}
              {eventsDropdownOpen ? (
                <ExpandLessIcon className={style.expandIcon} />
              ) : (
                <ExpandMoreIcon className={style.expandIcon} />
              )}
            </Link>
          </div>
          <div
            className={`${style.dropdownMenu} ${
              eventsDropdownOpen ? style.open : ''
            }`}
          >
            <Link to="/activities" className={style.dropdownItem}>
              Activities
            </Link>
            <Link to="/career" className={style.dropdownItem}>
              Career{' '}
            </Link>
          </div>
          <div className={style.item}>
            <Link to="/historic" className={style.link}>
              <HistoryIcon className={style.icon} />
              {isOpen && <span className={style.text}>Historic</span>}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default SideBar
