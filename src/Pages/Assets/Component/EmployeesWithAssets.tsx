import { useContext } from 'react'
import { useGetUsersWithAssets as useData } from '../Hook/index'
import { AssetsContext } from '../AssetsContext'
import { CircularProgress } from '@mui/material'
import { UserWithAsset } from '../TAsset'
import Card from '@/Components/Card/Card'
import style from '../style/employeesWithAssets.module.scss'

export const EmployeesWithAssets = () => {
  const { usersWithAssets, searchParams, setSearchParams, handleOpenModal } =
    useContext(AssetsContext)

  const { error, loading } = useData(searchParams)

  if (error) return <div>Error: {error}</div>
  if (loading) return <CircularProgress />

  const users = usersWithAssets.map((user: UserWithAsset) => (
    <Card key={user._id} className={style.userDiv}>
      <img src={user.imageUrl} style={{}} />
      <div>
        <h2
          onClick={() => {
            setSearchParams(() => {
              const newParams = new URLSearchParams()
              if (user._id) {
                newParams.set('selected', user._id)
              } else {
                newParams.delete('selected')
              }
              return newParams
            })
            handleOpenModal()
          }}

        >
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.role}</p>
      </div>
    </Card>
  ))
  return <div className={style.mainContainer}>{users}</div>
}
