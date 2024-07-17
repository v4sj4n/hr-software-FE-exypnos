import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './Pages/Login/Login'
import Homepage from './Pages/Homepage'
import UpdateUser from './Pages/UpdateUser'
import Profile from './Pages/Profile/Profile'
import PrivateRoute from './Components/ProtectedRoute'
import ResetPass from './Pages/Login/Component/ResetPass'
import Signup from './Pages/Signup'
import Dashboard from './Pages/dashboard'


export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>,
    },

    {
      path: '/forgot-password',
      element: <ResetPass/>,
    },
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: <App />,
          index: true,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
          index: true,
        },
        {
          path: 'home',
          element: <Homepage />,
        },
        {
          path: 'user/:id',
          element: <UpdateUser />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'Signup',
          element: <Signup />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}