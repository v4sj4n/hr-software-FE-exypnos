import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import GroupsIcon from '@mui/icons-material/Groups'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import DesktopMacIcon from '@mui/icons-material/DesktopMac'
import style from '@/Pages/Dashboard/style/card.module.css'
import { Card as CardJoy, Typography } from '@mui/joy'

type IconType = 'Present' | 'All' | 'On Leave' | 'Remote'

interface CardProps {
    title: string
    content: string
    icon: IconType
    className?: string
}

const Card: React.FC<CardProps> = ({ title, content, icon }) => {
    const icons = {
        Present: <PersonIcon />,
        All: <GroupsIcon />,
        'On Leave': <WatchLaterIcon />,
        Remote: <DesktopMacIcon />,
    }

    return (
        <CardJoy
            variant="soft"
            color={
                icon === 'Present'
                    ? 'neutral'
                    : icon === 'All'
                      ? 'primary'
                      : icon === 'On Leave'
                        ? 'success'
                        : 'danger'
            }
        >
            <div className={style.cardIcon}>{icons[icon]}</div>
            <Typography level="title-lg">{title}</Typography>
            <Typography level="body-md">{content}</Typography>
        </CardJoy>
    )
}
export default Card
