import { PieChart } from '@mui/x-charts'

const PieChartComponent = () => {
    const data = [
        { value: 50, label: 'Present' },
        { value: 10, label: 'Absent' },
        { value: 15, label: 'On Leave' },
        { value: 20, label: 'Remote' },
    ]

    return (
        <PieChart
            height={300}
            series={[
                {
                    data: [...data],
                    innerRadius: 30,
                    outerRadius: 105,
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
