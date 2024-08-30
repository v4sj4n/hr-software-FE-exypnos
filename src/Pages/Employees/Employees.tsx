import { RingLoader } from 'react-spinners'
import DataTable from '../../Components/Table/Table'
import { useEmployeeContext } from './Context/EmployeTableContext'
import { EmployeeProvider } from './Context/EmployeTableProvider'
import style from './style/Employees.module.css'
function EmployeesContent() {
    const { rows, columns, getRowId, handleRowClick, handlePaginationModelChange, page, pageSize, totalPages, isPending } = useEmployeeContext()


    if (isPending) return <div style={{ display: "flex", fontSize: "30px", justifyContent: "center", marginTop: "200px" }}> <RingLoader /></div>

    return (
        <div className={style.employe}>
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
        </div>
    )
}

const Employees: React.FC = () => {
    return (
        <EmployeeProvider>
            <EmployeesContent />
        </EmployeeProvider>
    )
}

export default Employees
