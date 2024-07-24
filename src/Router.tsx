import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Employees from './Pages/Employees/Employees.tsx'
import Profile from './Pages/Profile/Profile'
import PrivateRoute from './Context/ProtectedRoute.tsx'
import ResetPass from './Pages/Login/Component/ResetPass'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard/dashboard.tsx'
import Recruitment from './Pages/Recruitment/Recruitment.tsx'
import Assets from './Pages/Assets/assets.tsx'
import Interview from './Pages/Interview/Interview.tsx'
import Vacation from './Pages/Vacation/Vacation.tsx'
import Candidates from './Pages/Candidates/Candidates.tsx'
export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },
    {
      path: "recruitment",
      element: <Recruitment />,
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
          path: 'employees',
          element: <Employees />,
        },
        { path: "/dashboard", element: <Dashboard />, index: false },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "Assets",
          element: <Assets />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
        {
          path: "Candidates",
          element: <Candidates />,
        },
        {
          path: "Vacation",
          element: <Vacation />,
        },
        {
          path: "Interview",
          element: <Interview />,
        },
      ],
    },
  ]);


  return <RouterProvider router={router} />;
}
