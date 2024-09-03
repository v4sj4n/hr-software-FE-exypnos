import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import { useAuth } from '@/Context/AuthProvider'
import style from '../styles/promotion.module.css'
import { useNavigate } from 'react-router-dom'


export type UserPromotion = {
    _id:string
    firstName: string
    lastName: string
    position: string
    grade: string  

}
export default function UserCard() {
const { currentUser } = useAuth()
const navigate = useNavigate()

const handleNavigate = (id: string) => {
    navigate(`/userPromotion?id=${id}`)
}

    const [value, setValue] = useState<UserPromotion[] | null>(null);
  

 useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<UserPromotion[]>(
                `/user`,
            )
            let data: UserPromotion[] = response.data
            setValue(data)
            console.log("dataUser", data)
        }

        fetchData()
    }, [currentUser])
  
    return (
        <div className={style.secondDiv}>
                {value && value.map((item, index) => (
                    console.log("item", item._id),
                    <Card key={index} borderRadius='5px' onClick={() => handleNavigate(item._id)}>
                        <div>
                            <h3>{item.firstName} {item.lastName}</h3>
                            <p>Position: {item._id}</p>
                            <p>Position: {item.position}</p>
                            <p>Grade: {item.grade}</p>
                        </div>
                    </Card>
                ))}
            </div>
    )
}
