import { useTheme } from '@mui/material/styles'
import AxiosInstance from '@/Helpers/Axios'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
import { useEffect, useState } from 'react'
import {
    ChartsAxisContentProps,
    ChartsTooltip,
} from '@mui/x-charts/ChartsTooltip'
import { getMonthName } from '@/Pages/Payroll/utils/Utils'

const valueFormatter = (value: number | null) => `${value} ALL`

export type Salary = {
    year: number
    netSalary: number
    month: string
    healthInsurance: number
    socialSecurity: number
    grossSalary: number
    bonus: number
}

export default function ChartBar({ id }: { id: string }) {
    const [dataset, setDataset] = useState<Salary[]>([])
    const theme = useTheme()

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
            '.MuiChartsLegend-mark': {
                fill: theme.palette.primary.main,
            },
        },
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get<Salary[]>(`/salary/user/${id}?graph=true`)
                const processedData = response.data.map(item => ({
                    ...item,
                    month: getMonthName(Number(item.month) + 1)
                }))
                setDataset(processedData)
            } catch (error) {
                console.error('Error fetching salary data:', error)
            }
        }

        fetchData()
    }, [id])

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
                    colors={[theme.palette.primary.main]}
                    {...chartSetting}
                    tooltip={{
                        trigger: 'none',
                    }}
                >
                    <ChartsTooltip
                        slots={{
                            axisContent: (props: ChartsAxisContentProps) => {
                                const { dataIndex } = props
                                const data = dataIndex !== null && dataIndex !== undefined ? dataset[dataIndex] : undefined

                                return (
                                    <div
                                        style={{
                                            backgroundColor: theme.palette.background.paper,
                                            padding: '10px',
                                            borderRadius: '5px',
                                            boxShadow: `0 4px 6px ${theme.palette.grey[500]}`,
                                        }}
                                    >
                                        <p>Month: {data?.month ?? ''}</p>
                                        <p>Year: {data?.year ?? ''}</p>
                                        <p>Net Salary: {data?.netSalary ?? ''}</p>
                                        <p>Gross Salary: {data?.grossSalary ?? ''}</p>
                                        <p>Bonus: {data?.bonus ?? ''}</p>
                                        <p>Health Insurance: {data?.healthInsurance ?? ''}</p>
                                        <p>Social Security: {data?.socialSecurity ?? ''}</p>
                                    </div>
                                )
                            },
                        }}
                    />
                </BarChart>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}