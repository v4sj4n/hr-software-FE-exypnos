import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/ProfileForm.module.css'
import { ProfileProvider } from '../ProfileForm/Context/ProfileProvider'
import { useCreatePayroll, useUpdatePayroll } from '../ProfileForm/Context/Hook'
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
        <div className={style.container}>
            <Toast
                severity={EditingPayroll ? toastSeverity : createToastSeverity}
                open={EditingPayroll ? toastOpen : createToastOpen}
                message={EditingPayroll ? toastMessage : createToastMessage}
                onClose={
                    EditingPayroll ? handleToastClose : handleCreateToastClose
                }
            />
            <div className={style.title}>Payroll Information</div>
            <div className={style.forms}>
                <Input
                    IsUsername
                    type="number"
                    label="WorkingDays"
                    name="workingDays"
                    shrink={true}
                    width={350}
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
                    width={350}
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
            </div>
            <div className={style.border}></div>

            <div className={style.title}>Add Bonus</div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '350px',
                    gap: '20px',
                }}
            >
                <Input IsUsername label="Bonus" name="bonus" />
                <Input
                    IsUsername
                    label="Bonus Description"
                    name="bonusDescription"
                    type="textarea"
                    multiline={true}
                    rows={3}
                />
            </div>

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
                    width="350px"
                />
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
