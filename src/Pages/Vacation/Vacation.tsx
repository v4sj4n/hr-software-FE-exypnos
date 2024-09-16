import { MouseEvent, useContext, useEffect } from 'react'
import { VacationProvider, VacationContext } from './VacationContext'
import { VacationTable } from './components/VacationTable'
import style from './style/vacation.module.scss'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { EmployeesWithVacations } from './components/EmployeesWithVacations'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { CreateVacationForm } from './components/form/CreateVacationForm'
import SimpleEmployeeUI from './components/SimpleEmployee/SimpleEmployeeUI'

function VacationComponent() {
    const {
        searchParams,
        setSearchParams,
        pageToggleChoices,
        createVacationToggler,
    } = useContext(VacationContext)
    const handleChange = (
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        event.preventDefault()
        setSearchParams(new URLSearchParams({ vacationType: newAlignment }))
    }

    useEffect(() => {
        if (!searchParams.get('vacationType')) {
            setSearchParams(new URLSearchParams({ vacationType: 'requests' }))
        }
    }, [searchParams, setSearchParams])

    return (
        <main className={style.main}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    gap: '1rem',
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
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText={'Add Vacation'}
                    onClick={createVacationToggler}
                />
            </div>
            {searchParams.get('createVacation') && <CreateVacationForm />}
            <div>
                {searchParams.get('vacationType') === 'requests' && (
                    <VacationTable />
                )}
                {searchParams.get('vacationType') === 'userLeaves' && (
                    <EmployeesWithVacations />
                )}
            </div>
            <SimpleEmployeeUI />
        </main>
    )
}

export default function Vacation() {
    return (
        <VacationProvider>
            <VacationComponent />
        </VacationProvider>
    )
}
