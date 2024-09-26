import { PieChart } from '@mui/x-charts'
import { useDashboardContext } from './../context/hook.tsx'
import { useEffect } from 'react'

const PieChartComponent = () => {
    const { employeeData, isLoading, error } = useDashboardContext()

    useEffect(() => {
        console.log('Employee Data in PieChartComponent:', employeeData)
    }, [employeeData])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const data = [
        { value: employeeData.present, label: 'Present' },
        { value: employeeData.onLeave, label: 'On Leave' },
        { value: employeeData.remote, label: 'Remote' },
    ]

    return (
        <PieChart
            height={300}
            series={[
                {
                    data: data, 
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 2.5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 125,
                },
            ]}
        />
    )
}

export default PieChartComponent
