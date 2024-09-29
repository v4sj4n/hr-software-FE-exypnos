import { MouseEvent, useContext, useEffect } from 'react'
import { VacationProvider, VacationContext } from './VacationContext'
import { VacationTable } from './components/VacationTable'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { EmployeesWithVacations } from './components/EmployeesWithVacations'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { CreateVacationForm } from './components/form/CreateVacationForm'
import SimpleEmployeeUI from './components/SimpleEmployee/SimpleEmployeeUI'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { Toast } from '@/NewComponents/Toast'

function VacationComponent() {
    const {
        searchParams,
        setSearchParams,
        pageToggleChoices,
        createVacationToggler,
        toastConfigs,
        handleToastClose,
    } = useContext(VacationContext)
    const handleChange = (
        event: MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        event.preventDefault()
        setSearchParams(new URLSearchParams({ vacationType: newAlignment }))
    }

    const { userRole } = useAuth()

    useEffect(() => {
        if (userRole === 'hr') {
            if (!searchParams.get('vacationType')) {
                setSearchParams(
                    new URLSearchParams({ vacationType: 'requests' }),
                )
            }
        }
    }, [searchParams, setSearchParams, userRole])

    return (
        <main>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    gap: '1rem',
                }}
            >
                {['hr', 'admin'].includes(userRole as string) && (
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
                )}
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText={'Add Vacation'}
                    onClick={createVacationToggler}
                />
            </div>
            {['hr', 'admin'].includes(userRole as string) ? (
                <div>
                    {searchParams.get('vacationType') === 'requests' && (
                        <VacationTable />
                    )}
                    {searchParams.get('vacationType') === 'userLeaves' && (
                        <EmployeesWithVacations />
                    )}
                </div>
            ) : (
                <SimpleEmployeeUI />
            )}
            {searchParams.get('createVacation') && <CreateVacationForm />}
            <Toast
                open={toastConfigs.isOpen}
                onClose={handleToastClose}
                message={toastConfigs.message}
                severity={toastConfigs.severity}
            />
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
