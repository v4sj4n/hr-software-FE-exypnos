import DataTable from '@/Components/Table/Table'
import { PayrollProviderSpecific } from './Context/SpecificUserPayrollProvider'
import style from '../styles/Payroll.module.css'
import { usePayrollContextSpecific } from './Context/SpecificUserPayrollContext'
function SpecificUserPayrollContent() {
    const { rows, columns, getRowId,  } = usePayrollContextSpecific()

    return (
        <div className={style.payroll}>
            <DataTable
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            />
        </div>
    )
}

const SpecificUserPayroll: React.FC = () => {
    return (
        <PayrollProviderSpecific  >
            <SpecificUserPayrollContent />
        </PayrollProviderSpecific>
    )
}

export default SpecificUserPayroll;
