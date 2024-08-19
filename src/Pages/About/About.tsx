import Card from '@/Components/Card/Card'
import image from "../../../public/Images/HeroImage.png"

export default function About() {
    return (
        <>
            <Card >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <h1>
                        Tiutull
                    </h1>
                    <div style={{maxWidth:"500px"}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    </div>
                    <div>
                        <img alt='photo' style={{height:"auto", width:450}} src={image}/>
                    </div>
                </div>

            </Card>
        </>
    )
}
