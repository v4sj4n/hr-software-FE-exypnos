import { useState } from 'react'
import style from './Style/Career.module.css'
import Button from '@/Components/Button/Button'

import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import {
    useGetAllEvents,
    useCreateEvent,
    useUpdateEvent,
    useDeleteEvent,
    EventsData,
} from './Hook'
import { ModalComponent } from '@/Components/Modal/Modal'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useAuth } from '@/Context/AuthProvider'
import Workers from '/public/Images/happy workers.webp'
import worker3 from '/public/Images/happyWork3.jpeg'
import worker2 from '/public/Images/happyWorkers2.jpg'
import { Link } from 'react-router-dom'

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

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    const filteredEvents = events.filter(
        (event) =>
            event.title.toLowerCase().includes(filter.toLowerCase()) ||
            event.description.toLowerCase().includes(filter.toLowerCase()),
    )

    const [openDropdown, setOpenDropdown] = useState<string | number | null>(
        null,
    )

    const toggleDropdown = (eventId: string) => {
        if (openDropdown === eventId) {
            setOpenDropdown(null)
        } else {
            setOpenDropdown(eventId)
        }
    }

    const handleEditClick = (event: EventsData) => {
        setEditingEvent(event)
        setShowForm(true)
    }
    const isAdmin = currentUser?.role === 'admin'

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
                    <input
                        type="text"
                        placeholder="Filter by title or description"
                        value={filter}
                        onChange={handleFilterChange}
                        className={style.filterInput}
                    />
                </div>

                {/* {isAdmin ? (
                    <div className={style.createButton}>
                        <Button
                            btnText="New Job"
                            color="#007bff"
                            backgroundColor="white"
                            type={ButtonTypes.PRIMARY}
                            onClick={toggleForm}
                        />
                    </div>
                ) : (
                    ''
                )} */}

                <div className={style.jobList}>
                    {isLoading ? (
                        <p>Loading events...</p>
                    ) : filteredEvents.length === 0 ? (
                        <p>We did not find what you are looking for.</p>
                    ) : (
                        filteredEvents.map((event) => (
                            <div key={event._id} className={style.jobCard}>
                                <div className={style.jobCardContent}>
                                    <h2>{event.title}</h2>
                                    <p className={style.description}>
                                        {event.description}
                                    </p>
                                    <p className={style.location}>
                                        {event.location}
                                    </p>
                                    <div className={style.actions}>
                                        <Link to={'/recruitment'}>Apply</Link>
                                    </div>
                                </div>
                                {isAdmin ? (
                                    <div className={style.dropdownContainer}>
                                        <MoreHorizIcon
                                            onClick={() =>
                                                toggleDropdown(
                                                    event._id.toString(),
                                                )
                                            }
                                            className={style.moreIcon}
                                        />
                                        {openDropdown === event._id && (
                                            <div className={style.dropdownMenu}>
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(event)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteEventModal(
                                                            event._id,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ))
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
