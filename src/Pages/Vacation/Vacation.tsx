import { useContext, useEffect } from 'react'
import { VacationContext } from './VacationContext'
import { VacationTable } from './components/VacationTable'
import style from './style/vacation.module.scss'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import UsersVacations from './components/UsersVacations'

export default function Vacation() {
    const { searchParams, setSearchParams } = useContext(VacationContext)
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        event.preventDefault()
        setSearchParams(new URLSearchParams({ vacationType: newAlignment }))
    }

    useEffect(() => {
        if (!searchParams.get('vacationType')) {
            setSearchParams(new URLSearchParams({ vacationType: 'requests' }))
        }
    }, [])
    const pageToggleChoices = [
        {
            value: 'requests',
            label: 'Requests',
        },
        {
            value: 'userLeaves',
            label: 'User Leaves',
        },
    ]

    return (
        <main className={style.main}>
            <div>
                {searchParams.get('vacationType') === 'requests' ? (
                    <VacationTable />
                ) : (
                    <UsersVacations />
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem',
                }}
            >
                <ToggleButtonGroup
                    color="primary"
                    value={searchParams.get('vacationType')}
                    exclusive
                    onChange={handleChange}
                    aria-label="Leave"
                >
                    {pageToggleChoices.map(({ value, label }) => (
                        <ToggleButton
                            sx={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                            }}
                            key={value}
                            value={value}
                        >
                            {label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
        </main>
    )
}
