import React, { useState, useEffect } from 'react';
import style from '../style/infoSection.module.css';
import { useGetAllEvents } from '@/Pages/Events/Hook';
import {EventsData} from '../../Events/Interface/Events'

const InfoSection: React.FC = () => {
  const { events } = useGetAllEvents();
  const [recentEvents, setRecentEvents] = useState<EventsData[]>([]);

  useEffect(() => {
    const sortedEvents = events.sort((a, b) => new Date(b.creatingTime).getTime() - new Date(a.creatingTime).getTime());
    
    setRecentEvents(sortedEvents.slice(0, 3));
  }, [events]);

  return (
    <div className={style.infoSection}>
      <h2>Upcoming Events</h2>
      <ul>
        {recentEvents.length > 0 ? recentEvents.map(event => (
          <li key={event._id}>
            <span className={style.redDot}></span>
            <div>
              <strong>{event.title}</strong> - {new Date(event.startDate).toLocaleString()}<br />
              {event.description}
            </div>
          </li>
        )) : <li>No recent events</li>}
      </ul>
    </div>
  );
};

export default InfoSection;