import { useState, useCallback, useMemo } from 'react'
import style from './Style/Career.module.css'
import Button from '@/Components/Button/Button'
import { EventsData } from './Interfaces/interface'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import {
    useGetAllEvents,
    useCreateEvent,
    useUpdateEvent,
    useDeleteEvent,
} from './Hook'
import { ModalComponent } from '@/Components/Modal/Modal'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Workers from '/public/Images/happy workers.webp'
import worker3 from '/public/Images/happyWork3.jpeg'
import worker2 from '/public/Images/happyWorkers2.jpg'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext.tsx'
import { Card, Link, Typography } from '@mui/joy'
import { Input } from '@/NewComponents/Inputs/Input'
import { MagnifyingGlass } from '@phosphor-icons/react'

export const Careers = () => {
    const { events, setEvents, isLoading } = useGetAllEvents()
    const { createEvent, handleChange, event, createEventError } =
        useCreateEvent(setEvents)
    const { editingEvent, handleEditChange, updateEvent, setEditingEvent } =
        useUpdateEvent(setEvents)
    const {
        handleDelete,
        closeModal,
        showModal,
        handleDeleteEventModal,
        eventToDeleteId,
    } = useDeleteEvent(setEvents)
    const { currentUser } = useAuth()

    const [showForm, setShowForm] = useState(false)
    const [filter, setFilter] = useState<string>('')

    const toggleForm = useCallback(() => {
        setShowForm((prev) => !prev)
    }, [])

    const handleFilterChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value)
        },
        [],
    )

    const filteredEvents = useMemo(() => {
        return events.filter(
            (event) =>
                event.title.toLowerCase().includes(filter.toLowerCase()) ||
                event.description.toLowerCase().includes(filter.toLowerCase()),
        )
    }, [events, filter])

    const [openDropdown, setOpenDropdown] = useState<string | number | null>(
        null,
    )

    const toggleDropdown = useCallback((eventId: string) => {
        setOpenDropdown((prev) => (prev === eventId ? null : eventId))
    }, [])

    const handleEditClick = useCallback(
        (event: EventsData) => {
            setEditingEvent(event)
            setShowForm(true)
        },
        [setEditingEvent],
    )

    const isAdmin = currentUser?.role === 'hr'

    return (
        <div className={style.body}>
            <div className={style.container}>
                <div className={style.hero}>
                    <h1>Join Our Team</h1>
                    <p>
                        Be part of something bigger. Make a difference in the
                        world of technology.
                    </p>
                </div>

                <div className={style.filter}>
                    <Input
                    type='text'
                    placeholder="Filter by title or description"
                    value={filter}
                    onChange={handleFilterChange}
                    startDecorator={<MagnifyingGlass />}
                    size="lg"
                    variant='outlined'
                    color='primary'
                     />
                </div>

                <div className="flex flex-wrap gap-5">
                    {isLoading ? (
                        <p>Loading events...</p>
                    ) : filteredEvents.length === 0 ? (
                        <p>No event found.</p>
                    ) : (
                        filteredEvents.map((event) => (
                            <Card
                                variant="outlined"
                                color="neutral"
                                key={event._id}
                                className="flex-1"
                            >
                                <Typography level="title-lg" color="primary">
                                    {event.title}
                                </Typography>
                                <Typography level="body-md" color="neutral">
                                    {event.description}
                                </Typography>
                                <Link
                                    component={RouterLink}
                                    to="/recruitment"
                                    color="primary"
                                    className="inline-block"
                                >
                                    Apply
                                </Link>
                            </Card>
                        ))

                        // filteredEvents.map((event) => (
                        //     <div key={event._id} className={style.jobCard}>
                        //         <Card className={style.jobCardContent}>
                        //             <h2>{event.title}</h2>
                        //             <p className={style.description}>
                        //                 {event.description}
                        //             </p>
                        //             <p className={style.location}>
                        //                 {event.location}
                        //             </p>
                        //             <div className={style.actions}>
                        //                 <Link to={'/recruitment'}>Apply</Link>
                        //             </div>
                        //         </Card>
                        //         {isAdmin && (
                        //             <div className={style.dropdownContainer}>
                        //                 <MoreHorizIcon
                        //                     onClick={() =>
                        //                         toggleDropdown(
                        //                             event._id.toString(),
                        //                         )
                        //                     }
                        //                     className={style.moreIcon}
                        //                 />
                        //                 {openDropdown === event._id && (
                        //                     <div className={style.dropdownMenu}>
                        //                         <button
                        //                             onClick={() =>
                        //                                 handleEditClick(event)
                        //                             }
                        //                         >
                        //                             Edit
                        //                         </button>
                        //                         <button
                        //                             onClick={() =>
                        //                                 handleDeleteEventModal(
                        //                                     event._id,
                        //                                 )
                        //                             }
                        //                         >
                        //                             Delete
                        //                         </button>
                        //                     </div>
                        //                 )}
                        //             </div>
                        //         )}
                        //     </div>
                        // ))
                    )}
                </div>

                <ModalComponent open={showForm} handleClose={toggleForm}>
                    <div className={style.eventForm}>
                        <h2>{editingEvent ? 'Edit' : 'Create'}</h2>
                        <form>
                            <input
                                type="text"
                                name="title"
                                value={
                                    editingEvent
                                        ? editingEvent.title
                                        : event.title
                                }
                                onChange={
                                    editingEvent
                                        ? handleEditChange
                                        : handleChange
                                }
                                placeholder="Event Title"
                            />
                            <textarea
                                name="description"
                                value={
                                    editingEvent
                                        ? editingEvent.description
                                        : event.description
                                }
                                onChange={
                                    editingEvent
                                        ? handleEditChange
                                        : handleChange
                                }
                                placeholder="Event Description"
                            />
                            <input
                                type="text"
                                name="location"
                                value={
                                    editingEvent
                                        ? editingEvent.location
                                        : event.location
                                }
                                onChange={
                                    editingEvent
                                        ? handleEditChange
                                        : handleChange
                                }
                                placeholder="Location"
                            />
                            {createEventError && (
                                <p className={style.error}>
                                    {createEventError}
                                </p>
                            )}
                            <div className={style.modalFooter}>
                                <Button
                                    btnText={editingEvent ? 'Update' : 'Create'}
                                    type={ButtonTypes.PRIMARY}
                                    height="40px"
                                    alignItems="center"
                                    width="120px"
                                    onClick={
                                        editingEvent ? updateEvent : createEvent
                                    }
                                />
                                <Button
                                    btnText="Cancel"
                                    height="40px"
                                    alignItems="center"
                                    width="120px"
                                    type={ButtonTypes.SECONDARY}
                                    onClick={toggleForm}
                                />
                            </div>
                        </form>
                    </div>
                </ModalComponent>

                <ModalComponent open={showModal} handleClose={closeModal}>
                    <div>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this event?</p>
                        <div className={style.modalFooter}>
                            <Button
                                type={ButtonTypes.PRIMARY}
                                backgroundColor="#d32f2f"
                                borderColor="#d32f2f"
                                btnText="Confirm"
                                width="100%"
                                onClick={() => handleDelete(eventToDeleteId)}
                            />
                            <Button
                                btnText="Cancel"
                                width="100%"
                                type={ButtonTypes.SECONDARY}
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </ModalComponent>

                <div className={style.culture}>
                    <h2>Our Culture</h2>
                    <p>
                        At our company, we value innovation, collaboration, and
                        growth. Join us and thrive in a supportive and dynamic
                        environment.
                    </p>
                    <div className={style.cultureImages}>
                        <img
                            src={Workers}
                            alt=""
                            className={style.cultureImage}
                        ></img>
                        <img
                            src={worker3}
                            alt=""
                            className={style.cultureImage}
                        ></img>
                        <img
                            src={worker2}
                            alt=""
                            className={style.cultureImage}
                        ></img>
                    </div>
                </div>

                <div className={style.testimonials}>
                    <h2>What Our Employees Say</h2>
                    <p>
                        "This company has provided me with numerous
                        opportunities for growth and development."
                    </p>
                    <p>
                        "I love the collaborative and inclusive culture here."
                    </p>
                </div>

                <div className={style.footer}>
                    <p>
                        &copy; 2024{' '}
                        <a href="https://www.codevider.com/">Codevider. </a>All
                        rights reserved.
                    </p>
                    <p>
                        Follow us on <a href="#">LinkedIn</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Careers
