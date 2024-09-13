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

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
        const timeout = setTimeout(() => {
            const daysInMonth = date.daysInMonth()
            const daysToHighlight = [1, 2, 3].map(() =>
                getRandomNumber(1, daysInMonth),
            )

            resolve({ daysToHighlight })
        }, 500)

        signal.onabort = () => {
            clearTimeout(timeout)
            reject(new DOMException('aborted', 'AbortError'))
        }
    })
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
    const requestAbortController = React.useRef<AbortController | null>(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15])

    const fetchHighlightedDays = (date: Dayjs) => {
        const controller = new AbortController()
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight)
                setIsLoading(false)
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    throw error
                }
            })

        requestAbortController.current = controller
    }

    React.useEffect(() => {
        fetchHighlightedDays(initialValue)

        return () => requestAbortController.current?.abort()
    }, [])

    const handleMonthChange = (date: Dayjs) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort()
        }

        setIsLoading(true)
        setHighlightedDays([])
        fetchHighlightedDays(date)
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
