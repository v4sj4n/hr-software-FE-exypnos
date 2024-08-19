import EventPoll from '../EventPoll/EventsPoll'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import style from '../../styles/Events.module.css'
import { useAuth } from '@/Context/AuthProvider'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import Example from '@/Components/Carosel/Carosel'
import { useEvents } from '../../Context/EventsContext'

interface SelectedEventCardProps {
    showVotersButton?: boolean
    onSeeVoters?: () => void
}

const SelectedEventCard = ({
    showVotersButton = false,
}: SelectedEventCardProps) => {
    const { currentUser } = useAuth()

    const { selectedEvent, setSelectedEvent } = useEvents()

    if (!selectedEvent) {
        return null
    }

    
    return (
        <div className={style.Wrap}>
            <Example images={selectedEvent.photo} />
            <div
                style={{
                    gap: '10px',
                    padding: '5px 15px 15px 15px',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div className={style.title}>{selectedEvent.title}</div>
                    {
                        <CloseOutlinedIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => setSelectedEvent(null)}
                        />
                    }
                </div>
                <div className={style.description}>{selectedEvent.description}</div>
                <div className={style.dataContainer}>
                    <div className={style.dateContainer}>
                        <div className={style.data}>
                            <CalendarTodayIcon
                                sx={{ height: 20, width: 20, color: '#6b7280' }}
                            />
                            {new Date(selectedEvent.startDate).toLocaleDateString(
                                'en-US',
                                {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                },
                            )}
                        </div>
                        <div className={style.data}>
                            <CalendarTodayIcon
                                sx={{ height: 20, width: 20, color: '#6b7280' }}
                            />
                            {new Date(selectedEvent.endDate).toLocaleDateString(
                                'en-US',
                                {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                },
                            )}
                        </div>
                    </div>

                    <div
                        className={style.data}
                        style={{ marginBottom: '10px' }}
                    >
                        <LocationOnOutlinedIcon
                            sx={{ height: 20, width: 20, color: '#6b7280' }}
                        />
                        <div>{selectedEvent.location}</div>
                    </div>
                </div>
                {!showVotersButton && selectedEvent.poll && (
                    <EventPoll
                        poll={selectedEvent.poll}
                        eventId={selectedEvent._id}
                        userId={currentUser?._id}
                    />
                )}
            </div>
        </div>
    )
}

export default SelectedEventCard
