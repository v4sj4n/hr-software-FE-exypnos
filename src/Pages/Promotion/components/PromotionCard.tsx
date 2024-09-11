import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'

export type Promotion = {
    position: string
    grade: string
    startDate: string
}

export default function PromotionCard({ id }: { id: string }) {
    const [dataset, setDataset] = useState<Promotion[]>([])
    const theme = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Promotion[]>(
                `/promotion/${id}`,
            )
            let data: Promotion[] = response.data
            setDataset(data)
            console.log('dataPromotion', data)
        }

        fetchData()
    }, [])

    return (
        <Card gap="16px" flex="1" backgroundColor="rgba(255, 255, 255, 0.7)">
            <h3>Promotion</h3>
            {dataset.map((item, index) => (
                <Card
                    key={index}
                    backgroundColor={theme.palette.background.default}
                >
                    <div>
                        <h3>Position: {item.position}</h3>
                        <p>Grade: {item.grade}</p>
                        <p>Date: {item.startDate.split('T')[0]}</p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                            gap: '10px',
                        }}
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
                        <Button
                            btnText=" "
                            type={ButtonTypes.SECONDARY}
                            width="35px"
                            height="30px"
                            color="#C70039"
                            borderColor="#C70039"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            icon={<DeleteIcon />}
                        />
                    </div>
                </Card>
            ))}
            <Button type={ButtonTypes.PRIMARY} btnText="Create New Promotion" />
        </Card>
    )
}
