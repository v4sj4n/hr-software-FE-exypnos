import Card from '@/Components/Card/Card'
import style from './styles/promotion.module.css'
import ChartBar from './components/ChartBar'
import PromotionCard from './components/PromotionCard'
import Rating from './components/Rating'
import { useAuth } from '@/Context/AuthProvider'
import { useLocation } from 'react-router-dom'

export default function UserPromotion() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')

    console.log('id', id)
    if (!id) {
        return <div>Invalid User</div>
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.firstDiv}>
                    <Card padding="20px">
                        <ChartBar id={id} />
                    </Card>
                    <Rating id={id} />
                </div>
                <div className={style.thirdDiv}>
                    <PromotionCard id={id} />
                </div>
            </div>
        </>
    )
}
