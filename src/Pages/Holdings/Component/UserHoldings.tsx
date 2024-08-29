import Card from '@/Components/Card/Card'
import { useGetUserHoldings } from '../Hook'
import style from '../style/userHoldings.module.scss'
import { LaptopOutlined, MonitorOutlined } from '@mui/icons-material'
import { useContext } from 'react'
import { Asset } from '../TAsset'
import { ReturnAssetModal } from './ReturnAssetModal'
import HoldingsProvider, { HoldingsContext } from '../HoldingsContext'
import Toast from '@/Components/Toast/Toast'
import AssignAssetModal from './AssignAssetModal'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'

const UserHoldingsComponent = () => {
    const holdingsGetter = useGetUserHoldings()
    const { searchParams, setSearchParams, toastConfigs, handleToastClose } =
        useContext(HoldingsContext)

    const handleItemClick = (id: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('selectedOwnedItem', id)
            console.log('Updated searchParams:', newParams.toString())
            return newParams
        })
    }

    const handleOpenAssignModal = () => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('assignItem', 'true')
            return newParams
        })
    }

    if (holdingsGetter.isLoading) return <p>Loading...</p>
    if (holdingsGetter.isError) return <p>{holdingsGetter.error.message}</p>
    return (
        <Card
            border="2px solid rgb(211,211,211,.5)"
            padding="1.5rem"
            borderRadius='1.25rem'
            className={style.userCard}
        >
            <div className={style.userImageNameRole}>
                <img src={holdingsGetter.data.imageUrl} alt="" />
                <div>
                    <h3>
                        {holdingsGetter.data.firstName}{' '}
                        {holdingsGetter.data.lastName}
                    </h3>
                    <p>{holdingsGetter.data.role}</p>
                </div>
            </div>
            <div className={style.generalInfo}>
                <div>
                    <h4>Email</h4>
                    <p>{holdingsGetter.data.email}</p>
                </div>
                <div>
                    <h4>Phone</h4>
                    <p>{holdingsGetter.data.phone}</p>
                </div>
            </div>

            <div className={style.itemsDiv}>
                <h4>Assigned items</h4>
                <div className={style.itemsListingContainer}>
                    {holdingsGetter.data.assets.map((item: Asset) => {
                        return (
                            <IconBasedOnAssetType
                                key={item._id}
                                onClick={() => handleItemClick(item._id)}
                                asset={item.type}
                            />
                        )
                    })}
                </div>
            </div>

            <Button
                btnText={'Add item'}
                type={ButtonTypes.PRIMARY}
                onClick={handleOpenAssignModal}
            />
            <Toast
                open={toastConfigs.isOpen}
                onClose={handleToastClose}
                message={toastConfigs.message || ''}
                severity={toastConfigs.severity}
            />

            {searchParams.get('assignItem') && <AssignAssetModal />}

            {searchParams.get('selectedOwnedItem') && <ReturnAssetModal />}
        </Card>
    )
}

const IconBasedOnAssetType = ({
    asset,
    onClick,
}: {
    asset: string
    onClick?: () => void
}) => {
    return (
        <div className={style.assetContainer} onClick={onClick}>
            {asset === 'laptop' ? <LaptopOutlined /> : <MonitorOutlined />}
            <p>{asset}</p>
        </div>
    )
}

export default function UserHoldings() {
    return (
        <HoldingsProvider>
            <UserHoldingsComponent />
        </HoldingsProvider>
    )
}
