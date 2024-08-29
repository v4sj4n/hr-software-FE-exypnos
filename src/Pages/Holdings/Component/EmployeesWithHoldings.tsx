import { useEmployeesWithHoldings } from '../Hook/index.ts'
import { CircularProgress } from '@mui/material'
import { UserWithHoldings } from '../TAsset'
import Card from '@/Components/Card/Card'
import { useInView } from 'react-intersection-observer'

// import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import {
    ArrowForwardIos,
    LaptopOutlined,
    MonitorOutlined,
} from '@mui/icons-material'
import style from '../style/employeesWithHoldings.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const EmployeesWithHoldings = () => {
    const {
        isError,
        error,
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useEmployeesWithHoldings()
    const navigate = useNavigate()
    console.log(data)

    const goToUserWithId = (id: string) => {
        navigate(`/holdings/${id}`)
    }

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading)
        return (
            <div className={style.loading}>
                <CircularProgress />
            </div>
        )

    return (
        <div className={style.employeesContainer}>
            {data?.pages.map((page) =>
                page.data.map(
                    ({
                        _id,
                        firstName,
                        lastName,
                        imageUrl,
                        assets,
                        role,
                        phone,
                    }: UserWithHoldings) => (
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
                                        <p>
                                            {phone} - {role}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {assets.map((asset) => {
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
                                    <p>View More</p>
                                    <ArrowForwardIos />
                                </div>
                                <p>
                                    {assets.length} item
                                    {assets.length === 1 ? '' : 's'}
                                </p>
                            </div>
                        </Card>
                    ),
                ),
            )}
            <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
        </div>
    )
}

const IconBasedOnAssetType = ({ asset }: { asset: string }) => {
    return (
        <div className={style.assetContainer}>
            {asset === 'laptop' ? <LaptopOutlined /> : <MonitorOutlined />}
        </div>
    )
}
