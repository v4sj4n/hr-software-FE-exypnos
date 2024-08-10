import { useContext } from 'react'
import { getHoldings } from '../Hook/index.ts'
import { HoldingsContext } from '../HoldingsContext'
import { CircularProgress } from '@mui/material'
import { UserWithHoldings } from '../TAsset'
import Card from '@/Components/Card/Card'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { LaptopOutlined, MonitorOutlined } from '@mui/icons-material'
import style from '../style/employeesWithHoldings.module.scss'
import { useQuery } from '@tanstack/react-query'

export const EmployeesWithHoldings = () => {
  const { searchParams, setSearchParams, handleOpenModal } =
    useContext(HoldingsContext)

  const query = useQuery({
    queryKey: [
      'usersWithHoldings',
      searchParams.get('users'),
      searchParams.get('search'),
    ],
    queryFn: () =>
      getHoldings(
        searchParams.get('users') || '',
        searchParams.get('search') || ''
      ),
  })

  console.log(query)
  console.log(query.data)

  const userClickHandler = (userId: string) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      if (userId) {
        newParams.set('selected', userId)
      } else {
        newParams.delete('selected')
      }
      return newParams
    })
    handleOpenModal()
  }

  if (query.error) return <div>Error: {query.error.message}</div>
  if (query.isFetching)
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    )

  const users = query.data.map(
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

  return <div className={style.employeesContainer}>{users}</div>
}

const IconBasedOnAssetType = ({ asset }: { asset: string }) => {
  if (asset === 'laptop') return <LaptopOutlined />
  if (asset === 'monitor') return <MonitorOutlined />
  return null
}
