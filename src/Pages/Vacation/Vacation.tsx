import { useContext } from 'react'

import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import { ModalComponent } from '../../Components/Modal/Modal'
import { CreateVacationForm } from './Component/Form/CreateVacationForm'
import VacationsTable from './Component/VacationsTable'
import style from './style/vacation.module.css'
import { VacationContext } from './VacationContext'

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
        <h1 className={style.title}>Vacations</h1>
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