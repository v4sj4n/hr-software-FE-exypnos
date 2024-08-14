import { useContext } from 'react'
import {
  InventoryContext,
  InventoryProvider,
} from './components/InventoryContext.tsx'
import style from './style/inventory.module.scss'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Button from '@/Components/Button/Button'
import { ModalComponent } from '@/Components/Modal/Modal'
import { InventoryTable } from './components/InventoryTable.tsx'
import { CreateItemForm } from './components/Form/CreateItemForm.tsx'

function InventoryBaseComponent() {
  const {
    createModalOpen,
    handleOpenCreateModalOpen,
    handleCloseCreateModalOpen,
  } = useContext(InventoryContext)
  return (
    <main className={style.main}>
      <div className={style.heading}>
        <h2 className={style.title}>Inventory</h2>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText="Add an Item"
          onClick={handleOpenCreateModalOpen}
          width="12rem"
        />
      </div>
      <ModalComponent
        open={createModalOpen}
        handleClose={handleCloseCreateModalOpen}
      >
        <CreateItemForm />
      </ModalComponent>
      <InventoryTable />
    </main>
  )
}

export default function Inventory() {
  return (
    <InventoryProvider>
      <InventoryBaseComponent />
    </InventoryProvider>
  )
}
