import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './Pages/Login'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      index: true,
    },
    {
      path: '/login',
      element: <Login/>,
      index: false,
    }
  ])

  return <RouterProvider router={router} />
}
