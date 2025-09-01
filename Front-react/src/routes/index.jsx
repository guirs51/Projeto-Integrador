import Home from "../pages/home/Home"
import Register from "../pages/register/Register";

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/regis",
    element: <Register />
  }
];

export default routes;