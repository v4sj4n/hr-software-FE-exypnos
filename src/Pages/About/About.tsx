import Card from '@/Components/Card/Card'
import image from "../../../public/Images/HeroImage.png"

export default function About() {
    return (
        <>
            <Card >
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <h1>
                        Tiutull
                    </h1>
                    <div style={{maxWidth:"500px"}}>
                    CodeVider is an Albanian-based web development outsourcing company that offers full-stack development services. They specialize in building commercial-grade web applications using technologies like React, Angular, Node.js, and Python. CodeVider provides services in front-end, back-end, and database development, emphasizing cost savings, time efficiency, and flexibility. They follow an agile methodology and offer seamless communication with dedicated project managers. Their services cater to businesses looking to outsource software development to reduce costs and time-to-market.
                    
                    </div>
                    <div style={{marginTop:10}}> For more details, visit <span><a href='https://www.codevider.com/' target="_blank">CodeVider</a></span>.</div>
                    </div>
                    <div>
                        <img alt='photo' style={{height:"auto", width:450}} src={image}/>
                    </div>
                </div>

            </Card>
        </>
    )
}
