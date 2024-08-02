import { useState } from 'react'
import { ModalComponent } from '@/Components/Modal/Modal'
import { useOneAsset } from '../Hook'
import EditIcon from '@mui/icons-material/Edit'
import { UpdateAssetForm } from './Form/UpdateAssetForm'
import { Asset } from '../TAsset'

interface SingleAssetProps {
  handleClose: () => void
  open: boolean
  assetId: string
}

export const SingleAsset: React.FC<SingleAssetProps> = ({
  open,
  handleClose,
  assetId,
}) => {
  const { data, error, loading } = useOneAsset<Asset>(assetId)

  const [toBeEdited, setToBeEdited] = useState(false)

  const handleEditClick = () => setToBeEdited(true)

  return (
    <ModalComponent handleClose={handleClose} open={open}>
      {error ? (
        <p>Error fetching asset</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {toBeEdited && data ? (
            <UpdateAssetForm type={data.type} id={data._id} />
          ) : (
            <>
              <h3>
                {data?.type
                  ? data.type[0].toUpperCase() + data.type.slice(1)
                  : ''}
              </h3>
              {data?.status === 'assigned' ? (
                <span>
                  Status: {data.status} -{' '}
                  <span>
                    <strong>
                      {data.userId?.firstName} {data.userId?.lastName}{' '}
                    </strong>{' '}
                  </span>{' '}
                </span>
              ) : (
                <p>Status: {data?.status}</p>
              )}
              <p
                style={{
                  fontFamily: 'monospace',
                }}
              >
                {data?.serialNumber}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '0.25rem',
                  cursor: 'pointer',
                }}
                onClick={handleEditClick}
              >
                <EditIcon />
                Edit
              </div>
            </>
          )}
        </div>
      )}
    </ModalComponent>
  )
}
