import Input from '@/Components/Input/Index'
import DataTable from '../../Components/Table/Table'
import { usePayrollContext } from './Context/PayrollTableContext'
import { PayrollProvider } from './Context/PayrollTableProvider'
import style from "./styles/Payroll.module.css"
function PayrollContent() {
    const { rows, columns, getRowId, handleRowClick, setMonth, setYear } = usePayrollContext()

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        const [yearString, monthString] = date.split('-');
        setYear(parseInt(yearString));
        setMonth(parseInt(monthString));
    };

    return (
        <div className={style.payroll}>
            <div style={{ alignSelf: "flex-end" }}>
                <Input width={350} name='Filter' type='month' label='Month & Year' IsUsername onChange={handleDateChange} />
            </div>
            <DataTable
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                handleRowClick={handleRowClick}
            />
        </div>
    )
}

const Payroll: React.FC = () => {
    return (
        <PayrollProvider  >
            <PayrollContent />
        </PayrollProvider>
    )
}

export default Payroll;
