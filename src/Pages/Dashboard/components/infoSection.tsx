import style from '../style/infoSection.module.css'
import { EventsData } from '../../Events/Interface/Events'
import dayjs from 'dayjs'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
const InfoSection: React.FC = () => {
    const fetchEventsDashboard = async () => {
        const response = await AxiosInstance.get(`/event`)

        console.log('Fetched eventsDahboardddd:', response.data)
        return response.data
    }

    const { data: events } = useQuery({
        queryKey: ['event'],
        queryFn: () => fetchEventsDashboard(),
    })

    console.log('events', events)

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
                                <h3>{event.title}</h3>
                                <span>
                                    {dayjs(event.startDate).format(
                                        'ddd DD MMM YYYY',
                                    )}
                                </span>
                            </div>
                            <p>{event.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InfoSection
