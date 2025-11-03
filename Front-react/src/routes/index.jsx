import Home from "../pages/home/Home"
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserProfile from "../pages/userProfile/userProfile";

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
  path: "/userProfile",
  element: <UserProfile/>
}
];

export default routes;