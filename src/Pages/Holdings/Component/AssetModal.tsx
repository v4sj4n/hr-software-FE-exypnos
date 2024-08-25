import { ModalComponent } from '@/Components/Modal/Modal'
import { useSearchParams } from 'react-router-dom'
import { useGetItem } from '../Hook'

export const AssetModal = () => {
    const { error, isError, isLoading, data } = useGetItem()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleClose = () => {
        setSearchParams(new URLSearchParams())
    }
    return (
        <ModalComponent
            open={!!searchParams.get('selectedOwnedItem')}
            handleClose={handleClose}
        >
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <div>
                    <h3>{data.type}</h3>
                    <p>{data.serialNumber}</p>
                    <p>{data.description}</p>
                </div>
            )}
        </ModalComponent>
    )
}
