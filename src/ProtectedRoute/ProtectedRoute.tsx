import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from '../Components/SideBar/sidebar'
import SidebarHeaderProvider from './SidebarHeaderContext'
import { BreadcrumbComponent } from '@/Components/BreadCrumbs/BreadCrumbs'
import Header from '@/Components/Header/header'

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem('access_token')

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <>
            <SidebarHeaderProvider>
                <div className="flex flex-col h-screen overflow-hidden">
                    <Header />
                    <div className="flex flex-1 overflow-hidden">
                        <SideBar />
                        <main className="flex flex-col w-full h-full p-5 overflow-auto">
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
