import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Card from '@/Components/Card/Card'
import LongMenu from '@/Components/Menu/Menu'
import style from '../../styles/Events.module.css'
import { EventsData } from '../../Interface/Events'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Tooltip } from '@mui/material'

interface CardContentProps {
    event: EventsData;
    formatDate: (date: string) => string;
    isAdmin: boolean;
    handleSeeEventDetails: (event: EventsData) => void;
  }

  export default function CardContent({ event, formatDate, isAdmin, handleSeeEventDetails }: CardContentProps) {

    return (
        <div>
            <Card
                backgroundColor="rgba(255, 255, 255, 0.7)"
                key={event._id}
                borderRadius="5px"
                border="1px solid #EBEBEB"
                padding="20px"
            >
                <div className={style.titleContainer}>
                    <div className={style.title}> {event.title} </div>
                    {isAdmin && <LongMenu event={event} />}
                </div>
                <div className={style.description}>
                    {event.description}
                </div>
                <div className={style.dataContainer}>
                    <div className={style.dateContainer}>
                        <div className={style.data}>
                            <Tooltip title="Date">
                                <div> <CalendarTodayIcon sx={{ height: 20, idth: 20, color: '#2457a3' }} /> </div>
                            </Tooltip>
                            {formatDate(event.startDate)} - {formatDate(event.endDate)}
                        </div>
                    </div>
                    <div className={style.data}>
                        <Tooltip title="Location">
                            <div> <LocationOnOutlinedIcon sx={{ height: 20, width: 20, color: '#2457a3' }} /> </div>
                        </Tooltip>
                        <div className={style.location}>{event.location}</div>
                    </div>
                    <Button
                        btnText={isAdmin ? 'See Details' : 'Vote'}
                        color="#2457a3"
                        type={ButtonTypes.SECONDARY}
                        onClick={() => handleSeeEventDetails(event)}
                        cursor="pointer"
                        padding="8px"
                    />
                </div>
            </Card>
        </div>
    )
}
