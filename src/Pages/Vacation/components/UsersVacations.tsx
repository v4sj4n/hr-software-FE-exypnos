import { useGetUsersWithVacations } from '../Hook'

export default function UsersVacations() {
    const { data, error, isLoading } = useGetUsersWithVacations()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    const users = data.map(({ firstName, lastName, vacations }) => {
        return (
            <div>
                <h3>
                    {firstName} {lastName}
                </h3>
                {vacations.map(({ type, startDate, endDate }) => {
                    return (
                        <p>
                            {type} - {startDate} - {endDate}
                        </p>
                    )
                })}
            </div>
        )
    })
    return <div>{users}</div>
}
