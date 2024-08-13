import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewCandidats from "./Pages/VIewCandidats/ViewCandidats.tsx";
import PrivateRoute from "./Context/ProtectedRoute.tsx";
import Assets from "./Pages/Assets/Assets.tsx";
import Candidates from "./Pages/Candidates/Candidates.tsx";
import CreateEmplye from "./Pages/CreateEmploye.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Employees from "./Pages/Employees/Employees.tsx";
import Events from "./Pages/Events/Events.tsx";
import Interview from "./Pages/Interview/Interview.tsx";
import ResetPass from "./Pages/Login/Component/ResetPass";
import Login from "./Pages/Login/Login";
import Payroll from "./Pages/Payroll/Payroll.tsx";
import Profile from "./Pages/Profile/Profile";
import Recruitment from "./Pages/Recruitment/Recruitment.tsx";
import Structure from "./Pages/Structure/Structure.tsx";
import Vacation from "./Pages/Vacation/Vacation.tsx";
import VacationProvider from "./Pages/Vacation/VacationContext.tsx";
import Inventory from "./Pages/Inventory/Inventory.tsx";
import Career from "./Pages/Career/Career.tsx";
import ProjectManager from "./Pages/ProjectManager.tsx";


export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
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
      path: "career",
      element: <Career />,
    },
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "employees",
          element: (
            <Employees />
          ),
        },
        { path: "/dashboard", element: <Dashboard />, index: false },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "view/:id",
          element: <ViewCandidats />,
        },
        {
          path: "assets",
          element: <Assets />,
        },
        {
          path: "payroll",
          element: <Payroll />,
        },
        {
          path: "createEmplye",
          element: <CreateEmplye />,
        },
        {
          path: "structure",
          element: <Structure />,
        },
        {
          path: "candidates",
          element: (
              <Candidates />
          ),
        },
        {
          path: "vacation",
          element: (
            <VacationProvider>
              <Vacation />
            </VacationProvider>
          ),
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "interview",
          element: <Interview />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
