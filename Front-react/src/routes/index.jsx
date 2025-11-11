import Home from "../pages/home/Home"
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserHome from "../pages/userHome/UserHome"

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/regis",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
{
    path: "/UserHome",
  element: <UserHome/>
}
];

export default routes;