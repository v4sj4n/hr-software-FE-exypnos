import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/ProfileForm.module.css'
import { ProfileProvider } from '../ProfileForm/Context/ProfileProvider'
import { useUpdatePayroll } from '../ProfileForm/Context/Hook'

const ContratContent = () => {
    const { payrollId, handleChangePayroll, handleUpdatePayroll } =
        useUpdatePayroll()

    return (
        <div className={style.container}>
            <div className={style.title}>Payroll Information</div>
            <div className={style.forms}>
                <Input
                    IsUsername
                    type="number"
                    label="WorkingDays"
                    name="workingDays"
                    shrink={true}
                    width={350}
                    value={payrollId?.workingDays || ''}
                    onChange={handleChangePayroll}
                />
                <Input
                    IsUsername
                    shrink={true}
                    name="grossSalary"
                    label="Gross salary"
                    width={350}
                    value={payrollId?.grossSalary}
                    onChange={handleChangePayroll}
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
                    btnText="Save Changes"
                    onClick={handleUpdatePayroll}
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
