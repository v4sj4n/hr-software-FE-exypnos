import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = [
    'Determine clients needs',
    'Team selecetion',
    'Development',
    'Daily meetings',
    'Deployment',
    'Ongoing & Maintenance',
]

export default function HorizontalLinearAlternativeLabelStepper() {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper sx={{ width: '100%' }} activeStep={6} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}
