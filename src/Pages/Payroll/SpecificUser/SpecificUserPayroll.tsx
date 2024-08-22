import DataTable from '@/Components/Table/Table'
import { PayrollProviderSpecific } from './Context/SpecificUserPayrollProvider'
import style from '../styles/Payroll.module.css'
import { usePayrollContextSpecific } from './Context/SpecificUserPayrollContext'
import Input from '@/Components/Input/Index'
import { EventsProvider } from '@/Pages/Events/Context/EventsContext'

function SpecificUserPayrollContent() {
    const { rows, columns, getRowId, setMonth, setYear } = usePayrollContextSpecific();

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        const [yearString, monthString] = date.split('-');
        setYear(parseInt(yearString));
        setMonth(parseInt(monthString));
    };

    return (
        <div className={style.payroll}>
            <div style={{alignSelf:"flex-end"}}>
             <Input width={350} name='Filter' type='month' label='Month & Year' IsUsername onChange={handleDateChange} />
            </div>
            <DataTable
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            />
            < div style={{ width: "500px", marginTop: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
            </div>
        </div>
    )
}

const SpecificUserPayroll: React.FC = () => {
    return (
        <EventsProvider>
            <PayrollProviderSpecific  >
                <SpecificUserPayrollContent />
            </PayrollProviderSpecific>
        </EventsProvider>

    )
}

export default SpecificUserPayroll;
