import EventPoll from "../EventPoll/EventsPoll";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import style from '../../styles/Events.module.css'
import { EventsData } from "../../Interface/Events";
import { useAuth } from "@/Context/AuthProvider";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import image from "../../../../../public/Images/background (1).png"

interface SelectedEventCardProps {
    event: EventsData;
    onClose?: () => void;
    showVotersButton?: boolean;
    onSeeVoters?: () => void;
}

const SelectedEventCard = ({ event, onClose, showVotersButton = false }: SelectedEventCardProps) => {
    const { currentUser } = useAuth();

    return (
        <div className={style.Wrap}>
            <img src={image} alt="Event" className={style.img} />
            <div style={{ gap: "10px", padding: "5px 15px 15px 15px", width:"100%" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={style.title}>{event.title}</div>
                    {<CloseOutlinedIcon style={{ cursor: "pointer" }} onClick={onClose} />}
                </div>
                <div className={style.description}>{event.description}</div>
                <div className={style.dataContainer}>
                    <div className={style.dateContainer}>
                        <div className={style.data}>
                            <AccessTimeIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                            {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className={style.data}>
                            <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>

                    <div className={style.data}>
                        <LocationSearchingIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                        <div>{event.location}</div>
                    </div>
                    </div>
                {!showVotersButton && event.poll && (
                    <EventPoll
                        poll={event.poll}
                        eventId={event._id}
                        userId={currentUser?._id}
                    />
                )}
            </div>
        </div>
    );
};

export default SelectedEventCard;