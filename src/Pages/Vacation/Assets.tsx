import { useContext } from 'react'
import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import AssetsTable from './Component/VacationsTable'
import { AssetsContext } from './VacationContext'
import { ModalComponent } from '../../Components/Modal/Modal'
import { CreateAssetForm } from './Component/Form/CreateVacationForm'
import style from './style/assets.module.css'

export default function Assets() {
  const { modalOpen, handleOpenModal, handleCloseModal } =
    useContext(AssetsContext)
  return (
    <>
      <div className={style.titleHeading}>
        <h1>Assets</h1>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText="Create Asset"
          onClick={handleOpenModal}
          width="15rem"
        />
      </div>
      <ModalComponent open={modalOpen} handleClose={handleCloseModal}>
        <CreateAssetForm />
      </ModalComponent>
      <AssetsTable />
    </>
  )
}
