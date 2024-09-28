import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProfileData } from './../../Employees/interfaces/Employe'
import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '@/Helpers/Axios'
import style from './../style/dashboard.module.css'
import { Avatar, Typography } from '@mui/joy'

const EmployeeSection: React.FC = () => {
    const navigate = useNavigate()

    const fetchUserProfile = async () => {
        const response = await AxiosInstance.get('/user')
        console.log('Fetched user profile:', response.data)
        return response.data
    }
    const { data: UserProfileData } = useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
    })
    console.log('UserProfileData', UserProfileData)

    return (
        <div style={{ paddingBottom: '20px' }}>
            <Typography level="h3" color="primary" gutterBottom>
                Team
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {UserProfileData?.map((employee: UserProfileData) => (
                    <div
                        key={employee._id}
                        style={{
                            margin: '10px',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                        }}
                    >
                        <div className={style.employeeImage}>
                            <Avatar
                                src={employee.imageUrl}
                                alt={`${employee.firstName} ${employee.lastName}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    navigate(`/profile/${employee._id}`)
                                }
                            />
                            <p style={{ margin: '3px' }}>
                                {employee.firstName} {employee.lastName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmployeeSection
