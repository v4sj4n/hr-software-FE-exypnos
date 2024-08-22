import DataTable from '@/Components/Table/Table'
import { PayrollProviderSpecific } from './Context/SpecificUserPayrollProvider'
import style from '../styles/Payroll.module.css'
import { usePayrollContextSpecific } from './Context/SpecificUserPayrollContext'
import Input from '@/Components/Input/Index'
import { EventsProvider } from '@/Pages/Events/Context/EventsContext'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import DrawerComponent from '@/Components/Drawer/Drawer'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

function SpecificUserPayrollContent() {
    const { rows, columns, getRowId, setMonth, setYear } = usePayrollContextSpecific();

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        const [yearString, monthString] = date.split('-');
        setYear(parseInt(yearString));
        setMonth(parseInt(monthString));
    };

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div className={style.payroll}>
            <div style={{display:'flex', gap:"10px", alignSelf:"flex-end"}}>
                <Button btnText='Create Payroll' type={ButtonTypes.PRIMARY} onClick={handleOpenDrawer}/>
             <Input width={250} name='Filter' type='month' label='Month & Year' IsUsername onChange={handleDateChange} />
            </div>
            <DrawerComponent open={drawerOpen} onClose={handleCloseDrawer}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>Update Payroll</div> 
                <CloseIcon
                        onClick={handleCloseDrawer}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <Input name='netSalary'label='NetSalary' IsUsername/>
                <Input name='workingDays'label='WorkingDays' IsUsername/>
                <Input name='bonus'label='Bonus' IsUsername/>
                <Input
                    IsUsername
                    label="Bonus Description"
                    type="textarea"
                    name="bonusDescription"
                    multiline
                    rows={4}
                    
                />
                <Button btnText='Create Payroll' type={ButtonTypes.PRIMARY}/>
            </DrawerComponent>
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
