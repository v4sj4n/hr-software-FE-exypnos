import EventPoll from '../EventPoll/EventsPoll'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import style from './style/Event.module.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import Example from '@/Components/Carosel/Carosel'
import MapComponent from '../GoogleMap/MapPicker'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { useEvents } from '../../Context/EventsContext'

const SelectedEventCard = () => {
    const { currentUser } = useAuth()
    const { selectedEvent, setSelectedEvent, setShowEventModal, formatDate } =
        useEvents()
    const [, setSearchParams] = useSearchParams()

    useEffect(() => {
        console.log('Selected Event:', selectedEvent)
        if (selectedEvent?._id) {
            setSearchParams({ event: selectedEvent._id.toString() })
        } else {
            setSearchParams({})
        }

        return () => {
            setSearchParams({})
        }
    }, [selectedEvent, setSearchParams])

    if (!selectedEvent) {
        return null
    }

    return (
        <div className={style.Wrap}>
            {selectedEvent?.photo && selectedEvent.photo.length > 0 ? (
                <Example images={selectedEvent.photo} />
            ) : (
                ''
            )}
            <div className={style.selectedEvent}>
                <div className={style.flex}>
                    <div className={style.title}>{selectedEvent.title}</div>
                    <CloseOutlinedIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setSelectedEvent(null)
                            setShowEventModal(false)
                        }}
                    />
                </div>
                <div className={style.border}></div>
                <div className={style.descripLabel}>Description</div>
                <div className={style.description}>
                    {selectedEvent.description}
                </div>
                <div className={style.descripLabel}>
                    <div><CalendarTodayIcon
                        sx={{ height: 20, width: 20, color: '#6b7280' }}
                    />
                    </div>
                    <div>Date Range</div>
                </div>
                <div className={style.description}>  {formatDate(selectedEvent.startDate)} -{' '}
                    {formatDate(selectedEvent.endDate)}</div>

     
                    <div className={style.descripLabel}>
                        <div><LocationOnOutlinedIcon
                            sx={{ height: 20, width: 20, color: '#6b7280' }}
                        />
                        </div>
                        <div>Location</div>
                    </div>
                    <div className={style.description}>  {selectedEvent.location}</div>
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <MapComponent
                        onLocationChange={(address, lat, lng) =>
                            console.log(address, lat, lng)
                        }
                        savedLocation={selectedEvent.location}
                        showInput={false}
                    />
                </div>
                {selectedEvent.poll && (
                    <EventPoll
                        poll={selectedEvent.poll}
                        eventId={selectedEvent._id}
                        userId={currentUser?._id}
                    />
                )}
        
        </div>
    )
}

export default SelectedEventCard
