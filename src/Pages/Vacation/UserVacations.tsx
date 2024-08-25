import Card from '@/Components/Card/Card'
import style from './style/userVacations.module.scss'

import VacationProvider from './VacationContext'
import { useGetUserWithVacations } from './Hook'
import { Vacation } from './TVacation'

const UserVacationsComponent = () => {
    const { error, isError, isLoading, data } = useGetUserWithVacations()

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading) return <div className={style.loading}>Loading...</div>
    return (
        <Card border="1px solid gray" padding="1.5rem">
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
                    {data.vacations.map((item: Vacation) => {
                        return (
                            <div className={style.vacationContainer}>
                                {item.type}
                            </div>
                        )
                    })}
                </div>
            </div>
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
