import Card from '@/Components/Card/Card';
import style from './styles/Events.module.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Input from '@/Components/Input/Index';
import Button from '@/Components/Button/Button';
import { EventsContent } from '@/Components/Content/ContentLoader';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalComponent } from '@/Components/Modal/Modal';
import LongMenu from '@/Components/Menu/Menu';
import SelectedEventCard from './Components/SelectedEvent/SelectedEvent';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Toast from '@/Components/Toast/Toast';
import DrawerComponent from '@/Components/Drawer/Drawer';
import { EventsProvider, useEvents } from './Context/EventsContext';
 function EventsContentAndComponents() {

  const {
    events,
    isLoading,
    onSearchChange,
    handleDelete,
    handleToastClose,
    handleUpdateToastClose,
    showModal,
    closeModal,
    handleDeleteEventModal,
    showEventModal,
    setShowEventModal,
    selectedEvent,
    setSelectedEvent,
    updateToastMessage,
    updateToastOpen,
    updateToastSeverity,
    toastOpen,
    toastMessage,
    toastSeverity,
    endDate,
    isAdmin,
    eventToDeleteId,
    handleSeeVoters,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer
  } = useEvents();

  return (
    <>
      <div className={style.firstContainer}>
        <Toast
          severity={toastOpen ? toastSeverity : updateToastSeverity}
          open={toastOpen || updateToastOpen}
          message={toastOpen ? toastMessage : updateToastMessage}
          onClose={toastOpen ? handleToastClose : handleUpdateToastClose}
        />
        <DrawerComponent
          open={drawerOpen}
          onClose={handleCloseDrawer}
          endDate={endDate}
        />
        <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
          <Input IsUsername type='text' label='search' name='Search' width={220} iconPosition="end" icon={<SearchOutlinedIcon />} onChange={onSearchChange} />
          {isAdmin ? <Button btnText='Create Event' type={ButtonTypes.PRIMARY} onClick={() => handleOpenDrawer('create')} /> : ''}
        </div>
      </div>
      <div className={style.contanier}>
        <div className={style.grid}>
          {isLoading ? (
            events.map((event) => <EventsContent key={event._id} />)
          ) : (
            events.map((event) => (
              <Card key={event._id} backgroundColor='#FFFFFF' borderRadius='5px' border='1px solid #ebebeb' padding='20px' flex='1' position='relative' height='auto'>
                <div className={style.titleContainer}>
                  <div className={style.title}>{event.title}</div>
                  {isAdmin && (
                    <LongMenu
                      onClickEdit={() => handleOpenDrawer('edit', event)}
                      onClickDelete={() => handleDeleteEventModal(event._id)}
                      EditIcon={EditIcon}
                      Delete={DeleteIcon}
                      name="Edit"
                      name2="Delete"
                      style={{ color: '#6b7280' }}
                    />
                  )}
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
                  <div className={style.data}>
                    <LocationSearchingIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                    <div>{event.location}</div>
                  </div>
                  <Button
                    btnText={isAdmin ? "See voters" : 'Vote'}
                    type={ButtonTypes.SECONDARY}
                    onClick={() => handleSeeVoters(event)}
                  />
                </div>
              </Card>
            ))
          )}
        </div>
        {showModal && (
          <ModalComponent open={showModal} handleClose={closeModal}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: "15px" }}>
              <div className={style.title}>Confirm Action.</div>
              <div>Are you sure you want to delete this event?</div>
              <div style={{ display: 'flex', gap: "10px", marginTop: "20px" }}>
                <Button
                  type={ButtonTypes.PRIMARY}
                  backgroundColor='#d32f2f'
                  borderColor='#d32f2f'
                  btnText='Confirm'
                  width='100%'
                  onClick={() => {
                    handleDelete(eventToDeleteId);
                    closeModal();
                  }}
                />
                <Button
                  type={ButtonTypes.SECONDARY}
                  btnText='Cancel'
                  width='100%'
                  onClick={closeModal}
                />
              </div>
            </div>
          </ModalComponent>
        )}
        {showEventModal && selectedEvent && (
          <ModalComponent height='100%' width='400px' padding='0' open={showEventModal} handleClose={() => setShowEventModal(false)}>
            <SelectedEventCard
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          </ModalComponent>
        )}
      </div>
    </>
  );
}


const Events: React.FC = () => {
  return (
    <EventsProvider>
      <EventsContentAndComponents />
    </EventsProvider>
  );
};


export default Events;