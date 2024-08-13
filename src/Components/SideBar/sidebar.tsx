import {
  GridView as DashboardIcon,
  GroupOutlined as GroupIcon,
  EventOutlined as EventIcon,
  InfoOutlined as InfoIcon,
  BusinessOutlined as BusinessIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  DevicesOutlined as DevicesIcon,
  GroupAddOutlined as GroupAddIcon,
} from '@mui/icons-material'

import React, { useState } from 'react'
import style from './sidebar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const SideBar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
  isOpen,
  toggleSidebar,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    recruiting: false,
    employee: false,
    events: false,
    assets: false,
  })

const toggleDropdown = (dropdown: keyof typeof dropdownOpen) => {
  setDropdownOpen((prevState) => {
    const newState = { ...prevState };
    Object.keys(newState).forEach((key) => {
      newState[key as keyof typeof dropdownOpen] = false;
    });
    newState[dropdown] = !prevState[dropdown];
    return newState;
  });
};


  return (
    <div className={style.sidebarContainer}>
      <div className={style.toggleButton} onClick={toggleSidebar}>
        <MenuIcon />
      </div>
      <nav
        className={`${style.nav} ${isOpen ? style.navOpen : style.navClosed}`}
      >
        <div className={style.navbar}>
          <div className={style.item}>
            <Link to="/dashboard" className={style.link}>
              <div className={style.iconTextContainer}>
                <DashboardIcon className={style.icon} />
                {isOpen && <span className={style.text}>Dashboard</span>}
              </div>
            </Link>
          </div>
          <div
            className={style.item}
            onClick={() => toggleDropdown('recruiting')}
          >
            <Link to="#recruiting" className={style.link}>
              <div className={style.iconTextContainer}>
                <GroupAddIcon
                  className={style.icon}
                  style={{ marginLeft: '2px' }}
                />
                {isOpen && (
                  <p className={style.text} style={{ marginLeft: '-2px' }}>
                    Recruiting
                  </p>
                )}
              </div>

              {dropdownOpen.recruiting ? (
                <ExpandLessIcon className={style.expandIcon} />
              ) : (
                <ExpandMoreIcon className={style.expandIcon} />
              )}
            </Link>
          </div>
          <div
            className={`${style.dropdownMenu} ${
              dropdownOpen.recruiting ? style.open : style.close
            }`}
          >
            <Link to="/recruitment" className={style.dropdownItem}>
              Recruitment
            </Link>
            <Link to="/candidates" className={style.dropdownItem}>
              Candidates{' '}
            </Link>
            <Link to="/interview" className={style.dropdownItem}>
              Interviews{' '}
            </Link>
          </div>
          <div
            className={style.item}
            onClick={() => toggleDropdown('employee')}
          >
            <Link to="#employee" className={style.link}>
              <div className={style.iconTextContainer}>
                <GroupIcon className={style.icon} />
                {isOpen && <span className={style.text}>Employee</span>}
              </div>
              {dropdownOpen.employee ? (
                <ExpandLessIcon className={style.expandIcon} />
              ) : (
                <ExpandMoreIcon className={style.expandIcon} />
              )}
            </Link>
          </div>
          <div
            className={`${style.dropdownMenu} ${
              dropdownOpen.employee ? style.open : style.close
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
          <div className={style.item} onClick={() => toggleDropdown('assets')}>
            <Link to="#assets" className={style.link}>
              <div className={style.iconTextContainer}>
                <DevicesIcon className={style.icon} />
                {isOpen && <span className={style.text}>Assets</span>}
              </div>
              {dropdownOpen.assets ? (
                <ExpandLessIcon className={style.expandIcon} />
              ) : (
                <ExpandMoreIcon className={style.expandIcon} />
              )}
            </Link>
          </div>
          <div
            className={`${style.dropdownMenu} ${
              dropdownOpen.assets ? style.open : style.close
            }`}
          >
            <Link to="/holdings" className={style.dropdownItem}>
              Holdings
            </Link>
            <Link to="/inventory" className={style.dropdownItem}>
              Inventory
            </Link>
          </div>

          <div className={style.item} onClick={() => toggleDropdown('events')}>
            <Link to="/events" className={style.link}>
              <div className={style.iconTextContainer}>
                <EventIcon className={style.icon} />
                {isOpen && <span className={style.text}>Events</span>}
              </div>
              {dropdownOpen.events ? (
                <ExpandLessIcon className={style.expandIcon} />
              ) : (
                <ExpandMoreIcon className={style.expandIcon} />
              )}
            </Link>
          </div>
          <div
            className={`${style.dropdownMenu} ${
              dropdownOpen.events ? style.open : style.close
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
            <Link to="/structure" className={style.link}>
              <div className={style.iconTextContainer}>
                <BusinessIcon className={style.icon} />
                {isOpen && <span className={style.text}>Structure</span>}
              </div>
            </Link>
          </div>
          <div className={style.item}>
            <Link to="/historic" className={style.link}>
              <div className={style.iconTextContainer}>
                <InfoIcon className={style.icon} />
                {isOpen && <span className={style.text}>About</span>}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SideBar
