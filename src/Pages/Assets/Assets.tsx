import Button from '../../Components/Button/Button'
import { ButtonTypes } from '../../Components/Button/ButtonTypes'
import AssetsTable from './AssetsTable'

export default function Assets() {
  return (
    <main
      style={{
        width: '100%',
        backgroundColor: 'f5f8fc',
      }}
    >
      <div>
        <h1>Assets</h1>
        <Button type={ButtonTypes.PRIMARY} btnText="Create Asset" />
      </div>
      <AssetsTable />
    </main>
  )
}
