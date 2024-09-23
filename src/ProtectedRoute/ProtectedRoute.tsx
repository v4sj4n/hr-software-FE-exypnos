import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from '../Components/SideBar/sidebar'
import SidebarHeaderProvider from './SidebarHeaderContext'
import { BreadcrumbComponent } from '@/Components/BreadCrumbs/BreadCrumbs'
import { useTheme } from '@mui/material/styles'
import Header from '@/Components/Header/header'

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem('access_token')

    const theme = useTheme()
  
  if (!isAuthenticated) {
        return <Navigate to="/" />
    }
  
    return (
        <>
            <SidebarHeaderProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <Header />
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    <SideBar />
                    <main
                        style={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            padding: '20px',
                            overflow: 'auto',
                        }}
                    >
                        <BreadcrumbComponent />
                        <div style={{ flex: 1 }}>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </SidebarHeaderProvider>
        </>
    )
}

export default PrivateRoute
