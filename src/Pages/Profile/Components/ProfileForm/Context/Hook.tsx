import { useAuth } from "@/Context/AuthProvider"
import AxiosInstance from "@/Helpers/Axios"
import { UserProfileData } from "@/Pages/Employees/interfaces/Employe"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const useGetAndUpdateUserById = () => {

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

    return {handleChange, handleUpdate, user, error, isLoading, isCurrentUser, isAdmin }
}


interface EmployeePayroll {
    workingDays: number | undefined;
    socialSecurity: number | undefined;
    healthInsurance: number | undefined;
    grossSalary: number | undefined;
    month: number;
    year: number;
    userId: string;
  }
  
  export const useCreatePayroll = () => {
    const { id } = useParams<{ id: string }>();
  
    const [payroll, setPayroll] = useState<EmployeePayroll>({
      workingDays: undefined,
      socialSecurity: undefined,
      healthInsurance: undefined,
      grossSalary: undefined,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      userId: id || '', 
    });
  
    const handleChangePayroll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setPayroll((prevPayroll) => ({
        ...prevPayroll,
        [name]: value === '' ? undefined : Number(value),
      }));
    };
  
    const handleCreatePayroll = async (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const payloadToSend = {
        ...payroll,
        workingDays: payroll.workingDays ?? 0,
        socialSecurity: payroll.socialSecurity ?? 0,
        healthInsurance: payroll.healthInsurance ?? 0,
        grossSalary: payroll.grossSalary ?? 0,
      };
      
      try {
        const response = await AxiosInstance.post('/salary', payloadToSend);
        console.log('Payroll created successfully:', response.data);
      } catch (error) {
        console.error('Error creating payroll:', error);
      }
    };
  
    return { payroll, handleChangePayroll, handleCreatePayroll };
  };