import { useAuth } from '@/Context/AuthProvider'
import AxiosInstance from '@/Helpers/Axios'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
import { DatasetType } from '@mui/x-charts/internals'
import { useEffect, useState } from 'react'

const valueFormatter = (value: number | null) => `${value}ALL`
export type Salary = {
    netSalary: number
    month: number
    healthInsurance: number
    socialSecurity: number
    grossSalary: number
    bonus: number
}

const chartSetting = {
    series: [{ dataKey: 'netSalary', label: 'Salary Chart', valueFormatter }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
        '.css-1qdzy9k-MuiBarElement-root': {
            fill: '#c5b3e6',
        },
        '.MuiChartsLegend-mark': {
            fill: '#c5b3e6',
        },
    },
}

export default function ChartBar() {
    const [dataset, setDataset] = useState<DatasetType>([])
    const { currentUser } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Salary[]>(
                `/salary/user/${currentUser?._id}?graph=true`,
            )
            let data: Salary[] = response.data
            setDataset(data)
        }

        fetchData()
    }, [currentUser])

    return (
        <div style={{ width: '100%' }}>
            {dataset.length !== 0 ? (
                <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    {...chartSetting}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
