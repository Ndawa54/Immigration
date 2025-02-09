import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";

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
  }
])

export default AppRouter