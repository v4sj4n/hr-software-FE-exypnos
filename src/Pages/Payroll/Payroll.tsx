import Input from '@/Components/Input/Index'
import DataTable from '../../Components/Table/Table'
import { usePayrollContext } from './Context/PayrollTableContext'
import { PayrollProvider } from './Context/PayrollTableProvider'
import style from './styles/Payroll.module.css'
import { RingLoader } from 'react-spinners'
import { Box, Collapse } from '@mui/material'
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
        isPending,
        page,
        pageSize,
        totalPages,
        handlePaginationModelChange,
        handleDateChange,
        handleFullNameChange,
        handleWorkingDaysChange,
        handleMinSalaryChange,
        handleMaxSalaryChange,
        handleBonusChange,
    } = usePayrollContext()

    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className={style.payroll}>
            <div className={style.search}>
                <Collapse
                    in={showFilters}
                    timeout="auto"
                    orientation="vertical"
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginLeft: 10,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                right: 10,
                                mt: 2,
                                zIndex: 1,
                                p: 0.5,
                                width: 200,
                                bgcolor: 'white',
                                boxShadow: 1,
                                borderRadius: 2,
                                gap: 2,
                                overflow: 'hidden',
                                maxHeight: 300,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    gap: 1,
                                    overflowY: 'auto',
                                    scrollbarWidth: 'none',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                }}
                            >
                                <div className={style.filtersTitle}>
                                    Payroll Filters
                                </div>
                                <Input
                                    name="Filter"
                                    type="month"
                                    label="Month & Year"
                                    isFilter
                                    style={{
                                        flex: 2,
                                    }}
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
                            </Box>
                        </Box>
                    </div>
                </Collapse>
                <Button
                    btnText=""
                    borderColor="transparent"
                    type={ButtonTypes.SECONDARY}
                    onClick={() => setShowFilters((prev) => !prev)}
                    icon={showFilters ? <Close /> : <FilterList />}
                />
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
