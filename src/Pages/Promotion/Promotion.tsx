import Card from '@/Components/Card/Card'
import style from './styles/promotion.module.css'
import ChartBar from './components/ChartBar'
import PromotionCard from './components/PromotionCard'
import Rating from './components/Rating'

export default function Promotion() {
    return (
        <>
            <div className={style.container}>
                <div className={style.firstDiv}>
                    <Card padding="20px">
                        <ChartBar />
                    </Card>
                    <Card>
                       <PromotionCard />
                    </Card>
                </div>
                        <Rating />
                
            </div>
        </>
    )
}
