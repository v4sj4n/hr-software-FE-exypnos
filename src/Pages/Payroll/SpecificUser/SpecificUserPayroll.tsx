import DataTable from '@/Components/Table/Table'
import { PayrollProviderSpecific } from './Context/SpecificUserPayrollProvider'
import style from '../styles/Payroll.module.css'
import { usePayrollContextSpecific } from './Context/SpecificUserPayrollContext'
import Input from '@/Components/Input/Index'
import { Loader } from '@/Components/Loader/Loader'
import { ForbiddenResource } from '@/Components/ForbiddenResource/ForbiddenResource'

function SpecificUserPayrollContent() {
    const {
        rows,
        columns,
        getRowId,
        fullName,
        page,
        pageSize,
        totalPages,
        handlePaginationModelChange,
        isPending,
        handleDateChange,
    } = usePayrollContextSpecific()

    return (
        <ForbiddenResource>
            <div className={style.payroll}>
                <div className={style.search}>
                    <div className={style.name}>{fullName}</div>
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
                    <Loader />
                ) : (
                    <DataTable
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                        totalPages={totalPages}
                        page={page}
                        pageSize={pageSize}
                        onPaginationModelChange={handlePaginationModelChange}
                    />
                )}
            </div>
        </ForbiddenResource>
    )
}

const SpecificUserPayroll: React.FC = () => {
    return (
        <PayrollProviderSpecific>
            <SpecificUserPayrollContent />
        </PayrollProviderSpecific>
    )
}

export default SpecificUserPayroll
