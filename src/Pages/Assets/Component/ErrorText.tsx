import { ReactNode } from 'react'
import style from '../style/errorText.module.css'

export const ErrorText: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={style.errorText}>{children}</p>
}
