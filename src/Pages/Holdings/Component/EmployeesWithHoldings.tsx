import { useContext } from 'react'
import { useEmployeesWithHoldings } from '../Hook/index.ts'
import { HoldingsContext } from '../HoldingsContext'
import { CircularProgress } from '@mui/material'
import { UserWithHoldings } from '../TAsset'
import Card from '@/Components/Card/Card'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { LaptopOutlined, MonitorOutlined } from '@mui/icons-material'
import style from '../style/employeesWithHoldings.module.scss'

export const EmployeesWithHoldings = () => {
    const { setSearchParams } = useContext(HoldingsContext)

    const { isError, error, data, isLoading } = useEmployeesWithHoldings()

    const userClickHandler = (userId: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            if (userId) {
                newParams.set('selectedHolding', userId)
            } else {
                newParams.delete('selectedHolding')
            }
            return newParams
        })
    }

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading)
        return (
            <div className={style.loading}>
                <CircularProgress />
            </div>
        )

    const users = data.map(
        ({
            _id,
            firstName,
            lastName,
            imageUrl,
            assets,
            role,
        }: UserWithHoldings) => (
            <Card
                key={_id}
                className={style.userDiv}
                onClick={() => userClickHandler(_id)}
            >
                <div className={style.imageAndName}>
                    <img
                        src={imageUrl}
                        alt={`${firstName}'s profile picture`}
                    />
                    <div>
                        <TooltipImproved
                            text={`Click to view ${firstName}'s holdings`}
                            placement="right"
                            offset={[0, 5]}
                        >
                            <h3>
                                {firstName} {lastName}
                            </h3>
                        </TooltipImproved>
                        <p style={{ fontSize: '0.8rem' }}>{role}</p>
                    </div>
                </div>

                <div className={style.userAssets}>
                    {assets.map((asset) => {
                        return (
                            <IconBasedOnAssetType
                                key={asset._id}
                                asset={asset.type}
                            />
                        )
                    })}
                </div>
            </Card>
        ),
    )

    return <div className={style.employeesContainer}>{users}</div>
}

const IconBasedOnAssetType = ({ asset }: { asset: string }) => {
    if (asset === 'laptop') return <LaptopOutlined />
    if (asset === 'monitor') return <MonitorOutlined />
    return null
}
