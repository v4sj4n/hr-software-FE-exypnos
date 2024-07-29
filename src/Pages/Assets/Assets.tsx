import { useContext } from 'react'
import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import AssetsTable from './AssetsTable'
import { AssetsContext } from './AssetContext'
import { ModalComponent } from '../../Components/Modal/Modal'
import { CreateAssetForm } from './Form/CreateAssetForm'
import style from './style/assets.module.css'

export default function Assets() {
  const { modalOpen, handleOpenModal, handleCloseModal } =
    useContext(AssetsContext)
  return (
    <main
      className={style.mainPage}
      style={{
        width: '100%',
        backgroundColor: 'f5f8fc',
      }}
    >
      <div className={style.titleHeading}>
        <div className={style.title}>Assets</div>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText="Create Asset"
          onClick={handleOpenModal}
          width="12rem"
        />
      </div>
      <ModalComponent open={modalOpen} handleClose={handleCloseModal}>
        <CreateAssetForm />
      </ModalComponent>

      <AssetsTable />
    </main>
  )
}
