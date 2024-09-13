import { useContext } from 'react'
import { ModalComponent } from '@/Components/Modal/Modal'
import QrCodeIcon from '@mui/icons-material/QrCode'
import { InventoryContext } from '../InventoryContext'
import { useGetOneInventoryItem } from '../Hook'
import style from '../style/singleInventoryItem.module.scss'
import { TitleCaser } from '@/Helpers/TitleCaser'
import { ItemHistory } from '../types'
import dayjs from 'dayjs'

export const SingleInventoryItem = () => {
    const {
        viewAssetModalOpen: open,
        handleCloseViewAssetModalOpen: handleClose,
    } = useContext(InventoryContext)

    const { error, isLoading, data } = useGetOneInventoryItem()
    return (
        <ModalComponent handleClose={handleClose} open={open}>
            {error ? (
                <p>Error fetching asset</p>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={style.titleContainer}>
                        {data && <h3>{data.type && TitleCaser(data?.type)}</h3>}
                        <div>
                            <p className={style.sn}>
                                {data?.serialNumber}
                                <QrCodeIcon />
                            </p>
                            {data && renderStatus(data.status, data.userId)}
                        </div>
                    </div>
                    <div className={style.historyContainer}>
                        {data?.history.length !== 0 ? (
                            <>
                                <div className={style.singleHistoryHeading}>
                                    <p>Taken Date</p>
                                    <p>Released Date</p>
                                    <p>User</p>
                                </div>
                                {data?.history.map(
                                    (history: ItemHistory, index: number) => (
                                        <div
                                            key={index}
                                            className={style.singleHistory}
                                        >
                                            <p>
                                                {dayjs(
                                                    history?.takenDate,
                                                ).format(
                                                    'DD MMMM YYYY - HH:MM',
                                                )}
                                            </p>
                                            <p>
                                                {history.returnDate
                                                    ? dayjs(
                                                          history.returnDate,
                                                      ).format(
                                                          'DD MMMM YYYY - HH:MM',
                                                      )
                                                    : 'Not yet'}
                                            </p>
                                            <p>
                                                {history.user.firstName}{' '}
                                                {history.user.lastName}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </>
                        ) : (
                            <p>This item has no history</p>
                        )}
                    </div>
                </>
            )}
        </ModalComponent>
    )
}

const renderStatus = (
    status: string,
    user: { firstName: string; lastName: string } | null = null,
) => {
    return (
        <span>
            <span
                style={{
                    color:
                        status === 'assigned'
                            ? '#d32f2f'
                            : status === 'available'
                              ? '#02a700'
                              : '4d4d4d',
                }}
            >
                {status}
            </span>
            {user && (
                <>
                    <span>to</span>
                    <strong>
                        {user.firstName} {user.lastName}
                    </strong>
                </>
            )}
        </span>
    )
}
