import Input from '@/Components/Input/Index'
import DataTable from '../../Components/Table/Table'
import { usePayrollContext } from './Context/PayrollTableContext'
import { PayrollProvider } from './Context/PayrollTableProvider'
import style from './styles/Payroll.module.css'
import { RingLoader } from 'react-spinners'
import { Collapse } from '@mui/material'
import { useState } from 'react'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Button from '@/Components/Button/Button'
import { Close, FilterList } from '@mui/icons-material'
function PayrollContent() {
    const {
        rows,
        columns,
        getRowId,
        handleRowClick,
        setMonth,
        setFullName,
        setBonus,
        setWorkingDays,
        setYear,
        isPending,
        setMaxNetSalary,
        setMinNetSalary,
        page,
        pageSize,
        totalPages,
        handlePaginationModelChange,
    } = usePayrollContext()

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value
        const [yearString, monthString] = date.split('-')
        setYear(parseInt(yearString))
        setMonth(parseInt(monthString))
    }

    const handleFullNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFullName(event.target.value)
    }

    const handleWorkingDaysChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWorkingDays(parseInt(event.target.value))
    }

    const handleMinSalaryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMinNetSalary(parseFloat(event.target.value))
    }

    const handleMaxSalaryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMaxNetSalary(parseFloat(event.target.value))
    }

    const handleBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBonus(parseFloat(event.target.value))
    }

    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className={style.payroll}>
            <div
                style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: 64,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Button
                    btnText=""
                    borderColor="transparent"
                    type={ButtonTypes.SECONDARY}
                    onClick={() => setShowFilters((prev) => !prev)}
                    icon={showFilters ? <Close /> : <FilterList />}
                />
                <Collapse
                    in={showFilters}
                    timeout="auto"
                    orientation="horizontal"
                    
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginLeft: 10,
                        }}
                    >
                        <Input
                            width={150}
                            name="Filter"
                            type="month"
                            label="Month & Year"
                            isFilter
                            onChange={handleDateChange}
                        />
                        <Input
                            width={150}
                            name="fullName"
                            type="text"
                            label="Full Name"
                            isFilter
                            onChange={handleFullNameChange}
                        />
                        <Input
                            width={150}
                            name="workingDays"
                              type="number"
                            label="Working Days"
                            isFilter
                            onChange={handleWorkingDaysChange}
                        />
                        <Input
                            width={150}
                            name="maxNetSalary"
                                 type="number"
                            label="Max Net Salary"
                            isFilter
                            onChange={handleMaxSalaryChange}
                        />
                        <Input
                            width={150}
                            name="minNetSalary"
                                type="number"
                            label="Min Net Salary"
                            isFilter
                            onChange={handleMinSalaryChange}
                        />
                        <Input
                            width={150}
                            name="bonus"
                            type="number"
                            label="Bonus"
                            isFilter
                            onChange={handleBonusChange}
                        />
                    </div>
                </Collapse>
            </div>
            {isPending ? (
                <div className={style.ring}>
                    <RingLoader />
                </div>
            ) : (
                <DataTable
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    handleRowClick={handleRowClick}
                    totalPages={totalPages}
                    page={page}
                    pageSize={pageSize}
                    onPaginationModelChange={handlePaginationModelChange}
                />
            )}
        </div>
    )
}

const Payroll: React.FC = () => {
    return (
        <PayrollProvider>
            <PayrollContent />
        </PayrollProvider>
    )
}

export default Payroll