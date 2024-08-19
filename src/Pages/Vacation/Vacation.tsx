import style from './style/vacation.module.scss'
import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { VacationTable } from './components/VacationTable'

export default function Vacation() {
    const [alignment, setAlignment] = useState('requests')
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        event.preventDefault()
        setAlignment(newAlignment)
    }
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
                <VacationTable />
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
                    value={alignment}
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
