import React, { useState } from 'react';
import style from '../style/infoSection.module.css'
interface Event {
  id: number;
  title: string;
  time: string;
  description: string;
}

const InfoSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', time: '10:00 AM', description: 'Weekly team sync' },
    { id: 2, title: 'Project Deadline', time: '3:00 PM', description: 'Submit project report' },
    { id: 4, title: 'Client Call', time: '5:00 PM', description: 'Discuss project updates' },
    { id: 5, title: 'Client Call', time: '3:30 PM', description: 'Discuss project updates' },


  ]);

  const addEvent = () => {
    const newEvent: Event = {
      id: events.length + 1,
      title: 'New Event',
      time: '12:00 PM',
      description: 'Description of the new event',
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className={style.infoSection}>
      <h2>Today's Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <span className={style.redDot}></span>
            <div>
              <strong>{event.title}</strong> - {event.time}<br />
              {event.description}
            </div>
          </li>
        ))}
      </ul>
      <div className={style.button}>
        <button onClick={addEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default InfoSection;
