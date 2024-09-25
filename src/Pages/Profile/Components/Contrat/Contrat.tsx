import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/style/ProfileForm.module.css'
import { ProfileProvider } from '../ProfileForm/Context/ProfileProvider'
import { useCreatePayroll, useUpdatePayroll } from '../ProfileForm/Hook/Index'
import Toast from '@/Components/Toast/Toast'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'

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

    const { currentUser } = useAuth()
    const isHr = currentUser?.role === 'hr'

    return (
        <div >
            <Toast
                severity={EditingPayroll ? toastSeverity : createToastSeverity}
                open={EditingPayroll ? toastOpen : createToastOpen}
                message={EditingPayroll ? toastMessage : createToastMessage}
                onClose={
                    EditingPayroll ? handleToastClose : handleCreateToastClose
                }
            />
            <div
                style={{
                   
                    display: 'flex',
                    fontSize: '25px',
                    color: '#333',
                    fontWeight: '700',
                    marginBottom: '20px',

                }}
            >
                Payroll 
            </div>
             <div style={{display:"flex", gap:"20px", marginBottom:"20px"}}>
                <Input
                    IsUsername
                    type="number"
                    label="WorkingDays"
                    disabled={!isHr}
                    name="workingDays"
                    shrink={true}
                    width="430px"
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
                    disabled={!isHr}
                    label="Gross salary"
                      width="430px"
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
                <Input
                    IsUsername
                    shrink={true}
                             width="430px"
                    disabled={!isHr}
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
           
            <div className={style.border}></div>

            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: '25px',
                    color: '#333',
                    fontWeight: '700',
                    margin: '20px 0',
                }}
            >
                Add Bonus
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width:"430px",
                    gap: '20px',
                }}
            >
                <Input
                    IsUsername
                    label="Bonus"
                    name="bonus"
                    shrink={true}
                    value={
                        EditingPayroll ? EditingPayroll?.bonus : payroll.bonus
                    }
                    disabled={!isHr}
                    onChange={
                        EditingPayroll
                            ? handleUpdateChangePayroll
                            : handleChangePayroll
                    }
                />
                <Input
                    IsUsername
                    label="Bonus Description"
                    name="bonusDescription"
                    disabled={!isHr}
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
                    {isHr && (
                        <Button
                            type={ButtonTypes.PRIMARY}
                            btnText={
                                EditingPayroll
                                    ? 'Update Payroll'
                                    : 'Create Payroll'
                            }
                            onClick={
                                EditingPayroll
                                    ? handleUpdatePayroll
                                    : handleCreatePayroll
                            }
                                  width="430px"
                        />
                    )}
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
