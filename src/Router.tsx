import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './Pages/Login/Login'
import Homepage from './Pages/Homepage'
import UpdateUser from './Pages/UpdateUser'
import Profile from './Pages/Profile/Profile'
import PrivateRoute from './Components/ProtectedRoute'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>,
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
      ],
    },
  ])

  return <RouterProvider router={router} />
}