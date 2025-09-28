import Home from "../pages/home/Home"
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Delivery from "../pages/delivery/Delivery";

const routes = [
  {
    path: "/",
    element: <Delivery />
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