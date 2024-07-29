import Card from '@/Components/Card/Card'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import style from './styles/Events.module.css'

const DUMMY_EVENTS = [
  {
    id: 1,
    title: 'Company Picnic',
    date: 'June 15, 2023',
    time:"10:00 AM - 4:00 PM",
    location: 'Tirane, Albania',
    description: 'Join us for a fun-filled day at the park!'
  },
  {
    id: 2,
    title: 'Volleyball tournament',
    date: 'June 15, 2023',
    time:"10:00 AM - 4:00 PM",
    location: 'Durres, Albania',
    description: 'Join us for an exciting volleyball tournament in Durres'
  },
  {
    id: 3,
    title: 'Tech Conference',
    date: 'June 15, 2023',
    time:"10:00 AM - 4:00 PM",
    location: 'Tirana, Albania',
    description: 'Explore the latest innovations in technology at our annual conference'
  },
  {
    id: 4,
    title: 'Wine Tasting Festival',
    date: 'June 15, 2023',
    time:"10:00 AM - 4:00 PM",
    location: 'Berat, Albania',
    description: 'Sample exquisite local wines in the historic city of Berat'
  },

 
]
export default function Events() {
  return (
    <div className={style.container}>
      <h1 className={style.account}>Upcoming Events</h1>
      <ul className={style.eventList}>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id} className={style.eventItem}>
            <h2 className={style.title}>{event.title}</h2>
            <p className={style.description}>{event.description}</p>
            <div className={style.dataContainer}>
              <div className={style.data}>
                <AccessTimeIcon sx={{height:20, width:20, color:"#6B7280"}}/>
                {event.time}
              </div>
              <div className={style.data}>
                <CalendarTodayIcon sx={{height:20, width:20, color:"#6B7280"}}/>
                {event.date}
              </div>
              <div className={style.data}>
                <LocationSearchingIcon sx={{height:20, width:20, color:"#6B7280"}}/>
                {event.location}
              </div>
            </div>
            <button className={style.editButton}>
              <AddIcon sx={{height:20, width:20}}/>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}