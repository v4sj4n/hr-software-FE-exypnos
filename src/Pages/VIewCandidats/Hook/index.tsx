import { useEffect, useState } from "react"
import AxiosInstance from "../../../Helpers/Axios";
import { useParams } from "react-router-dom";
import { CandidateView, ModalAction } from "../interfaces/ViewCandidate";

export const useApplicantById = () => {
    const [applicant, setApplicant] = useState<CandidateView | null>(null)
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState<ModalAction | ''>('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    

    const handleAccept = () => {
      if (modalAction === 'accept') {
        setShowConfirmationModal(true);
      }
      setShowModal(false);
    };

    const handleCloseModal = async () => {
      setShowModal(false)
    }

    const handleCloseConfirmationModal = () => {
      setShowConfirmationModal(false);
    };

    const handleOpenModal = (action: ModalAction) => {
        setModalAction(action);
        setShowModal(true);
    }

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        AxiosInstance.get<CandidateView>(`/applicants/${id}`)
          .then(response => {
            setApplicant(response.data);
            console.log('Applicant fetched:', response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setApplicant(null);
          })
    }, [id]);

    return { applicant,  showModal, handleCloseModal, handleOpenModal, modalAction, handleCloseConfirmationModal, showConfirmationModal, handleAccept };
}