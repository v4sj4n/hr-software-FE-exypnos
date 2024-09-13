import Card from '@/Components/Card/Card'
import style from './style/userVacations.module.scss'

import { VacationProvider } from './VacationContext'
import { useGetUserWithVacations } from './Hook'
import { Vacation } from './TVacation'
import { Check, Close, AccessTime } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'

const UserVacationsComponent = () => {
    const { error, isError, isLoading, data } = useGetUserWithVacations()

    const [takenLeaveDays, setTakenLeaveDays] = useState<number>(0)
    useEffect(() => {
        if (data && data.vacations) {
            const totalLeaveDays = data.vacations.reduce(
                (
                    total: number,
                    item: {
                        endDate:
                            | string
                            | number
                            | Date
                            | dayjs.Dayjs
                            | null
                            | undefined
                        startDate:
                            | string
                            | number
                            | Date
                            | dayjs.Dayjs
                            | null
                            | undefined
                    },
                ) => {
                    const eD = dayjs(item.endDate)
                    const sD = dayjs(item.startDate)
                    const leaveDays = eD.diff(sD, 'days')
                    return total + leaveDays
                },
                0,
            )
            setTakenLeaveDays(totalLeaveDays)
        }
    }, [data])

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading) return <div className={style.loading}>Loading...</div>
    return (
        <Card
            border="2px solid rgb(211,211,211,.5)"
            padding="1.5rem"
            borderRadius="1.25rem"
        >
            <div className={style.userImageNameRole}>
                <img src={data.imageUrl} alt="" />
                <div>
                    <h3>
                        {data.firstName} {data.lastName}
                    </h3>
                    <p>{data.role}</p>
                </div>
            </div>
            <div className={style.generalInfo}>
                <div>
                    <h4>Email</h4>
                    <p>{data.email}</p>
                </div>
                <div>
                    <h4>Phone</h4>
                    <p>{data.phone}</p>
                </div>
            </div>

            <div className={style.itemsDiv}>
                <h4>Vacation Requests</h4>
                <div className={style.itemsListingContainer}>
                    {data.vacations.map((item: Vacation) => (
                        <div key={item._id} className={style.vacationContainer}>
                            {item.type}{' '}
                            {item.status === 'pending' ? (
                                <AccessTime color="disabled" />
                            ) : item.status === 'accepted' ? (
                                <Check color="success" />
                            ) : (
                                <Close color="error" />
                            )}
                        </div>
                    ))}
                </div>
                {takenLeaveDays} days taken this year
            </div>
            <Button
                marginTop={'.5rem'}
                btnText={'Add Vacation'}
                type={ButtonTypes.PRIMARY}
            />
        </Card>
    )
}

export default function UserVacations() {
    return (
        <VacationProvider>
            <UserVacationsComponent />
        </VacationProvider>
    )
}
