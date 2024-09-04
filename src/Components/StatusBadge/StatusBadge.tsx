import style from './statusBadge.module.scss'

export const StatusBadge = ({
    status,
    color,
}: {
    status: string
    color: string
}) => {
    switch (color) {
        case 'red':
            return <span className={style.redBadge}>● {status}</span>
            case 'purple':
                return <span className={style.purpleBadge}>● {status}</span>
        case 'green':
            return <span className={style.greenBadge}>● {status}</span>
        case 'gray':
        case 'grey':
            return <span className={style.grayBadge}>● {status}</span>
        case 'orange':
            return <span className={style.orangeBadge}>● {status}</span>
        case 'lightblue':
            return <span className={style.lightblue}>● {status}</span>
        default:
            return <span className={style.blueBadge}>● {status}</span>
    }
}
