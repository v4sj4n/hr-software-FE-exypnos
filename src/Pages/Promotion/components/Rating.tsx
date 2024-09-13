import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import style from '../styles/promotion.module.css'
import BasicRating from './Stars'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import EditIcon from '@mui/icons-material/Edit'

export type Rating = {
    productivityScore: number
    teamCollaborationScore: number
    technicalSkillLevel: number
    clientFeedbackRating: number
    projectId: { _id: string; name: string }
}

export default function Rating({ id }: { id: string }) {
    console.log('id', id)
    const [value, setValue] = useState<Rating[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Rating[]>(
                `/rating/user?id=${id}`,
            )
            let data: Rating[] = response.data
            setValue(data)
            console.log('dataRating', data)
        }

        fetchData()
    }, [])

    return (
<<<<<<< HEAD
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
                        <Card key={index} gap="10px">
                            <h3>{item.projectId.name}</h3>
                            <div className={style.grid}>
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
                            </div>{' '}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    width: '100%',
                                }}
=======
        <>
            <Toast
                severity={toastSeverity }
                open={toastOpen}
                message={ toastMessage }
                onClose={ handleCloseToast}
            />

            <Card backgroundColor="rgba(255, 255, 255, 0.7)">
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
                    {ratings &&
                        ratings.map((rating) => (
                            <Card
                                key={rating._id}
                                backgroundColor={
                                    theme.palette.background.default
                                }
>>>>>>> parent of 19695db (Cleaned up package.json and added a readme)
                            >
                                <Button
                                    type={ButtonTypes.SECONDARY}
                                    btnText=""
                                    width="40px"
                                    height="30px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    color="#2457A3"
                                    borderColor="#2457A3"
                                    icon={<EditIcon />}
                                />
                            </div>
                        </Card>
                    ))}
            </div>
        </Card>
    )
}
