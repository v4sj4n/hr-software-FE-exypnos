import Input from '@/Components/Input/Index'
import DataTable from '../../Components/Table/Table'
import { usePayrollContext } from './Context/PayrollTableContext'
import { PayrollProvider } from './Context/PayrollTableProvider'
import style from './styles/Payroll.module.css'
import { RingLoader } from 'react-spinners'
function PayrollContent() {
    const {
        rows,
        columns,
        getRowId,
        handleRowClick,
        setMonth,
        setYear,
        isPending,
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
                    display: 'flex',
                    fontSize: '30px',
                    justifyContent: 'center',
                    marginTop: '50px',
                }}
            >
                {' '}
                <RingLoader />
            </div>
        )

    return (
        <div className={style.payroll}>
            <div
                style={{ alignSelf: 'flex-end', position: 'absolute', top: 77 }}
            >
                <Input
                    width={250}
                    name="Filter"
                    type="month"
                    label="Month & Year"
                    IsUsername
                    onChange={handleDateChange}
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
