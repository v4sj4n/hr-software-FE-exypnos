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
import { Link, useNavigate } from 'react-router-dom'
import { SidebarHeaderContext } from '@/Context/SidebarHeaderContext'
import { useAuth } from '@/Context/AuthProvider'
import {useTheme} from '@mui/material/styles'
import { alpha } from '@mui/material';


export const SideBar = () => {
    const { isSidebarOpen: isOpen } = useContext(SidebarHeaderContext)
    const { currentUser } = useAuth()


    const hr = currentUser?.role === 'hr'
    const currentUserID = currentUser?._id

    const navigate = useNavigate()

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

    const theme = useTheme();

    const getHoverStyle = (hovered: boolean) => ({
        color: 'black',
        transition: 'color 0.3s ease, background-color 0.3s ease',
        backgroundColor: hovered ?  alpha(theme.palette.background.default, 0.5) : 'black',
    });

    


    return (
        <div className={style.sidebarContainer}>
            <nav className={` ${isOpen ? style.navOpen : style.navClosed}`}>
                <div className={style.navbar}>
                    <div className={style.item}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        
                        <Link to="/dashboard" className={style.link} >
                            <div className={style.iconTextContainer}>
                            <DashboardIcon className={style.icon} style={{ color: theme.palette.text.primary }} />
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
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => toggleDropdown('recruiting')}
                    >
                        <div className={style.link} > 
                            <div className={style.iconTextContainer} >
                            <GroupAddIcon className={style.icon} style={{ color: theme.palette.text.primary, marginLeft: '2px' }} />

                                
                                {isOpen && (
                                    <span 
                                        className={style.text}
                                        style={{marginLeft: '-2px' }}
                                    >
                                        Recruiting
                                    </span>
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
                        </div>
                    </div>
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.recruiting ? style.open : style.close
                        }`}
                    >
                        <Link to="/candidates" className={style.dropdownItem} >
                        
                            Candidates{' '}
                        </Link>
                        <Link to="/interview" className={style.dropdownItem} >
                            Interviews{' '}
                        </Link>
                    </div>
                    <div
                        className={style.item }
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => toggleDropdown('employee')}
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <GroupIcon className={style.icon} style={{ color: theme.palette.text.primary, marginLeft: '2px' }} />
                                
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
                        </div>
                    </div>
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.employee ? style.open : style.close
                        }`}
                    >
                        <Link to="/employees" className={style.dropdownItem}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}> 
                            Employees
                        </Link>
                        <Link to="/payroll" className={style.dropdownItem}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            Payroll{' '}
                        </Link>
                        <Link to="/vacation" className={style.dropdownItem}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            Vacation{' '}
                        </Link>
                        <div
                            onClick={() => {
                                hr ? navigate('promotion') : navigate(`/promotion/${currentUserID}` );
                            }}
                            className={style.dropdownItem}
                        >
                            Promotion
                        </div>
                    </div>
                    <div
                        className={style.item} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => toggleDropdown('assets')}
                    >
                        <div className={style.link} >
                            <div className={style.iconTextContainer} >
                                <DevicesIcon className={style.icon} style={{ color: theme.palette.text.primary, marginLeft: '2px' }} />
                                
                                {isOpen && (
                                    <span className={style.text} >Assets</span>
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
                        </div>
                    </div>
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.assets ? style.open : style.close
                        }`}
                    >
                        <Link to="/holdings" className={style.dropdownItem}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} >
                            Holdings
                        </Link>
                        <Link to="/inventory" className={style.dropdownItem}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} >
                            Inventory
                        </Link>
                    </div>

                    <div
                        className={style.item} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => toggleDropdown('events')}
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <EventIcon className={style.icon}style={{ color: theme.palette.text.primary, marginLeft: '2px' }} />
                                
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
                        </div>
                    </div>
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.events ? style.open : style.close
                        }`}
                    >
                        <Link to="/events" className={style.dropdownItem} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            Events
                        </Link>
                        <Link to="/career" className={style.dropdownItem} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}> 
                            Career{' '}
                        </Link>
                    </div>
                    <div className={style.item} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <Link to="/structure" className={style.link}>
                            <div className={style.iconTextContainer}>
                                <BusinessIcon className={style.icon}style={{ color: theme.palette.text.primary, marginLeft: '2px' }} />
                                
                                {isOpen && (
                                    <span className={style.text}>
                                        Structure
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className={style.item} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.background.default, 0.5)}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <Link to="/historic" className={style.link} >
                            <div className={style.iconTextContainer}>
                                <InfoIcon className={style.icon}  style={{ color: theme.palette.text.primary, marginLeft: '2px' }} />
                                
                                {isOpen && (
                                    <span className={style.text}>About</span>
                                )}
                            </div>
                        </Link>
                    </div>
                    <div></div>
                </div>
            </nav>
        </div>
    )
}
