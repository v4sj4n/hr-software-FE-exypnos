import AxiosInstance from '@/Helpers/Axios'
import Card from '@/Components/Card/Card'
import { useEffect, useState } from 'react'
import { Salary } from './ChartBar';
import { useAuth } from '@/Context/AuthProvider'


export default function PromotionCard() {
    const [dataset, setDataset] = useState<Salary[]>([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Salary[]>(
                `/salary/user/${currentUser?._id}?graph=true`,
            );
            let data: Salary[] = response.data;
            setDataset(data);
        };

        fetchData();
    }, [currentUser]);

    return (
        <div style={{ width: '100%' }}>
            {dataset.map((item, index) => (
                <Card marginTop="20px" key={index}>
                    <h1>Salary</h1>
                    <p>Net Salary: {item.netSalary}</p>
                </Card>
            ))}
        </div>
    );
}