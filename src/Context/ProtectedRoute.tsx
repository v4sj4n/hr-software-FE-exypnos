import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../Components/Header/header'
import { SideBar } from '../Components/SideBar/sidebar'
import SidebarHeaderProvider from './SidebarHeaderContext'

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('access_token')

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <>
      <SidebarHeaderProvider>
        <Header />
        <div style={{ display: 'flex' }}>
          <SideBar />
          <main style={{ backgroundColor: '#f0f5ff', width: '100%' }}>
            <Outlet />
          </main>
        </div>
      </SidebarHeaderProvider>
    </>
  )
}

export default PrivateRoute
