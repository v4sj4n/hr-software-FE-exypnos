import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './Pages/Login/Login'
import Homepage from './Pages/Homepage'
import Profile from './Pages/Profile/Profile'
import PrivateRoute from './Context/ProtectedRoute.tsx'
import ResetPass from './Pages/Login/Component/ResetPass'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard/dashboard.tsx'
import Assets from './Pages/Assets/assets.tsx'


export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },

    {
      path: "assets",
      element: <Assets />,
    },

    {
      path: "/forgot-password",
      element: <ResetPass />,
    },

    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/app",
          element: <App />,
          index: true,
        },
        {
          path: 'home',
          element: <Homepage />,
        },
        { path: "/dashboard", element: <Dashboard />, index: false },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
      ],
    },
  ]);


  return <RouterProvider router={router} />;
}
