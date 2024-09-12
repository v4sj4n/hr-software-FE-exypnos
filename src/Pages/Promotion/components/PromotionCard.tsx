import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { ModalComponent } from '@/Components/Modal/Modal'
import { useAuth } from '@/Context/AuthProvider'
import Input from '@/Components/Input/Index'
import Selecter from '@/Components/Input/components/Select/Selecter'
import Toast from '@/Components/Toast/Toast'

export type Promotion = {
    _id: string
    position: string
    grade: string
    startDate: string
}

export default function PromotionCard({ id }: { id: string }) {
    const { currentUser } = useAuth()
    const [promotions, setPromotions] = useState<Promotion[]>([])
    const [showModal, setShowModal] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )
    const [modalType, setModalType] = useState<
        'create' | 'edit' | 'delete' | null
    >(null)
    const [selectedPromotion, setSelectedPromotion] =
        useState<Promotion | null>(null)
    const [formData, setFormData] = useState({
        position: '',
        grade: '',
        startDate: '',
    })
    const PositionType = [
        'hr',
        'ceo',
        'designer',
        'backend_developer',
        'frontend_developer',
        'fullstack_developer',
        'tester',
        'devops',
    ]

    const GradeType = ['junior', 'mid', 'senior']
    const theme = useTheme()

    useEffect(() => {
        fetchPromotions()
    }, [id])

    const fetchPromotions = async () => {
        try {
            const response = await AxiosInstance.get(`/promotion/user/${id}`)
            setPromotions(response.data)
        } catch (error) {
            console.error('Error fetching promotions:', error)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCreate = async () => {
        try {
            setShowModal(false)
            await AxiosInstance.post(`/promotion`, {
                userId: id,
                grade: formData.grade,
                position: formData.position,
                startDate: formData.startDate,
            })
            fetchPromotions()
            setToastOpen(true)
            setToastMessage('Promotion created successfully')
            setToastSeverity('success')
        } catch (error) {
            setToastOpen(true)
            setToastMessage('Error creating promotion')
            setToastSeverity('error')
            console.error('Error creating promotion:', error)
        }
    }

    const handleUpdate = async () => {
        if (!selectedPromotion) return
        try {
            setShowModal(false)
            await AxiosInstance.patch(
                `/promotion/${selectedPromotion._id}`,
                formData,
            )
            fetchPromotions()
            setToastOpen(true)
            setToastMessage('Rating updated successfully')
            setToastSeverity('success')
        } catch (error) {
            setToastOpen(true)
            setToastMessage('Error updating promotion')
            setToastSeverity('error')
            console.error('Error updating promotion:', error)
        }
    }

    const handleDelete = async () => {
        if (!selectedPromotion) return
        try {
            setShowModal(false)
            await AxiosInstance.delete(`/promotion/${selectedPromotion._id}`)
            setPromotions(
                promotions.filter((item) => item._id !== selectedPromotion._id),
            )
            setToastOpen(true)
            setToastMessage('Rating delete successfully')
            setToastSeverity('success')
        } catch (error) {
            setToastOpen(true)
            setToastMessage('Error deleting promotion')
            setToastSeverity('error')
            console.error('Error deleting promotion:', error)
        }
    }

    const openModal = (
        type: 'create' | 'edit' | 'delete',
        promotion?: Promotion,
    ) => {
        setModalType(type)
        setSelectedPromotion(promotion || null)
        if (type === 'edit' && promotion) {
            setFormData({
                position: promotion.position,
                grade: promotion.grade,
                startDate: promotion.startDate.split('T')[0],
            })
        } else {
            setFormData({ position: '', grade: '', startDate: '' })
        }
        setShowModal(true)
    }

    const handleCloseToast = () => {
        setToastOpen(false)
    }

    return (
        <>
        <Toast
            severity={toastSeverity }
            open={toastOpen}
            message={ toastMessage }
            onClose={ handleCloseToast}
        />
        <Card gap="16px" flex="1" backgroundColor="rgba(255, 255, 255, 0.7)">
            <h3>Promotion</h3>
            {promotions.map((item) => (
                <Card
                    key={item._id}
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
                                onClick={() => openModal('edit', item)}
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
                                onClick={() => openModal('delete', item)}
                            />
                        </div>
                    )}
                </Card>
            ))}
            {showModal && (
                <ModalComponent
                    padding="15px"
                    open={showModal}
                    handleClose={() => {}}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            margin: '0',
                        }}
                    >
                        <h2>
                            {modalType === 'delete'
                                ? 'Confirm Deletion'
                                : `${modalType === 'edit' ? 'Edit' : 'Create'} Promotion`}
                        </h2>
                        <CloseIcon
                            style={{
                                cursor: 'pointer',
                                padding: '0',
                                margin: '0',
                            }}
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    {modalType === 'delete' ? (
                        <>
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
                                    onClick={handleDelete}
                                />
                                <Button
                                    btnText="Cancel"
                                    width="100%"
                                    type={ButtonTypes.SECONDARY}
                                    onClick={() => setShowModal(false)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    flexDirection: 'column',
                                    margin: '10px 0 10px 0',
                                }}
                            >
                                <Selecter
                                    name="position"
                                    label="Position"
                                    multiple={false}
                                    value={formData.position}
                                    options={PositionType}
                                    onChange={(newValue) =>
                                        setFormData({
                                            ...formData,
                                            position: newValue as string,
                                        })
                                    }
                                />
                                <Selecter
                                    name="grade"
                                    label="Grade"
                                    multiple={false}
                                    value={formData.grade}
                                    options={GradeType}
                                    onChange={(newValue) =>
                                        setFormData({
                                            ...formData,
                                            grade: newValue as string,
                                        })
                                    }
                                />
                                <Input
                                    IsUsername
                                    type="datetime-local"
                                    name="startDate"
                                    label="Start Date"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button
                                type={ButtonTypes.PRIMARY}
                                btnText={
                                    modalType === 'edit' ? 'Update' : 'Create'
                                }
                                onClick={
                                    modalType === 'edit'
                                        ? handleUpdate
                                        : handleCreate
                                }
                            />
                        </>
                    )}
                </ModalComponent>
            )}
            {currentUser?.role === 'hr' && (
                <Button
                    type={ButtonTypes.PRIMARY}
                    btnText="Create New Promotion"
                    onClick={() => openModal('create')}
                />
            )}
        </Card>
        </>
    )
}
