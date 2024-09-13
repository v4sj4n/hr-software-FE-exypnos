import style from './statusBadge.module.scss'

export const StatusBadge = ({
    status,
    color,
    addDot,
}: {
    status: string
    color: string
    addDot?: boolean
}) => {
    switch (color) {
        case 'red':
            return (
                <span className={style.redBadge}>
                    {addDot && '●'} {status}
                </span>
            )
        case 'purple':
            return (
                <span className={style.purpleBadge}>
                    {addDot && '●'} {status}
                </span>
            )
        case 'green':
            return (
                <span className={style.greenBadge}>
                    {addDot && '●'} {status}
                </span>
            )
        case 'gray':
        case 'grey':
            return (
                <span className={style.grayBadge}>
                    {addDot && '●'} {status}
                </span>
            )
        case 'orange':
            return (
                <span className={style.orangeBadge}>
                    {addDot && '●'} {status}
                </span>
            )
        case 'lightblue':
            return (
                <span className={style.lightblue}>
                    {addDot && '●'} {status}
                </span>
            )
        default:
            return (
                <span className={style.blueBadge}>
                    {addDot && '●'} {status}
                </span>
            )
    }
}
