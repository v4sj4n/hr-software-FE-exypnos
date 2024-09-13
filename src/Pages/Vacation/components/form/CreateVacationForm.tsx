import { Backdrop, Modal, Fade, Card } from '@mui/material'
import { VacationContext } from '../../VacationContext'
import { useContext } from 'react'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import style from '../../style/vacationForm.module.scss'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import Selecter from '@/Components/Input/components/Select/Selecter'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { CreateVacationSchema } from '@/Schemas/Vacations/CreateVacation.schema'
import { useCreateVacationForm } from '../../Hook'

export const CreateVacationForm = () => {
    const {
        searchParams,
        createVacationToggler,
        errors: { createError: error },
    } = useContext(VacationContext)

    const { form } = useCreateVacationForm()

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={() => console.log('modal closed')}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={searchParams.get('createVacation') !== null}>
                <Card
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',
                        width: '33vw',
                    }}
                >
                    <h3 className={style.fullName}>Vacation Request</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className={style.formContainer}
                    >
                        <form.Field
                            name="type"
                            validatorAdapter={valibotValidator()}
                            validators={{
                                onChange: CreateVacationSchema.entries.type,
                            }}
                            children={({
                                handleChange,
                                state: {
                                    value,
                                    meta: { errors },
                                },
                            }) => (
                                <div>
                                    <Selecter
                                        label="Vacation Type"
                                        name="Vacation Type"
                                        multiple={false}
                                        options={[
                                            'vacation',
                                            'sick',
                                            'personal',
                                            'maternity',
                                        ]}
                                        value={value}
                                        onChange={(
                                            newValue:
                                                | 'vacation'
                                                | 'sick'
                                                | 'personal'
                                                | 'maternity',
                                        ) => handleChange(newValue)}
                                    />
                                    {errors && <ErrorText>{errors}</ErrorText>}
                                </div>
                            )}
                        />

                        <form.Field
                            name="description"
                            validatorAdapter={valibotValidator()}
                            validators={{
                                onChange:
                                    CreateVacationSchema.entries.description,
                            }}
                            children={({
                                handleChange,
                                state: {
                                    value,
                                    meta: { errors },
                                },
                            }) => (
                                <div>
                                    <Input
                                        IsUsername
                                        name="Description"
                                        label="Description"
                                        value={value}
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }
                                    />
                                    {errors && <ErrorText>{errors}</ErrorText>}
                                </div>
                            )}
                        />

                        <form.Field
                            name="startDate"
                            validatorAdapter={valibotValidator()}
                            validators={{
                                onChange:
                                    CreateVacationSchema.entries.startDate,
                            }}
                            children={({
                                handleChange,
                                state: {
                                    value,
                                    meta: { errors },
                                },
                            }) => (
                                <div>
                                    <Input
                                        IsUsername
                                        name="Start Date"
                                        label="Start Date"
                                        type="date"
                                        placeholder="Start Date"
                                        shrink
                                        value={value}
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }
                                    />
                                    {errors && <ErrorText>{errors}</ErrorText>}
                                </div>
                            )}
                        />

                        <form.Field
                            name="endDate"
                            validatorAdapter={valibotValidator()}
                            validators={{
                                onChange: CreateVacationSchema.entries.endDate,
                            }}
                            children={({
                                handleChange,
                                state: {
                                    value,
                                    meta: { errors },
                                },
                            }) => (
                                <div>
                                    <Input
                                        IsUsername
                                        name="End Date"
                                        label="End Date"
                                        type="date"
                                        placeholder="End Date"
                                        shrink
                                        value={value}
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }
                                    />
                                    {errors && <ErrorText>{errors}</ErrorText>}
                                </div>
                            )}
                        />

                        <div className={style.buttonsContainer}>
                            <Button
                                type={ButtonTypes.PRIMARY}
                                btnText={`${form.state.isSubmitting ? 'Submitting' : 'Submit'}`}
                                disabled={form.state.isSubmitting}
                                isSubmit
                            />
                            <Button
                                type={ButtonTypes.SECONDARY}
                                btnText="Cancel"
                                onClick={createVacationToggler}
                            />
                        </div>
                        {error && <ErrorText>{error}</ErrorText>}
                    </form>
                </Card>
            </Fade>
        </Modal>
    )
}
