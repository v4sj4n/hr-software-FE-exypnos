import style from './styles/Events.module.css'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ModalComponent } from '@/Components/Modal/Modal'
import SelectedEventCard from './Components/SelectedEvent/SelectedEvent'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Toast from '@/Components/Toast/Toast'
import Forms from './Forms/Forms'
import { useGetAllEvents } from './Hook'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { EventsData } from './Interface/Events'
import EventsContentLoader from '@/Components/Content/ContentLoader'
import CardContent from './Components/CardContent/CardContent'
import { EventsProvider } from './Context/EventsProvider'
import { useEvents } from './Context/EventsContext'

function EventsContentAndComponents() {
    const {
        handleDelete,
        showModal,
        closeModal,
        showEventModal,
        setShowEventModal,
        isAdmin,
        eventToDeleteId,
        handleSeeEventDetails,
        handleOpenDrawer,
        formatDate,
        severityB,
        openToastB,
        toastMessageB,
        closeToastB,
    } = useEvents()

    const {
        data: events,
        isFetchingNextPage,
        fetchNextPage,
        isLoading,
        onSearchChange,
        searchEvent,
        hasNextPage
    } = useGetAllEvents()

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage])

    return (
        <div className={style.contanier}>
            <Toast
                severity={severityB}
                open={openToastB}
                message={toastMessageB}
                onClose={closeToastB}
            />
            <Forms />
            <div className={style.search}>
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
                {isAdmin ? (
                    <Button
                        btnText="Create Event"
                        padding="10px"
                        width="150px"
                        type={ButtonTypes.PRIMARY}
                        onClick={() => handleOpenDrawer('create')}
                    />
                ) : (
                    ''
                )}
            </div>
            <div className={style.contanier}>
                <div className={style.grid}>
                    {isLoading ? (
                        <EventsContentLoader />
                    ) : (
                        events?.pages.map((page) =>
                            page.data.map((event: EventsData) => (
                                <CardContent
                                    event={event}
                                    formatDate={formatDate}
                                    handleSeeEventDetails={
                                        handleSeeEventDetails
                                    }
                                    isAdmin={isAdmin}
                                />
                            )),
                        )
                    )}
                </div>
                {showModal && (
                    <ModalComponent open={showModal} handleClose={closeModal}>
                        <div className={style.modal}>
                            <div className={style.title}>Confirm Action.</div>
                            <div>
                                {' '}
                                Are you sure you want to delete this event?
                            </div>
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
