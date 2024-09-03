import { useAuth } from '@/Context/AuthProvider'
import AxiosInstance from '@/Helpers/Axios'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
import { DatasetType } from '@mui/x-charts/internals'
import { useEffect, useState } from 'react'
import { ChartsAxisContentProps, ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
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
    series: [
        {
            dataKey: 'netSalary',
            label: 'Salary Chart',
            valueFormatter,
        },
    ],
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

export default function ChartBar({ id }: { id: string }) {
    const [dataset, setDataset] = useState<DatasetType>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosInstance<Salary[]>(
                `/salary/user/${id}?graph=true`,
            )
            console.log("response", response.data)
            let data: Salary[] = response.data
            setDataset(data)
            console.log("datasalary", data)
        }

        fetchData()
    }, [])

    return (
        <div style={{ width: '100%' }}>
            {dataset.length !== 0 ? (
                <BarChart
                    dataset={dataset}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'month',
                            hideTooltip: true,
                        },
                    ]}
                    {...chartSetting}
                    tooltip={{
                    trigger: 'none',
                    }}
                >
                    <ChartsTooltip
                        slots={{
                            axisContent: (props: ChartsAxisContentProps) => {
                                const { dataIndex} = props;
                                if (!dataIndex) return;
                                return (
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            padding: '10px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <p>
                                            Month: {String(dataset[dataIndex]?.month) ?? ''}
                                        </p>
                                        <p>
                                            Net Salary: {String(dataset[dataIndex]?.netSalary ?? '')}
                                        </p>
                                        <p>
                                            Gross Salary: {String(dataset[dataIndex]?.grossSalary ?? '')}
                                        </p>
                                        <p>
                                            Bonus: {String(dataset[dataIndex]?.bonus) ?? ''}
                                        </p>
                                        <p>
                                            Health Insurance: {String(dataset[dataIndex]?.healthInsurance) ?? ''}
                                        </p>
                                        <p>
                                            Social Security: {String(dataset[dataIndex]?.socialSecurity) ?? ''}
                                        </p>
                    
                                    </div>
                                );
                            }
                        }}
                    />
                </BarChart>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
