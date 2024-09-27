import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '@/ProtectedRoute/Context/AuthContext';
import { useParams } from 'react-router-dom';
import ProfileForm from './Components/ProfileForm/ProfileForm';
import Contrat from './Components/Contrat/Contrat';
import ChangePass from './Components/ChangePass/ChangePass';
import Image from '@/Components/uploads/uploadImage';
import { Avatar } from '@mui/material';
import { useFileUpload } from './Context/Hook';
import { useProfile } from './Components/ProfileForm/Context/ProfileContext';
import { FileUploadProvider } from './Context/FileUpoadProvider';
import { ProfileProvider } from './Components/ProfileForm/Context/ProfileProvider';
import style from './style/Profile.module.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function ProfileContent() {
    const [value, setValue] = React.useState(0);
    const { currentUser } = useAuth();
    const { id } = useParams();
    const { uploadImage, previewImage } = useFileUpload()
    const { user, isCurrentUser } = useProfile()

    const currentUserId = currentUser?._id === id;
    const hr = currentUser?.role === 'hr';

    const handleChangeProfile = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    React
    const getInformationHeading = () => {
        switch(value) {
            case 0:
                return "Profile Information";
            case 1:
                return "Payroll Information";
            case 2:
                return "Change Password";
            default:
                return "";
        }
    };

    const tabStyle = {
        flex: 1,
        maxWidth: 'none',
        textTransform: 'none' as const,
        fontWeight: 'normal',
        fontSize: '14px', 
        fontFamily: "Outfit, sans-serif",
        color: '#000',
        opacity: 0.7,
        minHeight: 'unset',  
    };

    const selectedTabStyle = {
        ...tabStyle,
        opacity: 1,
        fontWeight: 'bold',
    };


    return (
        <div style={{margin:"auto", left:"0", display:"flex", justifyContent:'center'}}>
            <Box sx={{ width: '66.5%', bgcolor: 'background.paper', padding:"20px", borderRadius:"5px", border:"1px solid #ebebeb" }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding:"20px"
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                        }}
                    >
                        <Avatar
                            src={previewImage || user?.imageUrl}
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                            }}
                        />

                        {isCurrentUser && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '5px',
                                    right: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                    padding: '5px',
                                }}
                            >
                                <Image onChange={uploadImage} />
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <div style={{ fontSize: '30px', color: '#000000' }}>
                            {`${user?.firstName} ${user?.lastName}`}
                        </div>
                        <div style={{ color: '#000000' }}>
                            {user?.auth.email}
                        </div>
                    </div>
                </div>
                <div className={style.title}>{getInformationHeading()}</div>
                <Box sx={{ 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: "5px", 
                    maxWidth: '100%',  
                    margin: '0 ',  
                    minHeight: 'unset',
                    padding: "0",
                    '& ..css-19kzrtu': { 
                        padding: '0 !important', 
                    },
                }}>
                    <Tabs
                        value={value}
                        onChange={handleChangeProfile}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                            '& .MuiTabs-flexContainer': {
                                backgroundColor: 'transparent',
                                borderRadius: '5px',
                                padding: '5px',
                                minHeight: 'unset', 
                            },
                        }}
                    >
                        <Tab 
                            label="Profile" 
                            style={value === 0 ? selectedTabStyle : tabStyle}
                            sx={{
                                borderRadius: '5px',
                                backgroundColor: value === 0 ? 'white' : 'transparent',
                                '&.Mui-selected': {
                                    backgroundColor: 'white',
                                },
                                '&:hover': {
                                    backgroundColor: value === 0 ? 'white' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        />
                        {(currentUserId || hr) && (
                            <Tab 
                                label="Payroll" 
                                style={value === 1 ? selectedTabStyle : tabStyle}
                                sx={{
                                    borderRadius: '5px',
                                    backgroundColor: value === 1 ? 'white' : 'transparent',
                                    '&.Mui-selected': {
                                        backgroundColor: 'white',
                                    },
                                    '&:hover': {
                                        backgroundColor: value === 1 ? 'white' : 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            />
                        )}
                        {currentUserId && (
                            <Tab 
                                label="Change Password" 
                                style={value === 2 ? selectedTabStyle : tabStyle}
                                sx={{
                                    borderRadius: '5px',
                                    backgroundColor: value === 2 ? 'white' : 'transparent',
                                    '&.Mui-selected': {
                                        backgroundColor: 'white',
                                    },
                                    '&:hover': {
                                        backgroundColor: value === 2 ? 'white' : 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            />
                        )}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ProfileForm />
                </TabPanel>
                {(currentUserId || hr) && (
                    <TabPanel value={value} index={1}>
                        <Contrat />
                    </TabPanel>
                )}
                {currentUserId && (
                    <TabPanel value={value} index={2}>
                        <ChangePass />
                    </TabPanel>
                )}
            </Box>
        </div>
    );
}

const Profile: React.FC = () => {
    return (
        <FileUploadProvider>
            <ProfileProvider>
                <ProfileContent />
            </ProfileProvider>
        </FileUploadProvider>
    )
}

export default Profile;