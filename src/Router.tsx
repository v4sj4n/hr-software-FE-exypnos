import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewCandidats from './Pages/VIewCandidats/ViewCandidats.tsx'
import PrivateRoute from './ProtectedRoute/ProtectedRoute.tsx'
import Candidates from './Pages/Candidates/Candidates.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import Employees from './Pages/Employees/Employees.tsx'
import Events from './Pages/Events/Events.tsx'
import Interview from './Pages/Interview/Interview.tsx'
import Login from './Pages/Login/Login'
import Payroll from './Pages/Payroll/Payroll.tsx'
import Profile from './Pages/Profile/Profile'
import Recruitment from './Pages/Recruitment/Recruitment.tsx'
import Structure from './Pages/Structure/Structure.tsx'
import Inventory from './Pages/Inventory/Inventory.tsx'
import Career from './Pages/Career/Career.tsx'
import Holdings from './Pages/Holdings/Holdings.tsx'
import Vacation from './Pages/Vacation/Vacation.tsx'
import SpecificUserPayroll from './Pages/Payroll/SpecificUser/SpecificUserPayroll.tsx'
import About from './Pages/About/About.tsx'
import UserVacations from './Pages/Vacation/UserVacations.tsx'
import EmailConfirmation from './Pages/Recruitment/Component/EmailConfirmation.tsx'
import NotFound from './Pages/NotFound/NotFound.tsx'
import Promotion from './Pages/Promotion/Promotion.tsx'
import ResetPassword from './Pages/ResetPassword/ResetPassword.tsx'
import Chat from './Pages/Chat/Chat.tsx'
import { SocketProvider } from './Pages/Chat/context/SocketContext.tsx'
import { ChatProvider } from './Pages/Chat/context/ChatContext.tsx'


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
            path: '/applicant/confirm',
            element: <EmailConfirmation />,
        },
        {
            path: '/reset-password',
            element: <ResetPassword />,
        },
        {
            path: 'career',
            element: <Career />,
        },
        {
            path: '/',
            element: (
                <>
                  <SocketProvider>
                  <ChatProvider>
                    <PrivateRoute />
                  </ChatProvider>
                    </SocketProvider> 
                </>
            ),
            children: [
                {
                    path: '/employees',
                    element: <Employees />,
                },
                {
                    path: '/promotion',
                    element: <Promotion />,
                },
                { path: '/dashboard', element: <Dashboard />, index: false },
                {
                    path: '/profile/:id',
                    element: <Profile />,
                },
                {
                    path: 'view/:id',
                    element: <ViewCandidats />,
                },
                {
                    path: '/holdings',
                    element: <Holdings />,
                },
                {
                    path: '/vacation',
                    element: <Vacation />,
                },
                {
                    path: '/vacation/:id',
                    element: <UserVacations />,
                },
                {
                    path: '/payroll/user/:id',
                    element: <SpecificUserPayroll />,
                },
                {
                    path: '/payroll',
                    element: <Payroll />,
                },
                {
                    path: '/structure',
                    element: <Structure />,
                },
                {
                    path: '/candidates',
                    element: <Candidates />,
                },
                {
                    path: '/events',
                    element: <Events />,
                },
                
                {
                    path: '/interview',
                    element: <Interview />,
                },
                {
                    path: '/historic',
                    element: <About />,
                },
                {
                    path: '/inventory',
                    element: <Inventory />,
                },
                {
                    path: '/chat',  
                    element: <Chat />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ])
    return <RouterProvider router={router} />
}
