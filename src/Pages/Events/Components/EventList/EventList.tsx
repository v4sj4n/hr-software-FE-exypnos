import { ButtonTypes } from "@/Components/Button/ButtonTypes";
import EventPoll from "../EventPoll/EventsPoll";
import Button from "@/Components/Button/Button";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import style from '../../styles/Events.module.css'
import { EventsData } from "../../Interface/Events";
import { useAuth } from "@/Context/AuthProvider";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface SelectedEventCardProps {
    event: EventsData;
    onClose?: () => void;
    showVotersButton?: boolean;
    onSeeVoters?: () => void;
}

const SelectedEventCard = ({ event, onClose, showVotersButton = false, onSeeVoters }: SelectedEventCardProps) => {
    const { currentUser } = useAuth();

    return (
        < >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div  className={style.title}>{event.title}</div>
                { <CloseOutlinedIcon style={{cursor:"pointer"}}  onClick={onClose} />}
            </div>
            <div className={style.description}>{event.description}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                </div></div>
            {showVotersButton && (
                <Button
                    btnText={currentUser?.role === 'dev' ? "See voters" : "Vote"}
                    type={ButtonTypes.SECONDARY}
                    onClick={onSeeVoters}
                />
            )}
            {!showVotersButton && event.poll && (
                <EventPoll
                    poll={event.poll}
                    eventId={event._id}
                    userId={currentUser?._id}
                />
            )}
        </>
    );
};

export default SelectedEventCard;