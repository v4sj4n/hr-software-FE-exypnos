import { useGetUsersWithVacations } from '../Hook/index.ts'
import { CircularProgress } from '@mui/material'
import { UserWithHoldings } from '../TAsset'
import Card from '@/Components/Card/Card'
// import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import {
    ArrowForwardIos,
    LaptopOutlined,
    MonitorOutlined,
} from '@mui/icons-material'
import style from '../style/employeesWithHoldings.module.scss'
import { useNavigate } from 'react-router-dom'

export const EmployeesWithHoldings = () => {
    const { isError, error, data, isLoading } = useGetUsersWithVacations()
    const navigate = useNavigate()

    const goToUserWithId = (id: string) => {
        navigate(`/holdings/${id}`)
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
            vacations,
            role,
            email,
        }: UserWithHoldings) => {
            console.log(email)
            return (
                <Card
                    key={_id}
                    className={style.userDiv}
                    onClick={() => goToUserWithId(_id)}
                    padding="1rem 2rem"
                >
                    <div className={style.leftContainer}>
                        <div>
                            <img
                                src={imageUrl}
                                alt={`${firstName}'s profile picture`}
                            />
                            <div>
                                <h3>
                                    {firstName} {lastName}
                                </h3>
                                <p>username@email.com</p>
                            </div>
                        </div>
                        <div>
                            {vacations.map((asset) => {
                                return (
                                    <IconBasedOnAssetType
                                        key={asset._id}
                                        asset={asset.type}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.rightContainer}>
                        <div
                            onClick={() => {
                                goToUserWithId(_id)
                            }}
                        >
                            <p>{role}</p>
                            <ArrowForwardIos />
                        </div>
                        <p>
                            {assets.length} item{assets.length === 1 ? '' : 's'}
                        </p>
                    </div>
                </Card>
            )
        },
    )

    return <div className={style.employeesContainer}>{users}</div>
}

const IconBasedOnAssetType = ({ asset }: { asset: string }) => {
    return (
        <div className={style.assetContainer}>
            {asset === 'laptop' ? <LaptopOutlined /> : <MonitorOutlined />}
        </div>
    )
}
