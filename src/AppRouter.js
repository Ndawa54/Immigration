import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

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
  }
])

export default AppRouter