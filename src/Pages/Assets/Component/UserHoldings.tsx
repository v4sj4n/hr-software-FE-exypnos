import { useContext, useCallback } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Card, CircularProgress } from '@mui/material'
import { AssetsContext } from '../AssetsContext'
import { useFetch } from '@/Hooks/useFetch'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}

export const UserHoldings = () => {
  const { searchParams, setSearchParams } = useContext(AssetsContext)

  const { data, loading, error } = useFetch(
    `asset/user/${searchParams.get('selected')}`
  )
  console.log(data)

  const handleClose = useCallback(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete('selected')
      return newParams
    })
  }, [setSearchParams])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Card sx={style}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
                <h3>{data.firstName} {data.lastName}</h3>
              {searchParams.get('selected')}
            </div>
          )}
        </Card>
      </Fade>
    </Modal>
  )
}
