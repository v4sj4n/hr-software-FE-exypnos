import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '@/Context/AuthProvider'
import { ModalComponent } from '@/Components/Modal/Modal'
import CloseIcon from '@mui/icons-material/Close'

export type Promotion = {
    _id: string
    position: string
    grade: string
    startDate: string
}

export default function PromotionCard({ id }: { id: string }) {
    const { currentUser } = useAuth()
    const [dataset, setDataset] = useState<Promotion[]>([])
    const [showModal, setShowModal] = useState(false)
    const [promotionId, setPromotionId] = useState<string | null>(null)
    const theme = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance.get(`/promotion/${id}`)
            setDataset(response.data)
        }

        fetchData()
    }, [])

    function handleDelete(id: string): void {
        AxiosInstance.delete(`/promotion/${id}`)
        setDataset(dataset.filter((item) => item._id !== id))
        setShowModal(false)
    }

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
                    {currentUser?.role === 'hr' && (
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
                                onClick={() => {
                                    setShowModal(true)
                                    setPromotionId(item._id)
                                }}
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
                                onClick={() => {
                                    setShowModal(true)
                                    setPromotionId(item._id)
                                }}
                            />
                        </div>
                    )}
                </Card>
            ))}
            {showModal && (
                <ModalComponent
                padding='15px'
                    open={showModal}
                    handleClose={() => setShowModal(false)}
                >
                    <div style={{display:'flex', justifyContent:'space-between', margin:'0'}}>
                            <h2>Confirm Deletion</h2> 
                             <CloseIcon
                            style={{
                                cursor: 'pointer',
                                padding: '0',
                                margin: '0',
                            }}
                            onClick={() => setShowModal(false)}
                        />
                            </div>
                            <p>
                                Are you sure you want to delete this promotion?
                            </p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button
                                    type={ButtonTypes.PRIMARY}
                                    backgroundColor="#d32f2f"
                                    borderColor="#d32f2f"
                                    btnText="Confirm"
                                    width="100%"
                                    onClick={() =>
                                        handleDelete(promotionId as string)
                                    }
                                />
                                <Button
                                    btnText="Cancel"
                                    width="100%"
                                    type={ButtonTypes.SECONDARY}
                                    onClick={() => setShowModal(false)}
                                />
                            </div>
                      
                </ModalComponent>
            )}

            {currentUser?.role === 'hr' && (
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Create New Promotion"
                    onClick={() => {
                        setShowModal(true)
                    }}
                />
            )}
        </Card>
    )
}
