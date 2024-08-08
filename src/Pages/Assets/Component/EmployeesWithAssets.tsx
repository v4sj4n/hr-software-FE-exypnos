import { useContext } from 'react'
import { useGetUsersWithAssets } from '../Hook/index'
import { AssetsContext } from '../AssetsContext'
import { CircularProgress } from '@mui/material'
import { UserWithAsset } from '../TAsset'
import Card from '@/Components/Card/Card'
import style from '../style/employeesWithAssets.module.scss'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip'
import { LaptopOutlined, MonitorOutlined } from '@mui/icons-material'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'

export const EmployeesWithAssets = () => {
  const { usersWithAssets, searchParams, setSearchParams, handleOpenModal } =
    useContext(AssetsContext)

  const dummyAssets = [
    { id: 1, type: 'monitor', sn: '1234567890', takenDate: '24 July 2022' },
    { id: 2, type: 'laptop', sn: '1234567891', takenDate: '24 July 2022' },
    {
      id: 3,
      type: 'monitor',
      sn: '1234567892',
      takenDate: '24 July 2022',
    },
  ]

  const { error, loading } = useGetUsersWithAssets(searchParams)

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

  console.log(usersWithAssets)

  const users = usersWithAssets.map(({_id, firstName, lastName, imageUrl,assets, role}: UserWithAsset) => (
    <Card key={_id} className={style.userDiv}>
        <div className={style.imageAndName}>
        <img src={imageUrl} alt={`${firstName}'s profile picture`} />
        <TooltipImproved
            text={`Click to view ${firstName}'s holdings`}
            placement="right"
            offset={[0, 5]}
          >

        <h3>{firstName} {lastName}</h3>
          </TooltipImproved>
        </div>

        <div className={style.userAssets}>
        {assets.map((asset) => {
              return (
                  <IconBasedOnAssetType asset={asset.type} />
              )
            })}

        </div>

        <div className={style.roleDiv}>
        <p>{role}</p>
      </div>
        
      {/* <div>
        <img src={user.imageUrl} />
        <div>
          
            <h2 onClick={() => userClickHandler(user._id)}>
              {user.firstName} {user.lastName}
            </h2>
          </TooltipImproved>
          <div>
            {user.assets.map((asset, index) => {
              return (
                <span key={index} className={style.assets}>
                  <IconBasedOnAssetType asset={asset.type} />
                  <p>{asset.type}</p>
                </span>
              )
            })}
          </div>
        </div>
      </div>
 */}
    </Card>
  ))
  return (
    <div className={style.mainContainer}>
      <div className={style.employeesContainer}>{users}</div>
      <div className={style.selectedUserContainer}>
        {true ? (
          <div className={style.selectedUserDetails}>
            <img
              src="https://i.scdn.co/image/ab676161000051746e835a500e791bf9c27a422a"
              alt="user's profile"
            />
            <h3>Kanye West</h3>

            <div className={style.selectedUserSimpleBio}>
              <p>kw@yeezy.com</p>|<p>+1 234 567 8901</p>|<p>Goat</p>
            </div>

            <div className={style.assetsContainer}>
              {dummyAssets.map(({ id, type, sn, takenDate }) => (
                <div key={id} className={style.assetContainer}>
                  <div className={style.assetGeneralInfo}>
                    <h4>{type}</h4>
                    <p>{sn}</p>
                  </div>
                  <div className={style.dateAndActions}>
                    <p>{takenDate}</p>
                    <Button btnText="Return" type={ButtonTypes.PRIMARY} />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
