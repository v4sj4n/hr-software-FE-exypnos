import EventPoll from "../EventPoll/EventsPoll";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import style from '../../styles/Events.module.css'
import { EventsData } from "../../Interface/Events";
import { useAuth } from "@/Context/AuthProvider";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Example from "@/Components/Carosel/Carosel";

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
              <Example images={event.photo} />
            <div style={{ gap: "10px", padding: "5px 15px 15px 15px", width:"100%" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={style.title}>{event.title}</div>
                    {<CloseOutlinedIcon style={{ cursor: "pointer" }} onClick={onClose} />}
                </div>
                <div className={style.description}>{event.description}</div>
                <div className={style.dataContainer}>
                    <div className={style.dateContainer}>
                        <div className={style.data}>
                            <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                            {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className={style.data}>
                            <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                            {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>

                    <div className={style.data} style={{marginBottom:"10px"}}>
                        <LocationOnOutlinedIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
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