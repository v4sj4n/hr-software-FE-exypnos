import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import { useAuth } from '@/Context/AuthProvider'
import style from '../styles/promotion.module.css'
import BasicRating from './Stars'

export type Rating = {
    productivityScore: number
    teamCollaborationScore: number
    technicalSkillLevel: number
    clientFeedbackRating: number
}

export default function Rating({ id }: { id: string }) {
    const [value, setValue] = useState<Rating[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Rating[]>(
                `/ratings/user/${id}`,
            )
            let data: Rating[] = response.data
            setValue(data)
            console.log('dataRating', data)
        }

        fetchData()
    }, [])

    return (
        <Card>
            <h3
                style={{
                    padding: 0,
                    margin: ' 0 0 10px  0 ',
                    color: '#2457a3',
                }}
            >
                Rating
            </h3>
            <div className={style.secondDiv}>
                {value &&
                    value.map((item, index) => (
                        <Card key={index}>
                            <h3>Project title</h3>
                            <BasicRating
                                type={'ProductivityScore'}
                                value={item.productivityScore}
                            />
                            <BasicRating
                                type={'TeamCollaborationScore'}
                                value={item.teamCollaborationScore}
                            />
                            <BasicRating
                                type={'TechnicalSkillLevel'}
                                value={item.technicalSkillLevel}
                            />
                            <BasicRating
                                type={'ClientFeedbackRating'}
                                value={item.clientFeedbackRating}
                            />
                        </Card>
                    ))}
            </div>
        </Card>
    )
}
