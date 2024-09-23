import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProfileData } from './../../Employees/interfaces/Employe'
import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '@/Helpers/Axios'
import style from './../style/dashboard.module.css'

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
        <div>
            <h2>Team</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                            <img
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
                            <p>
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
