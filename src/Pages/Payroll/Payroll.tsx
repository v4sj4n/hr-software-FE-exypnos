import DataTable from '../../Components/Table/Table'
import { usePayrollContext } from './Context/PayrollTableContext'
import { PayrollProvider } from './Context/PayrollTableProvider'
import style from "./styles/Payroll.module.css"
function PayrollContent() {
    const { rows, columns, getRowId, handleRowClick, } = usePayrollContext()

    return (
        <div className={style.payroll}>
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
