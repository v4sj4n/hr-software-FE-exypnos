import { useContext } from 'react'
import { InventoryContext, InventoryProvider } from './InventoryContext.tsx'
import style from './style/inventory.module.scss'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Button from '@/Components/Button/Button'
import { ModalComponent } from '@/Components/Modal/Modal'
import { InventoryTable } from './components/InventoryTable.tsx'
import { CreateItemForm } from './components/Form/CreateItemForm.tsx'
import { ForbiddenResource } from '@/Components/ForbiddenResource/ForbiddenResource.tsx'

function InventoryBaseComponent() {
    const {
        createModalOpen,
        handleOpenCreateModalOpen,
        handleCloseCreateModalOpen,
    } = useContext(InventoryContext)
    return (
        <ForbiddenResource>
            <main>
                <ModalComponent
                    open={createModalOpen}
                    handleClose={handleCloseCreateModalOpen}
                >
                    <CreateItemForm />
                </ModalComponent>
                <InventoryTable />
                <div className={style.buttonDivStyle}>
                    <Button
                        type={ButtonTypes.PRIMARY}
                        btnText="Add an Item"
                        onClick={handleOpenCreateModalOpen}
                        width="12rem"
                    />
                </div>
            </main>
        </ForbiddenResource>
    )
}

export default function Inventory() {
    return (
        <InventoryProvider>
            <InventoryBaseComponent />
        </InventoryProvider>
    )
}
