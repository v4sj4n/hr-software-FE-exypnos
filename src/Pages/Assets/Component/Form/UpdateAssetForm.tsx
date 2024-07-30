import { ModalComponent } from '@/Components/Modal/Modal'
// import { ErrorText } from '../Component/ErrorText'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useOneAsset } from '../Hook'
import EditIcon from '@mui/icons-material/Edit'

interface UpdateAssetModalFormProps {
  handleClose: () => void
  open: boolean
  assetId: string
}

export const UpdateAssetModalForm: React.FC<UpdateAssetModalFormProps> = ({
  open,
  handleClose,
  assetId,
}) => {
  const { data, error, loading } = useOneAsset(assetId)
  console.log(data)
  return (
    <ModalComponent handleClose={handleClose} open={open}>
      {error ? (
        <p>Error fetching asset</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{data?.type[0].toUpperCase() + data?.type.slice(1)}</h3>
          {data?.status == 'assigned' ? (
            <span style={{}}>
              Status: {data?.status} -{' '}
              <span>
                <strong>
                  {data.userId.firstName} {data.userId.lastName}{' '}
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
          <div>
            <EditIcon />
            Edit
          </div>
        </div>
      )}
    </ModalComponent>
  )
}
