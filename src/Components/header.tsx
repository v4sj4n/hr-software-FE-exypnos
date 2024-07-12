import { faBell, faCog, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import  style from '../Components/header.module.css'

import  '@fortawesome/fontawesome-svg-core'

const Header: React.FC = () => {
          return (
            <header className={style.header}>
              <div className={style.headerLeft}>
                <h1>CodeVider</h1>
              </div>
              <div className={style.headerRight}>
                <div className={style.icon}>
                <FontAwesomeIcon icon={faBell} />
                <span className="badge">3</span>
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
        
