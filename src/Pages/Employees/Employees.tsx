import DataTable from '../../Components/Table/Table'
import { useEmployeeContext } from './Context/EmployeTableContext'
import { EmployeeProvider } from './Context/EmployeTableProvider'
function EmployeesContent() {
    const { rows, columns, headerIcons, getRowId } = useEmployeeContext()

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    backgroundColor: '#F0F5FF',
                }}
            >
                <DataTable
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    headerIcons={headerIcons}
                />
            </div>
        </>
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
