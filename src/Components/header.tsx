import { faBell, faCog, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import codeviderLogo from '../Assets/logocodevider.png'
import  style from '../Components/header.module.css'

import  '@fortawesome/fontawesome-svg-core'

const Header: React.FC = () => {
          return (
            <header className={style.header}>
              <div className={style.headerLeft}>
                <div className={style.logo}>
                <img alt='logo' src={codeviderLogo} />
              </div>
                
              </div>
              <div className={style.headerRight}>
                <div className={style.icon}>
                <FontAwesomeIcon icon={faBell} />
                <span className={style.badge}>3</span>
                </div>
                <div className={style.icon}>
                <FontAwesomeIcon icon={faCog} />
                </div>
                <div className={style.icon}>
                <FontAwesomeIcon icon={faUser} />
                 <span className={style.username}> Profile </span>
                </div>
                
              </div>
            </header>
          );
        }
        
        export default Header;
        
