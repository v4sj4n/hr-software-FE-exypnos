import {
    GridView as DashboardIcon,
    GroupOutlined as GroupIcon,
    EventOutlined as EventIcon,
    InfoOutlined as InfoIcon,
    BusinessOutlined as BusinessIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    DevicesOutlined as DevicesIcon,
    GroupAddOutlined as GroupAddIcon,
} from '@mui/icons-material'

import { useContext, useState } from 'react'
import style from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { SidebarHeaderContext } from '@/Context/SidebarHeaderContext'

export const SideBar = () => {
    const { isSidebarOpen: isOpen } = useContext(SidebarHeaderContext)

    const [dropdownOpen, setDropdownOpen] = useState({
        recruiting: false,
        employee: false,
        events: false,
        assets: false,
    })

    const toggleDropdown = (dropdown: keyof typeof dropdownOpen) => {
        setDropdownOpen((prevState) => {
            const newState = { ...prevState }
            Object.keys(newState).forEach((key) => {
                newState[key as keyof typeof dropdownOpen] = false
            })
            newState[dropdown] = !prevState[dropdown]
            return newState
        })
    }

    return (
        <div className={style.sidebarContainer}>
            <nav className={` ${isOpen ? style.navOpen : style.navClosed}`}>
                <div className={style.navbar}>
                    <div className={style.item}>
                        <Link to="/dashboard" className={style.link}>
                            <div className={style.iconTextContainer}>
                                <DashboardIcon className={style.icon} />
                                {isOpen && (
                                    <span className={style.text}>
                                        Dashboard
                                    </span>
                                )}
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
                                    <p
                                        className={style.text}
                                        style={{ marginLeft: '-2px' }}
                                    >
                                        Recruiting
                                    </p>
                                )}
                            </div>
                            {isOpen &&
                                (dropdownOpen.recruiting ? (
                                    <ExpandLessIcon
                                        className={style.expandIcon}
                                    />
                                ) : (
                                    <ExpandMoreIcon
                                        className={style.expandIcon}
                                    />
                                ))}
                        </Link>
                    </div>
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.recruiting ? style.open : style.close
                        }`}
                    >
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
                                {isOpen && (
                                    <span className={style.text}>Employee</span>
                                )}
                            </div>
                            {isOpen &&
                                (dropdownOpen.employee ? (
                                    <ExpandLessIcon
                                        className={style.expandIcon}
                                    />
                                ) : (
                                    <ExpandMoreIcon
                                        className={style.expandIcon}
                                    />
                                ))}
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
                    <div
                        className={style.item}
                        onClick={() => toggleDropdown('assets')}
                    >
                        <Link to="#assets" className={style.link}>
                            <div className={style.iconTextContainer}>
                                <DevicesIcon className={style.icon} />
                                {isOpen && (
                                    <span className={style.text}>Assets</span>
                                )}
                            </div>
                            {isOpen &&
                                (dropdownOpen.assets ? (
                                    <ExpandLessIcon
                                        className={style.expandIcon}
                                    />
                                ) : (
                                    <ExpandMoreIcon
                                        className={style.expandIcon}
                                    />
                                ))}
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

                    <div
                        className={style.item}
                        onClick={() => toggleDropdown('events')}
                    >
                        <Link to="#events" className={style.link}>
                            <div className={style.iconTextContainer}>
                                <EventIcon className={style.icon} />
                                {isOpen && (
                                    <span className={style.text}>
                                        Activities
                                    </span>
                                )}
                            </div>
                            {isOpen &&
                                (dropdownOpen.events ? (
                                    <ExpandLessIcon
                                        className={style.expandIcon}
                                    />
                                ) : (
                                    <ExpandMoreIcon
                                        className={style.expandIcon}
                                    />
                                ))}
                        </Link>
                    </div>
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.events ? style.open : style.close
                        }`}
                    >
                        <Link to="/events" className={style.dropdownItem}>
                            Events
                        </Link>
                        <Link to="/career" className={style.dropdownItem}>
                            Career{' '}
                        </Link>
                    </div>
                    <div className={style.item}>
                        <Link to="/structure" className={style.link}>
                            <div className={style.iconTextContainer}>
                                <BusinessIcon className={style.icon} />
                                {isOpen && (
                                    <span className={style.text}>
                                        Structure
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className={style.item}>
                        <Link to="/historic" className={style.link}>
                            <div className={style.iconTextContainer}>
                                <InfoIcon className={style.icon} />
                                {isOpen && (
                                    <span className={style.text}>About</span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
