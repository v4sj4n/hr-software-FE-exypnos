import React ,{useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import style from '../../src/Components/sidebar.module.css'

const SideBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={style.toggleButton} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isOpen ? faBars : faBars} />
            </div>
            {isOpen && (
                <nav className={style.nav}>
                    <div className={style.user}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>

                    <div className={style.navbar}>
                        <div className={style.item}>
                            <a className={style.link} href="/dashboard">Dashboard</a>
                        </div>
                        <div className={style.item}>
                            <a className={style.link} href="/recruiting">Recruiting</a>
                        </div>
                        <Dropdown as="div" className={style.item}>
                            <Dropdown.Toggle as="a" className={style.link} variant="link" id="dropdown-employee">
                                Employee
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={style.dropdownMenu}>
                                <Dropdown.Item className={style.dropdownItem} href="/employee">Employees</Dropdown.Item>
                                <Dropdown.Item className={style.dropdownItem} href="/payroll">Payroll</Dropdown.Item>
                                <Dropdown.Item className={style.dropdownItem} href="/noLeave">On Leave</Dropdown.Item>
                                <Dropdown.Item className={style.dropdownItem} href="/promotion">Promotion</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className={style.item}>
                            <a className={style.link} href="/assets">Assets</a>
                        </div>
                        <div className={style.item}>
                            <a className={style.link} href="/structure">Structure</a>
                        </div>
                        <Dropdown as="div" className={style.item}>
                            <Dropdown.Toggle as="a" className={style.link} variant="link" id="dropdown-events">
                                Events
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={style.dropdownMenu}>
                                <Dropdown.Item className={style.dropdownItem} href="/activities">Activities</Dropdown.Item>
                                <Dropdown.Item className={style.dropdownItem} href="/career">Career</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className={style.item}>
                            <a className={style.link} href="/historic">Historic</a>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default SideBar;