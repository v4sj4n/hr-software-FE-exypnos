import React, { useState, useEffect } from 'react'
import style from '../style/infoSection.module.css'
import { useGetAllEvents } from '@/Pages/Events/Hook'
import { EventsData } from '../../Events/Interface/Events'
import dayjs from 'dayjs'

const InfoSection: React.FC = () => {
    const { events } = useGetAllEvents()
    const [recentEvents, setRecentEvents] = useState<EventsData[]>([])

    useEffect(() => {
        const sortedEvents = events.sort(
            (a, b) =>
                new Date(b.creatingTime).getTime() -
                new Date(a.creatingTime).getTime(),
        )

        setRecentEvents(sortedEvents.slice(0, 4))
    }, [events])

    return (
        <div className={style.infoSection}>
            <h2>Upcoming Events</h2>
            <ul
                style={{
                    padding: 0,
                }}
            >
                {recentEvents.length > 0 ? (
                    recentEvents.map((event) => (
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

                                    {dayjs(event.startDate).format(
                                        'ddd DD MMM YYYY',
                                    )}
                                </div>
                                <p>{event.description}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No recent events</li>
                )}
            </ul>
        </div>
    )
}

export default InfoSection
