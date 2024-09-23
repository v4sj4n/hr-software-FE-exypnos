import { RingLoader } from 'react-spinners'
import style from './Loader.module.css'
import { useTheme } from '@mui/material'
export const Loader = () => {
    const theme = useTheme()
    return (
        <div className={style.ring}>
            <RingLoader color={theme.palette.primary.main} />
        </div>
    )
}
