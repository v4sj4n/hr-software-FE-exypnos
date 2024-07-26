import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewCandidats from './Pages/VIewCandidats/ViewCandidats.tsx'
import PrivateRoute from './Context/ProtectedRoute.tsx'
import Assets from './Pages/Assets/Assets.tsx'
import Candidates from './Pages/Candidates/Candidates.tsx'
import CreateEmplye from './Pages/CreateEmploye.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import Employees from './Pages/Employees/Employees.tsx'
import Events from './Pages/Events/Events.tsx'
import Interview from './Pages/Interview/Interview.tsx'
import ResetPass from './Pages/Login/Component/ResetPass'
import Login from './Pages/Login/Login'
import Payroll from './Pages/Payroll/Payroll.tsx'
import Profile from './Pages/Profile/Profile'
import Recruitment from './Pages/Recruitment/Recruitment.tsx'
import Structure from './Pages/Structure/Structure.tsx'
import Vacation from './Pages/Vacation/Vacation.tsx'
import AssetProvider from './Pages/Assets/AssetContext.tsx'
import { EmployeeProvider } from './Pages/Employees/Context/EmployeTableProvider.tsx'
import { CandidateProvider } from './Pages/Candidates/Context/CandidateTableProvider.tsx'

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

          element: (
            <EmployeeProvider>
              <Employees />
            </EmployeeProvider>
          ),
        },
        { path: '/dashboard', element: <Dashboard />, index: false },
        {
          path: 'profile/:id',
          element: <Profile />,
        },
        {
          path: 'view/:id',
          element: <ViewCandidats />,
        },
        {
          path: 'assets',
          element: (
            <AssetProvider>
              <Assets />
            </AssetProvider>
          ),
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
          element: (
            <CandidateProvider>
              <Candidates />
            </CandidateProvider>
          ),
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
