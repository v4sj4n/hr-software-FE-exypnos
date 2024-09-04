import { useEffect, useState, useCallback } from 'react'
import AxiosInstance from '../../../Helpers/Axios'
import { useParams } from 'react-router-dom'
import { CandidateView, ModalAction } from '../interfaces/ViewCandidate'

export const useApplicantById = () => {
    const [applicant, setApplicant] = useState<CandidateView | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [modalAction, setModalAction] = useState<ModalAction | ''>('')
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [firstInterviewDate, setFirstInterviewDate] = useState('')
    const [customMessage, setCustomMessage] = useState('')
    const [customSubject, setCustomSubject] = useState('')

    const { id } = useParams<{ id: string }>()

    const fetchApplicant = useCallback(async () => {
        try {
            const response = await AxiosInstance.get<CandidateView>(
                `/applicant/${id}`,
            )
            setApplicant(response.data)
        } catch (error) {
            setApplicant(null)
        }
    }, [id])

    useEffect(() => {
        fetchApplicant()
    }, [fetchApplicant])

    const handleConfirm = () => {
        if (modalAction === 'active') {
            handleAccept()
            setShowConfirmationModal(true)
            // } else if (modalAction === 'reject') {
            //     handleReject()
        }
        setShowModal(false)
    }

    // const handleReject = async () => {
    //     try {
    //         await AxiosInstance.patch(`/applicant/${id}`, {
    //             status: 'rejected',
    //         })
    //         fetchApplicant()
    //     } catch (error) {
    //         console.error('Error rejecting applicant:', error)
    //     }
    // };
    const handleAccept = async () => {
        try {
            await AxiosInstance.patch(`/applicant/${id}`, {
                status: 'active',
            })
            fetchApplicant()
        } catch (error) {
            console.error('Error accepting applicant:', error)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false)
    }

    const handleOpenModal = (action: ModalAction) => {
        setModalAction(action)
        setShowModal(true)
    }

    const handleSend = async () => {
        if (!applicant) return

        try {
            await AxiosInstance.patch(`/applicant/${id}`, {
                // status: 'accepted',
                firstInterviewDate: firstInterviewDate,
                customMessage: customMessage,
                customSubject: customSubject,
            })
            fetchApplicant()
            setShowConfirmationModal(false)
        } catch (error) {
            console.error('Error updating applicant:', error)
        }
    }

    return {
        applicant,
        showModal,
        handleCloseModal,
        handleOpenModal,
        modalAction,
        handleCloseConfirmationModal,
        showConfirmationModal,
        handleConfirm,
        firstInterviewDate,
        setFirstInterviewDate,
        customMessage,
        setCustomMessage,
        handleSend,
        handleAccept,
        customSubject,
        setCustomSubject,
    }
}
