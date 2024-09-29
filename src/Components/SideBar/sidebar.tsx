import { useContext, useState, useEffect } from 'react'
import style from './sidebar.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { SidebarHeaderContext } from '@/ProtectedRoute/SidebarHeaderContext'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import {
    Buildings,
    CalendarDots,
    Info,
    Package,
    SquaresFour,
    UserFocus,
    UsersThree,
    CaretUp,
    CaretDown,
} from '@phosphor-icons/react'

export const SideBar = () => {
    const { isSidebarOpen: isOpen } = useContext(SidebarHeaderContext)
    const { currentUser } = useAuth()
    const hr = currentUser?.role === 'hr'
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

    return (
        <div className="sticky inset-0 border-r-2">
            <nav className={`${isOpen ? "flex w-52" : "w-16"}`}>
                <div className={style.navbar}>
                    <div
                        className={`${style.item} ${activeItem === '/dashboard' ? style.active : ''}`}
                        onClick={() => handleItemClick('/dashboard')}
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <SquaresFour className={`size-7`} />
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
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        'transparent')
                                }
                            >
                                <div className={style.link}>
                                    <div className={style.iconTextContainer}>
                                        <UserFocus className={`size-7`} />

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
                                            <CaretUp
                                                className={style.expandIcon}
                                            />
                                        ) : (
                                            <CaretDown
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
                                    onClick={() =>
                                        handleItemClick('/candidates')
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
                                    onClick={() =>
                                        handleItemClick('/interview')
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
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <UsersThree className="size-7" />

                                {isOpen && (
                                    <span className={style.text}>
                                        Employees
                                    </span>
                                )}
                            </div>
                            {isOpen &&
                                (dropdownOpen.employee ? (
                                    <CaretUp className={style.expandIcon} />
                                ) : (
                                    <CaretDown className={style.expandIcon} />
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
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                        >
                            <div className={style.link}>
                                <div className={style.iconTextContainer}>
                                    <Package className="size-7" />

                                    {isOpen && (
                                        <span className={style.text}>
                                            Assets
                                        </span>
                                    )}
                                </div>
                                {isOpen &&
                                    (dropdownOpen.assets ? (
                                        <CaretUp className={style.expandIcon} />
                                    ) : (
                                        <CaretDown
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
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <CalendarDots className="size-7" />

                                {isOpen && (
                                    <span className={style.text}>
                                        Activities
                                    </span>
                                )}
                            </div>
                            {isOpen &&
                                (dropdownOpen.events ? (
                                    <CaretUp className={style.expandIcon} />
                                ) : (
                                    <CaretDown className={style.expandIcon} />
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
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <Buildings className="size-7" />

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
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'transparent')
                        }
                    >
                        <div className={style.link}>
                            <div className={style.iconTextContainer}>
                                <Info className="size-7" />

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
