import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import DesktopMacIcon from '@mui/icons-material/DesktopMac'
import style from '@/Pages/Dashboard/style/card.module.css'

type IconType = 'Present' | 'Absent' | 'On Leave' | 'Remote'

interface CardProps {
    title: string
    content: string
    icon: IconType
    className?: string
}

const Card: React.FC<CardProps> = ({ title, content, icon }) => {
    const icons = {
        Present: <PersonIcon />,
        Absent: <PersonOffIcon />,
        'On Leave': <WatchLaterIcon />,
        Remote: <DesktopMacIcon />,
    }

    return (
        <div className={style.card}>
            <div className={style.cardIcon}>{icons[icon]}</div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    )
}

export default Card
