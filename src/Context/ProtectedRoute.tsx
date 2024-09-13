import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from '../Components/SideBar/sidebar'
import SidebarHeaderProvider from './SidebarHeaderContext'
import { BreadcrumbComponent } from '@/Components/BreadCrumbs/BreadCrumbs'
import { useTheme } from '@mui/material/styles'
import Header from '@/Components/Header/header'

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem('access_token')

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }
    const theme = useTheme()

    return (
        <>
            <SidebarHeaderProvider>
                <Header />
                <div style={{ display: 'flex' }}>
                    <SideBar />
                    <main
                        style={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            width: '100%',
                            minHeight: '100vh',
                            height: '100%',
                            padding: '20px',
                        }}
                    >
                        <BreadcrumbComponent />
                        <Outlet />
                    </main>
                </div>
            </SidebarHeaderProvider>
        </>
    )
}

export default PrivateRoute
