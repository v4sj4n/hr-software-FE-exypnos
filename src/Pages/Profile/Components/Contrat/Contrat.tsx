import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/style/ProfileForm.module.css'
import { ProfileProvider } from '../ProfileForm/Context/ProfileProvider'
import { useCreatePayroll, useUpdatePayroll } from '../ProfileForm/Hook/Index'
import Toast from '@/Components/Toast/Toast'

const ContratContent = () => {
    const {
        EditingPayroll,
        handleUpdateChangePayroll,
        handleUpdatePayroll,
        toastMessage,
        toastOpen,
        handleToastClose,
        toastSeverity,
    } = useUpdatePayroll()

    const {
        handleChangePayroll,
        payroll,
        handleCreatePayroll,
        createToastMessage,
        createToastSeverity,
        createToastOpen,
        handleCreateToastClose,
    } = useCreatePayroll()

    return (
        <div className={style.container} style={{width:'800px'}}>
            <Toast
                severity={EditingPayroll ? toastSeverity : createToastSeverity}
                open={EditingPayroll ? toastOpen : createToastOpen}
                message={EditingPayroll ? toastMessage : createToastMessage}
                onClose={
                    EditingPayroll ? handleToastClose : handleCreateToastClose
                }
            />
            <div style={{alignItems:'center',display:'flex', fontSize: '35px',color: '#333',fontWeight:'700',padding:'20px'}}>Payroll Information</div>
            <div className={style.forms} style={{display:'flex',flexDirection:'column'}}>
                <Input
                    IsUsername
                    type="number"
                    label="WorkingDays"
                    name="workingDays"
                    shrink={true}
                    width={300}
                    value={
                        EditingPayroll
                            ? EditingPayroll?.workingDays
                            : payroll.workingDays
                    }
                    onChange={
                        EditingPayroll
                            ? handleUpdateChangePayroll
                            : handleChangePayroll
                    }
                />
                <Input
                    IsUsername
                    shrink={true}
                    name="grossSalary"
                    label="Gross salary"
                    width={300}
                    value={
                        EditingPayroll
                            ? EditingPayroll?.grossSalary
                            : payroll.grossSalary
                    }
                    onChange={
                        EditingPayroll
                            ? handleUpdateChangePayroll
                            : handleChangePayroll
                    }
                />
                <Input
                    IsUsername
                    shrink={true}
                    width={300}
                    name="extraHours"
                    label="Extra Hours"
                    value={
                        EditingPayroll
                            ? EditingPayroll?.extraHours
                            : payroll.extraHours
                    }
                    onChange={
                        EditingPayroll
                            ? handleUpdateChangePayroll
                            : handleChangePayroll
                    }
                />
            </div>
            <div className={style.border}></div>

            <div style={{alignItems:'center',display:'flex', fontSize: '35px',color: '#333',fontWeight:'700',padding:'20px'}}>Add Bonus</div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px',
                    gap: '20px',
                }}
            >
                <Input IsUsername label="Bonus" name="bonus" shrink={true} value={
                    EditingPayroll
                        ? EditingPayroll?.bonus
                        : payroll.bonus
                }
                    onChange={
                        EditingPayroll
                            ? handleUpdateChangePayroll
                            : handleChangePayroll
                    } />
                <Input
                    IsUsername
                    label="Bonus Description"
                    name="bonusDescription"
                    
                    multiline={true}
                    rows={3}
                    value={
                        EditingPayroll
                            ? EditingPayroll?.bonusDescription
                            : payroll.bonusDescription
                    }
                    onChange={
                        EditingPayroll
                            ? handleUpdateChangePayroll
                            : handleChangePayroll
                    }
                />
                <div className={style.inputWidth}>
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText={
                        EditingPayroll ? 'Update Payroll' : 'Create Payroll'
                    }
                    onClick={
                        EditingPayroll
                            ? handleUpdatePayroll
                            : handleCreatePayroll
                    }
                    width="300px"
                />
            </div>
            </div>

            
        </div>
    )
}

const Contrat: React.FC = () => {
    return (
        <ProfileProvider>
            <ContratContent />
        </ProfileProvider>
    )
}

export default Contrat
