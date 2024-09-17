import DataTable from '@/Components/Table/Table'
import { PayrollProviderSpecific } from './Context/SpecificUserPayrollProvider'
import style from '../styles/Payroll.module.css'
import { usePayrollContextSpecific } from './Context/SpecificUserPayrollContext'
import Input from '@/Components/Input/Index'
import { RingLoader } from 'react-spinners'

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
        <div className={style.payroll}>
            <div className={style.search}>
            <div className={style.name}>  
                  {fullName}
                </div>
                <Input
                    width={250}
                    name="Filter"
                    type="month"
                    label="Month & Year"
                    IsUsername
                    onChange={handleDateChange}
                />
            </div>
            {isPending ? 
                <div className={style.ring}>
                    <RingLoader />
                </div> :  <DataTable
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                totalPages={totalPages}
                page={page}
                pageSize={pageSize}
                onPaginationModelChange={handlePaginationModelChange}
            /> }
        </div>
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
