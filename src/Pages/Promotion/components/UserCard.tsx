import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import style from '../styles/promotion.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'

export type UserPromotion = {
    _id: string
    firstName: string
    lastName: string
    position: string
    grade: string
    averageRating: number
}

export default function UserCard() {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const handleNavigate = (id: string): void => {
        console.log('Navigating to:', `/promotion?id=${id}`)
        navigate(`/promotion/${id}`)
    }

    const [value, setValue] = useState<UserPromotion[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching user data...')
                const response = await AxiosInstance.get<UserPromotion[]>(
                    `/project/pm/${currentUser?._id}`,
                )
                console.log('User data:', response.data)
                response.data.length? setValue(response.data) : handleNavigate(currentUser!._id.toString())
                
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className={style.userGrid}>
            {value &&
                value.map(
                    (item) =>
                        currentUser?._id?.toString() !==
                            item._id.toString() && (
                            <Card
                                key={item._id}
                                borderRadius="5px"
                                width="100%"
                                backgroundColor="rgba(255, 255, 255, 0.7)"
                                onClick={() => handleNavigate(item._id)}
                                className={style.userCard}
                            >
                                <div>
                                    <h3>
                                        {item.firstName} {item.lastName}
                                    </h3>
                                    <p>Position: {item.position}</p>
                                    <p>Grade: {item.grade}</p>
                                    <p>Rating: {item.averageRating}</p>
                                </div>
                            </Card>
                        ),
                )}
        </div>
    )
}
