import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTimes, faUserClock, faDesktop } from '@fortawesome/free-solid-svg-icons';
import style from '../style/card.module.css';

type IconType = 'Present' | 'Absent' | 'On Leave' | 'Remote';
interface CardProps {
    title: string;
    content: string;
    icon: IconType;
}

const Card: React.FC<CardProps> = ({ title, content, icon }) => {
    const icons = {
        'Present': faUser,
        'Absent': faUserTimes,
        'On Leave': faUserClock,
        'Remote': faDesktop
    };

    return (
        <div className={style.card}>
            <h2>{title}</h2>
            <p>{content}</p>
            <div className={style.cardIcon}>
                {icon && <FontAwesomeIcon icon={icons[icon]} />}
            </div>
        </div>
    );
};

export default Card;