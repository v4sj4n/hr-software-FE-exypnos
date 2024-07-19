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
import Assets from './Pages/Assets/assets.tsx'


export default function Router() {
  const router = createBrowserRouter([
    {
<<<<<<< Updated upstream
      path: '/login',
      element: <Login/>,
=======
      path: "/login",
      element: <Login />,
      index: false,
    },
    {
      path: "/forgot-password",
      element: <ResetPass />,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          path: '/',
=======
          path: "/app",
>>>>>>> Stashed changes
          element: <App />,
          index: true,
        },
        {
          path: 'home',
          element: <Homepage />,
        },
        { path: "/dashboard", element: <Dashboard />, index: false },
        {
          path: "user/:id",
          element: <UpdateUser />,
        },
        {
<<<<<<< Updated upstream
          path: 'profile',
=======
          path: "profile/:id",
>>>>>>> Stashed changes
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
