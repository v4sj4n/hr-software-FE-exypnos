import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Contrat from './Components/Contrat/Contrat'
import ProfileForm from './Components/ProfileForm/ProfileForm'
import ChangePass from './Components/ChangePass/ChangePass'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: '25px 50px' }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

export default function Profile() {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                borderRadius: '15px',
                boxShadow: '0px 3px 9px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    '& .MuiTabs-indicator': { right: 'auto', left: 0 },
                    '& .MuiTab-root': {
                        alignItems: 'flex-start',
                        marginBottom: 5,
                        marginRight: 5,
                        mt: 1.5,
                        fontFamily: 'Outfit, sans-serif',
                    },
                }}
            >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="payroll" {...a11yProps(1)} />
                <Tab label="Change Password" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Contrat />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ChangePass />
            </TabPanel>
        </Box>
    )
}
