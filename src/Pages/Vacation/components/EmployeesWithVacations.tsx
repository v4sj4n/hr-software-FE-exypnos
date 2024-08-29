import { useGetUsersWithVacations } from '../Hook/index.ts'
import { CircularProgress } from '@mui/material'
import { UserWithVacations } from '../TVacation.ts'
import style from '../style/employeesWithVacations.module.scss'
import { useContext } from 'react'
import { VacationContext } from '../VacationContext'
import SimpleCollapsableCard from '@/Components/Vacation_Asset/SimpleCollapsableCard.tsx'

export const EmployeesWithVacations = () => {
    const { isError, error, data, isLoading } = useGetUsersWithVacations()

    const { searchParams, setSearchParams } = useContext(VacationContext)

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading)
        return (
            <div className={style.loading}>
                <CircularProgress />
            </div>
        )

    return (
        <div className={style.employeesContainer}>
            {data.map((user: UserWithVacations) => (
                <SimpleCollapsableCard
                    key={user._id}
                    user={user}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    items={{
                        type: 'Vacation',
                        itemArr: user.vacations,
                    }}
                >
                    <div className={style.collapsedData}>
                        <div className={style.collapseDataVacationList}>
                            <h3>Vacations this year</h3>
                            <div>
                                {user.vacations.length > 0 ? (
                                    user.vacations.map(({ type, _id }) => (
                                        <p key={_id}>{type}</p>
                                    ))
                                ) : (
                                    <p>No vacations this year</p>
                                )}
                            </div>
                        </div>
                    </div>
                </SimpleCollapsableCard>
            ))}
        </div>
    )
}
