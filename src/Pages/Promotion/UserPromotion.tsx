import Card from '@/Components/Card/Card'
import style from './styles/promotion.module.css'
import ChartBar from './components/ChartBar'
import PromotionCard from './components/PromotionCard'
import Rating from './components/Rating'
import { useParams } from 'react-router-dom'

export default function UserPromotion() {
    const { id } = useParams<{ id: string }>()
    if (!id) {
        return <div>Invalid User</div>
    }
    return (
        <>
            <div className={style.container}>
                <div className={style.firstDiv}>
                    <Card
                        padding="20px"
                        backgroundColor="rgba(255, 255, 255, 0.7)"
                    >
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
