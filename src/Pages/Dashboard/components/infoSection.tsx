import style from '../style/infoSection.module.css'
import { EventsData } from '../../Events/Interface/Events'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
import { EventsProvider } from '@/Pages/Events/Context/EventsProvider'
import { useEvents } from '@/Pages/Events/Context/EventsContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
const InfoSectionContent: React.FC = () => {
    const { currentUser } = useAuth()
    const id = currentUser?._id

    const fetchEventsDashboard = async () => {
        const response = await AxiosInstance.get(`/event/user/${id}`)

        console.log('Fetched eventsDahboardddd:', response.data)
        return response.data
    }

    const { data: events } = useQuery({
        queryKey: ['event'],
        queryFn: () => fetchEventsDashboard(),
    })

    console.log('events', events)
    const { formatDate } = useEvents()
    const navigate = useNavigate()
    return (
        <div className={style.infoSection}>
            <h2>Upcoming Events</h2>
            <ul
                style={{
                    padding: 0,
                }}
            >
                {events?.slice(0, 4).map((event: EventsData) => (
                    <li className={style.eventContainer} key={event._id}>
                        <span className={style.blueDot}></span>
                        <div className={style.eventData}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <h3
                                    onClick={() =>
                                        navigate(`/events?event=${event._id}`)
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    {event.title}
                                </h3>
                                <span>{formatDate(event.startDate)}</span>
                            </div>

                            <p className={style.description}>
                                {event.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const InfoSection: React.FC = () => {
    return (
        <EventsProvider>
            <InfoSectionContent />
        </EventsProvider>
    )
}

export default InfoSection
