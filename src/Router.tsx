import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Employees from './Pages/Employees/Employees.tsx'
import Profile from './Pages/Profile/Profile'
import PrivateRoute from './Context/ProtectedRoute.tsx'
import ResetPass from './Pages/Login/Component/ResetPass'
import CreateEmplye from './Pages/CreateEmploye.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import Recruitment from './Pages/Recruitment/Recruitment.tsx'
import Assets from './Pages/Assets/assets.tsx'
import Interview from './Pages/Interview/Interview.tsx'
import Vacation from './Pages/Vacation/Vacation.tsx'
import Candidates from './Pages/Candidates/Candidates.tsx'
import Structure from './Pages/Structure/Structure.tsx'
import Events from './Pages/Events/Events.tsx'
import Payroll from './Pages/Payroll/Payroll.tsx'
export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'recruitment',
      element: <Recruitment />,
    },
    {
      path: '/forgot-password',
      element: <ResetPass />,
    },

    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: 'employees',
          element: <Employees />,
        },
        { path: '/dashboard', element: <Dashboard />, index: false },
        {
          path: 'profile/:id',
          element: <Profile />,
        },
        {
          path: 'assets',
          element: <Assets />,
        },
        {
          path: 'payroll',
          element: <Payroll />,
        },
        {
          path: 'createEmplye',
          element: <CreateEmplye />,
        },
        {
          path: 'structure',
          element: <Structure />,
        },
        {
          path: 'candidates',
          element: <Candidates />,
        },
        {
          path: 'vacation',
          element: <Vacation />,
        },
        {
          path: 'events',
          element: <Events />,
        },
        {
          path: 'interview',
          element: <Interview />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
