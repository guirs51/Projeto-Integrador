import Home from "../pages/home/Home"
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const routes = [
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/regis",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
];

export default routes;