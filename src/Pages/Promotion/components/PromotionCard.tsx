import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'

export type Promotion = {
    position: string
    grade: string
    startDate: string   
}


export default function PromotionCard({ id }: { id: string }) {
    const [dataset, setDataset] = useState<Promotion[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Promotion[]>(
                `/promotions/${id}`,
            );
            let data: Promotion[] = response.data;
            setDataset(data);
            console.log("dataPromotion", data);
        };

        fetchData();
    }, []);

    return (
        <Card gap='10px' height='100vh' flex='1'>
        <h3>Promotion</h3>
            {dataset.map((item, index) => (
                <Card key={index} >
                    <div>
                        <h3>Position: {item.position}</h3>
                        <p>Grade: {item.grade}</p>
                        <p>Date: {item.startDate.split("T")[0]}</p>
                    </div>
                </Card>
            ))}
        </Card>
    );
}