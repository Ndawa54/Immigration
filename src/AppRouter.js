import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Example from "./components/test/Example";
import Dashboard from "./dashboard/Dashboard";
import Analytics from "./dashboard/Analytics";
import Approver from "./dashboard/Approver";
import DashboardNav from "./dashboard/DashboardNav";
import Track from "./components/Track";
import Interview from "./dashboard/Interview";

const AppRouter = createBrowserRouter([
{
  path: "/",
  element: <Login />,
}
  ,
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Home",
    element: <Home/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: '/example',
    element: <Example/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/report',
    element: <Analytics/>
  },
  {
    path: '/approve',
    element: <Approver/>
  },
  {
    path: 'dash',
    element: <DashboardNav/>
  },
  {
    path: 'track',
    element: <Track/>
  },
  {
    path: 'interview',
    element: <Interview/>
  }
])

export default AppRouter