import { useGetUsersWithVacations } from '../Hook/index.ts'
import {
    CircularProgress,
    Collapse,

} from '@mui/material'
import { UserWithVacations } from '../TVacation.ts'
import Card from '@/Components/Card/Card'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import style from '../style/employeesWithVacations.module.scss'
import { useContext } from 'react'
import { VacationContext } from '../VacationContext'

export const EmployeesWithVacations = () => {
    const { isError, error, data, isLoading } = useGetUsersWithVacations()

    const { searchParams, setSearchParams } = useContext(VacationContext)

    const goToUserWithId = (id: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('selectedUser', id)
            return newParams
        })
    }

    const collapse = () => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.delete('selectedUser')
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

    return (
        <div className={style.employeesContainer}>
            {data.map(
                ({
                    _id,
                    firstName,
                    lastName,
                    imageUrl,
                    vacations,
                    role,
                    phone,
                }: UserWithVacations) => (
                    <Card
                        key={_id}
                        className={style.userDiv}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (searchParams.get('selectedUser') === _id) {
                                collapse()
                            } else {
                                goToUserWithId(_id)
                            }
                        }}
                        padding="1.25rem"
                        borderRadius="1rem"
                        backgroundColor={'white'}
                    >
                        <div className={style.mainData}>
                            <div className={style.leftMainData}>
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
                            <div className={style.rightMainData}>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (
                                            searchParams.get('selectedUser') ===
                                            _id
                                        ) {
                                            collapse()
                                        } else {
                                            goToUserWithId(_id)
                                        }
                                    }}
                                >
                                    <p>
                                        View{' '}
                                        {searchParams.get('selectedUser') ===
                                        _id
                                            ? 'Less'
                                            : 'More'}
                                    </p>
                                    {searchParams.get('selectedUser') ===
                                    _id ? (
                                        <ExpandLess fontSize="medium" />
                                    ) : (
                                        <ExpandMore fontSize="medium" />
                                    )}
                                </div>
                                {searchParams.get('selectedUser') !== _id && (
                                    <p>
                                        {vacations.length} vacation
                                        {vacations.length === 1 ? '' : 's'}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Collapse
                            in={
                                searchParams.get('selectedUser') !== null &&
                                _id === searchParams.get('selectedUser')
                            }
                            timeout="auto"
                            unmountOnExit
                        >
                            <div className={style.collapsedData}>
                                <div className={style.collapseDataVacationList}>
                                    <h3>Vacations this year</h3>
                                    <div>
                                        {vacations.length > 0 ? vacations.map(({ type }) => (
                                            <p>{type}</p>
                                        )) : (
                                            <p>No vacations this year</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* <CardContent>
                                <Typography sx={{ marginBottom: 2 }}>
                                    Method:
                                </Typography>
                                <Typography sx={{ marginBottom: 2 }}>
                                    Heat 1/2 cup of the broth in a pot until
                                    simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                            </CardContent> */}
                        </Collapse>
                    </Card>
                ),
            )}
        </div>
    )
}
