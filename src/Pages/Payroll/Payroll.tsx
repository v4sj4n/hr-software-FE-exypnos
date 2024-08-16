import { PieChart } from '@mui/x-charts'
// import style from './styles/Payroll.module.css'

export default function Payroll() {
  const data = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
  ];
  
  return (
    <PieChart
    height={300}
  series={[
    {
      data: [...data],
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
      cx: 150,
      cy: 150,
    }
  ]}
/>
  )
}
