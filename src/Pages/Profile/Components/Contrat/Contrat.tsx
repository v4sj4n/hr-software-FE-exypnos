import Input from '../../../../Components/Input/Index'
import { ButtonTypes } from '../../../../Components/Button/ButtonTypes'
import Button from '../../../../Components/Button/Button'
import style from '../ProfileForm/ProfileForm.module.css'
// import Selecter from '@/Components/Input/components/Select/Selecter'
import { ProfileProvider } from '../ProfileForm/Context/ProfileProvider'
import { useCreatePayroll } from '../ProfileForm/Context/Hook'

const ContratContent = () => {

    // const typesofCurrentcy = ['USD', 'EUR', 'GBP']

    const {payroll, handleChangePayroll, handleCreatePayroll} = useCreatePayroll()

    return (
        <div className={style.container}>
            <div className={style.title}>Payroll Information</div>
            <div className={style.forms}>
        
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        type='number'
                        label="WorkingDays"
                        name="workingDays"
                        value={payroll.workingDays}
                        onChange={handleChangePayroll}
                    />
                </div>
            </div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        label="Social Security"
                        name="socialSecurity"
                        value={payroll.socialSecurity}
                        onChange={handleChangePayroll}
                    />
                </div>
            </div>
            <div className={style.border}></div>

            <div className={style.forms}>
                <div className={style.inputWidth}>
                <Input
                        IsUsername
                        label="Health Insurance"
                        name="healthInsurance"
                        value={payroll.healthInsurance}
                        onChange={handleChangePayroll}
                    />
                </div>
                <div className={style.inputWidth}>
                {/* <Selecter
                   
                   options={typesofCurrentcy}
                   multiple={false}
                   name="currency"
                   label="Currency"
               /> */}
                </div>
            </div>

            <div className={style.border}></div>

            <div className={style.forms}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '350px',
                        gap: '20px',
                    }}
                >
                    {/* <Input
                        IsUsername
                        label="Work Position"
                        name="Work Position"
                        value={payroll.workingDays}
                        onChange={handleChangePayroll}
                    />
                */}
                </div>
                <div className={style.inputWidth}>
                    <Input
                        IsUsername
                        name="grossSalary"
                        label="Gross salary"
                        value={payroll.grossSalary}
                        onChange={handleChangePayroll}
                    />
                </div>
            </div>

            <div className={style.border}></div>
            <div className={style.inputWidth}>
                <Button type={ButtonTypes.PRIMARY} btnText="Save Changes" onClick={handleCreatePayroll}/>
            </div>
        </div>
    )
}

const Contrat: React.FC = () => {
    return (
        <ProfileProvider  >
            <ContratContent />
        </ProfileProvider>
    )
}


export default Contrat
