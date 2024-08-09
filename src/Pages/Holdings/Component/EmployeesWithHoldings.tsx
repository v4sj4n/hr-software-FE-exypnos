import { useContext } from 'react'
import { useGetUsersWithHoldings } from '../Hook/index'
import { HoldingsContext } from '../HoldingsContext'
import { CircularProgress } from '@mui/material'
import { UserWithHoldings } from '../TAsset'
import Card from '@/Components/Card/Card'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { LaptopOutlined, MonitorOutlined } from '@mui/icons-material'
import { UserHoldings } from './UserHoldings'
import style from '../style/employeesWithHoldings.module.scss'

export const EmployeesWithHoldings = () => {
  const { usersWithHoldings, searchParams, setSearchParams, handleOpenModal } =
    useContext(HoldingsContext)

  const { error, loading } = useGetUsersWithHoldings(searchParams)

  if (error) return <div>Error: {error}</div>
  if (loading) return <CircularProgress />

  const userClickHandler = (userId: string) => {
    setSearchParams(() => {
      const newParams = new URLSearchParams()
      if (userId) {
        newParams.set('selected', userId)
      } else {
        newParams.delete('selected')
      }
      return newParams
    })
    handleOpenModal()
  }

  console.log(usersWithHoldings)

  const users = usersWithHoldings.map(
    ({
      _id,
      firstName,
      lastName,
      imageUrl,
      assets,
      role,
    }: UserWithHoldings) => (
      <Card key={_id} className={style.userDiv}>
        <div className={style.imageAndName}>
          <img src={imageUrl} alt={`${firstName}'s profile picture`} />
          <TooltipImproved
            text={`Click to view ${firstName}'s holdings`}
            placement="right"
            offset={[0, 5]}
          >
            <h3 onClick={() => userClickHandler(_id)}>
              {firstName} {lastName}
            </h3>
          </TooltipImproved>
        </div>

        <div className={style.userAssets}>
          {assets.map((asset) => {
            return <IconBasedOnAssetType asset={asset.type} />
          })}
        </div>

        <div className={style.roleDiv}>
          <p>{role}</p>
        </div>
      </Card>
    )
  )
  return (
    <div className={style.mainContainer}>
      <div className={style.employeesContainer}>{users}</div>
      <div className={style.selectedUserContainer}>
        {searchParams.get('selected') ? (
          <UserHoldings />
        ) : (
          <div className={style.noItemsOnSelectedUser}>
            <p>No User selected</p>
          </div>
        )}
      </div>
    </div>
  )
}

const IconBasedOnAssetType = ({ asset }: { asset: string }) => {
  if (asset === 'laptop') return <LaptopOutlined />
  if (asset === 'monitor') return <MonitorOutlined />
  return null
}
