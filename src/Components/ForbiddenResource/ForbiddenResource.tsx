import { Link } from 'react-router-dom'
import style from './ForbiddenResource.module.css'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { ReactElement } from 'react'
export const ForbiddenResource = ({ children }: { children: ReactElement }) => {
    const { userRole } = useAuth()
    if (userRole === 'dev') {
        return (
            <div className={style.container}>
                <img
                    src={'/Images/forbiddenResource.png'}
                    alt="Forbidden illustration image"
                />
                <p>You are forbidden to access this page</p>
                <Link to="/">Go to homepage</Link>
            </div>
        )
    }
    return <>{children}</>
}
