import Card from '@/Components/Card/Card'
import style from './styles/Events.module.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ModalComponent } from '@/Components/Modal/Modal'
import LongMenu from '@/Components/Menu/Menu'
import SelectedEventCard from './Components/SelectedEvent/SelectedEvent'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Toast from '@/Components/Toast/Toast'
import { EventsProvider, useEvents } from './Context/EventsContext'
import Forms from './Forms/Forms'
import { Tooltip } from '@mui/material'
import { useGetAllEvents } from './Hook'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { EventsData } from './Interface/Events'
import EventsContentLoader from '@/Components/Content/ContentLoader'

function EventsContentAndComponents() {
    const {
        handleDelete,
        handleToastClose,
        handleUpdateToastClose,
        showModal,
        closeModal,
        showEventModal,
        setShowEventModal,
        updateToastMessage,
        updateToastOpen,
        updateToastSeverity,
        toastOpen,
        toastMessage,
        toastSeverity,
        isAdmin,
        eventToDeleteId,
        handleSeeEventDetails,
        handleOpenDrawer,
        formatDate
    } = useEvents()

    const {
        data: events,
        isFetchingNextPage,
        fetchNextPage,
        isLoading,
        onSearchChange,
        searchEvent,
    } = useGetAllEvents()

const { ref, inView } = useInView()


    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Toast
                severity={toastOpen ? toastSeverity : updateToastSeverity}
                open={toastOpen || updateToastOpen}
                message={toastOpen ? toastMessage : updateToastMessage}
                onClose={toastOpen ? handleToastClose : handleUpdateToastClose}
            />
            <Forms />
            <div   style={{
                    display: 'flex',
                    gap: '10px',
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 77,
                }} >
               <Input
                IsUsername
                type="search"
                label="search"
                name="Search"
                width={250}
                iconPosition="end"
                icon={<SearchOutlinedIcon />}
                value={searchEvent}
                onChange={onSearchChange}   
            />
     {isAdmin ? <Button  btnText="Create Event" padding="10px" width="150px" 
     type={ButtonTypes.PRIMARY} onClick={() => handleOpenDrawer('create')} />
                 :  '' }
            </div>
            <div className={style.contanier}>
                <div className={style.grid}>
                    {isLoading ? <EventsContentLoader /> : events?.pages.map((page) =>
                        page.data.map((event: EventsData) => (
                            <Card
                                backgroundColor="rgba(255, 255, 255, 0.7)"
                                key={event._id}
                                borderRadius="5px"
                                border="1px solid #EBEBEB"
                                padding="20px"
                            >
                                <div className={style.titleContainer}>
                                    <div className={style.title}> {event.title} </div>
                                    {isAdmin && <LongMenu event={event} /> }
                                </div>
                                <div className={style.description}>
                                    {event.description}
                                </div>
                                <div className={style.dataContainer}>
                                    <div className={style.dateContainer}>
                                        <div className={style.data}>
                                            <Tooltip title="Date">
                                            <div> <CalendarTodayIcon sx={{ height: 20,idth: 20, color: '#2457a3'}}/> </div>
                                            </Tooltip>
                                            {formatDate(event.startDate)} - {formatDate(event.endDate)}
                                        </div>
                                    </div>
                                    <div className={style.data}>
                                        <Tooltip title="Location">
                                    <div> <LocationOnOutlinedIcon sx={{ height: 20, width: 20, color: '#2457a3'}} /> </div>
                                        </Tooltip>
                                        <div className={style.location}>{event.location}</div>
                                    </div>
                                    <Button
                                        btnText={ isAdmin ? 'See Details' : 'Vote'}
                                        color="#2457a3"
                                        type={ButtonTypes.SECONDARY}
                                        onClick={() =>handleSeeEventDetails(event)}
                                        cursor="pointer"
                                        padding="8px"
                                    />
                                </div>
                            </Card>
                        )),
                    )}
                </div>
                {showModal && (
                    <ModalComponent open={showModal} handleClose={closeModal}>
                        <div className={style.modal}>
                            <div className={style.title}>Confirm Action.</div>
                            <div> Are you sure you want to delete this event?</div>
                            <div className={style.modalCnt}>
                                <Button
                                    type={ButtonTypes.PRIMARY}
                                    backgroundColor="#D32F2F"
                                    borderColor="#D32F2F"
                                    btnText="Confirm"
                                    width="100%"
                                    onClick={() => {
                                        handleDelete(eventToDeleteId)
                                        closeModal()
                                    }}
                                />
                                <Button
                                    type={ButtonTypes.SECONDARY}
                                    btnText="Cancel"
                                    width="100%"
                                    onClick={closeModal}
                                />
                            </div>
                        </div>
                    </ModalComponent>
                )}
                {showEventModal && (
                    <ModalComponent
                        height="100%"
                        width="700px"
                        padding="0"
                        open={showEventModal}
                        handleClose={() => setShowEventModal(false)}
                    >
                        <SelectedEventCard />
                    </ModalComponent>
                )}
            </div>
            <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
        </div>
    )
}
const Events: React.FC = () => {
    return (
        <EventsProvider>
            <EventsContentAndComponents />
        </EventsProvider>
    )
}
export default Events