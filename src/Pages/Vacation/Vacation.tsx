import Button from '../../Components/Button/Button'
import style from './style/vacation.module.css'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import { useContext } from 'react'
import { VacationContext } from './VacationContext'
import VacationsTable from './Component/VacationsTable'
import { ModalComponent } from '../../Components/Modal/Modal'
import { CreateVacationForm } from './Component/Form/CreateVacationForm'


// TODO ( NOT FINISHED)
export default function Vacation() {
  const { handleOpenModal, modalOpen, handleCloseModal } =
    useContext(VacationContext)
  return (
    <main
    className={style.mainPage}
    style={{
      width: '100%',
      backgroundColor: 'f5f8fc',
    }}
  >
      <div className={style.titleHeading}>
        <div className={style.title}>Vacations</div>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText="Create Vacation"
          onClick={handleOpenModal}
          width="15rem"
        />
      </div>
      <ModalComponent open={modalOpen} handleClose={handleCloseModal}>
        <CreateVacationForm />
      </ModalComponent>
      <VacationsTable />
    </main>
  )
}
