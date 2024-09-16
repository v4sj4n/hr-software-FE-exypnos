import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Badge from '@mui/material/Badge'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'

function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

const initialValue = dayjs(new Date())

function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] },
) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

    const isSelected =
        !props.outsideCurrentMonth &&
        highlightedDays.indexOf(props.day.date()) >= 0

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌚' : undefined}
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
            />
        </Badge>
    )
}

export default function Calendar() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15])

    const generateHighlightedDays = (date: Dayjs) => {
        const daysInMonth = date.daysInMonth()
        return [1, 2, 3].map(() => getRandomNumber(1, daysInMonth))
    }

    React.useEffect(() => {
        setHighlightedDays(generateHighlightedDays(initialValue))
    }, [])

    const handleMonthChange = (date: Dayjs) => {
        setIsLoading(true)
        setHighlightedDays([])
        setTimeout(() => {
            setHighlightedDays(generateHighlightedDays(date))
            setIsLoading(false)
        }, 500)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: {
                        highlightedDays,
                    } as Partial<
                        PickersDayProps<Dayjs> & { highlightedDays: number[] }
                    >,
                }}
            />
        </LocalizationProvider>
    )
}