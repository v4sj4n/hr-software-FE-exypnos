import { Vacation } from '@/Pages/Vacation/types'
import { Badge } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import dayjs, { Dayjs } from 'dayjs'

export const Calendar = ({ vacations }: { vacations: Vacation[] }) => {
    const highlightedDays = vacations.map((vacation) =>
        dayjs(vacation.startDate),
    )

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                defaultValue={dayjs()}
                loading={false}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: {
                        highlightedDays,
                    } as any,
                }}
            />
        </LocalizationProvider>
    )
}

function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: Dayjs[] },
) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

    const isSelected =
        !outsideCurrentMonth &&
        highlightedDays.some((highlightedDay) =>
            highlightedDay.isSame(day, 'day'),
        )

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '📌' : undefined}
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
            />
        </Badge>
    )
}

export default Calendar
