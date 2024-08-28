import Card from '@/Components/Card/Card'
import style from './styles/promotion.module.css'
import ChartBar from './components/ChartBar'

export default function Promotion() {
    return (
        <>
            <div className={style.container}>
                <div className={style.firstDiv}>
                    <Card padding="20px">
                        <ChartBar />
                    </Card>
                    <Card>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nemo iusto omnis blanditiis sapiente nulla,
                            fugit debitis veniam dolorem dicta repellendus earum
                            eum impedit ipsam porro minus numquam. Animi,
                            repellendus vel.
                        </p>
                    </Card>
                </div>
                <div className={style.secondDiv}>
                    <Card>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Rem dolorem quos, ratione suscipit modi
                            obcaecati et, soluta quo enim ipsum, amet sunt quas
                            autem sint odit accusamus quia ipsam aliquid!
                        </p>
                    </Card>
                </div>
            </div>
        </>
    )
}
