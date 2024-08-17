import { ReactNode } from 'react'
import style from './errorTextForm.module.scss'

export const ErrorText: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <p className={style.errorText}>{children}</p>
}
