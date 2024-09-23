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
import { useContext, useState, useEffect } from 'react'
import style from './sidebar.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { SidebarHeaderContext } from '@/ProtectedRoute/SidebarHeaderContext'
import { useTheme } from '@mui/material/styles'
import { alpha } from '@mui/material'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'

export const SideBar = () => {
    const { isSidebarOpen: isOpen } = useContext(SidebarHeaderContext)
    const { currentUser } = useAuth()
    const hr = currentUser?.role === 'hr'
    const currentUserID = currentUser?._id
    const navigate = useNavigate()
    const location = useLocation()
    const [activeItem, setActiveItem] = useState('')

    const [dropdownOpen, setDropdownOpen] = useState({
        recruiting: false,
        employee: false,
        events: false,
        assets: false,
    })

    useEffect(() => {
        setActiveItem(location.pathname)
    }, [location])

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

    const handleItemClick = (path: string) => {
        setActiveItem(path)
        navigate(path)
    }

    const theme = useTheme()

    return (
        <div className={style.sidebarContainer}>
            <nav className={`${isOpen ? style.navOpen : style.navClosed}`}>
                <div className={style.navbar}>
                    <div
                        className={`${style.item} ${activeItem === '/dashboard' ? style.active : ''}`}
                        onClick={() => handleItemClick('/dashboard')}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = alpha(
                                theme.palette.background.default,
                                0.5,
                            ))
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <DashboardIcon
                                    className={style.icon}
                                    style={{
                                        color: theme.palette.text.primary,
                                    }}
                                />
                                {isOpen && (
                                    <span className={style.text}>
                                        Dashboard
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {hr && (
                        <>
                            <div
                                className={`${style.item} ${activeItem.startsWith('/recruiting') ? style.active : ''}`}
                                onClick={() => toggleDropdown('recruiting')}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        alpha(
                                            theme.palette.background.default,
                                            0.5,
                                        ))
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        'transparent')
                                }
                            >
                                <div className={style.link}>
                                    <div className={style.iconTextContainer}>
                                        <GroupAddIcon
                                            className={style.icon}
                                            style={{
                                                color: theme.palette.text
                                                    .primary,
                                                marginLeft: '2px',
                                            }}
                                        />

                                        {isOpen && (
                                            <span
                                                className={style.text}
                                                style={{ marginLeft: '-2px' }}
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
                                    dropdownOpen.recruiting
                                        ? style.open
                                        : style.close
                                }`}
                            >
                                <div
                                    className={`${style.dropdownItem} ${activeItem === '/candidates' ? style.active : ''}`}
                                    onClick={() => handleItemClick('/candidates')}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            alpha(
                                                theme.palette.background
                                                    .default,
                                                0.5,
                                            ))
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            'transparent')
                                    }
                                >
                                    Candidates
                                </div>
                                <div
                                    className={`${style.dropdownItem} ${activeItem === '/interview' ? style.active : ''}`}
                                    onClick={() => handleItemClick('/interview')}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            alpha(
                                                theme.palette.background
                                                    .default,
                                                0.5,
                                            ))
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            'transparent')
                                    }
                                >
                                    Interviews
                                </div>
                            </div>
                        </>
                    )}

                    <div
                        className={`${style.item} ${activeItem.startsWith('/employee') ? style.active : ''}`}
                        onClick={() => toggleDropdown('employee')}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = alpha(
                                theme.palette.background.default,
                                0.5,
                            ))
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <GroupIcon
                                    className={style.icon}
                                    style={{
                                        color: theme.palette.text.primary,
                                        marginLeft: '2px',
                                    }}
                                />

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
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/employees' ? style.active : ''}`}
                            onClick={() => handleItemClick('/employees')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Employees
                        </div>
                        {hr && (
                            <div
                                className={`${style.dropdownItem} ${activeItem === '/payroll' ? style.active : ''}`}
                                onClick={() => handleItemClick('/payroll')}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = alpha(
                                        theme.palette.background.default,
                                        0.5,
                                    ))
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        'transparent')
                                }
                            >
                                Payroll
                            </div>
                        )}
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/vacation' ? style.active : ''}`}
                            onClick={() => handleItemClick('/vacation')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Vacation
                        </div>
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/promotion' ? style.active : ''}`}
                            onClick={() => handleItemClick('/promotion')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Promotion
                        </div>
                    </div>
                    {hr && (

                    <div
                        className={`${style.item} ${activeItem.startsWith('/assets') ? style.active : ''}`}
                        onClick={() => toggleDropdown('assets')}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = alpha(
                                theme.palette.background.default,
                                0.5,
                            ))
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <DevicesIcon
                                    className={style.icon}
                                    style={{
                                        color: theme.palette.text.primary,
                                        marginLeft: '2px',
                                    }}
                                />

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
                        </div>
                    </div>
                    )}
                    <div
                        className={`${style.dropdownMenu} ${
                            dropdownOpen.assets ? style.open : style.close
                        }`}
                    >
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/holdings' ? style.active : ''}`}
                            onClick={() => handleItemClick('/holdings')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Holdings
                        </div>
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/inventory' ? style.active : ''}`}
                            onClick={() => handleItemClick('/inventory')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Inventory
                        </div>
                    </div>

                    <div
                        className={`${style.item} ${activeItem.startsWith('/activities') ? style.active : ''}`}
                        onClick={() => toggleDropdown('events')}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = alpha(
                                theme.palette.background.default,
                                0.5,
                            ))
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <EventIcon
                                    className={style.icon}
                                    style={{
                                        color: theme.palette.text.primary,
                                        marginLeft: '2px',
                                    }}
                                />

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
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/events' ? style.active : ''}`}
                            onClick={() => handleItemClick('/events')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Events
                        </div>
                        <div
                            className={`${style.dropdownItem} ${activeItem === '/career' ? style.active : ''}`}
                            onClick={() => handleItemClick('/career')}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = alpha(
                                    theme.palette.background.default,
                                    0.5,
                                ))
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            Career
                        </div>
                    </div>

                    <div
                        className={`${style.item} ${activeItem === '/structure' ? style.active : ''}`}
                        onClick={() => handleItemClick('/structure')}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = alpha(
                                theme.palette.background.default,
                                0.5,
                            ))
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <BusinessIcon
                                    className={style.icon}
                                    style={{
                                        color: theme.palette.text.primary,
                                        marginLeft: '2px',
                                    }}
                                />

                                {isOpen && (
                                    <span className={style.text}>
                                        Structure
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${style.item} ${activeItem === '/historic' ? style.active : ''}`}
                        onClick={() => handleItemClick('/historic')}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = alpha(
                                theme.palette.background.default,
                                0.5,
                            ))
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <InfoIcon
                                    className={style.icon}
                                    style={{
                                        color: theme.palette.text.primary,
                                        marginLeft: '2px',
                                    }}
                                />

                                {isOpen && (
                                    <span className={style.text}>About</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}


