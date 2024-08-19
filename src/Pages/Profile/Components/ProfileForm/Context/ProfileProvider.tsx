import React, { useState, useEffect, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInstance from '../../../../../Helpers/Axios'
import { useAuth } from '../../../../../Context/AuthProvider'
import { ProfileContext } from './ProfileContext'
import { UserProfileData } from '../../../../Employees/interfaces/Employe'

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
    children,
}) => {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<UserProfileData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { userRole, currentUser } = useAuth()

    const isCurrentUser = currentUser?._id === id
    const isAdmin = userRole === 'admin' || userRole === 'hr'

    useEffect(() => {
        setIsLoading(true)
        AxiosInstance.get<UserProfileData>(`/user/${id}`)
            .then((response) => {
                setUser(response.data)
                console.log('User fetched:', response.data)
                setError(null)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setError('Failed to fetch user data')
                setUser(null)
            })
            .finally(() => setIsLoading(false))
    }, [id])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAdmin) return
        const { name, value } = event.target
        setUser((prevUser) => {
            if (!prevUser) return null
            if (name === 'email') {
                return {
                    ...prevUser,
                    auth: {
                        ...prevUser.auth,
                        email: value,
                    },
                }
            } else {
                return {
                    ...prevUser,
                    [name]: value,
                }
            }
        })
    }

    const handleUpdate = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!user) {
            setError('Only admins can update user information')
            return
        }

        const userToUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.auth.email,
            pob: user.pob,
            dob: user.dob,
            gender: user.gender,
        }

        setIsLoading(true)
        try {
            const response = await AxiosInstance.patch(
                `/user/${id}`,
                userToUpdate,
            )
            console.log('User updated successfully:', response.data)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error updating user:', error)
            setError('Failed to update user')
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        user,
        error,
        isLoading,
        isCurrentUser,
        isAdmin,
        handleChange,
        handleUpdate,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}
