import { useContext } from 'react'
import { VacationContext } from '../../VacationContext'
import { useGetVacation } from '../../Hook'
import { UpdateVacationForm } from './UpdateVacationForm'
import { Loader } from '@/Components/Loader/Loader'
import { Modal } from '@/NewComponents/Modal'

export const SelectedVacationModal = () => {
    const { searchParams, handleCloseVacationModalOpen: handleClose } =
        useContext(VacationContext)

    const vacation = useGetVacation()

    if (vacation.isLoading) return <Loader />
    if (vacation.error) return <div>Error: {vacation.error.message}</div>

    return (
        <Modal
            open={searchParams.get('selectedVacation') !== null}
            onClose={handleClose}
        >
            <UpdateVacationForm data={vacation} />
        </Modal>
    )
}
