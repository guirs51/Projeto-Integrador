import Home from "../pages/home/Home"
import Register from "../pages/register/Register";
import RecicleArea from "../pages/recicle/RecicleArea";

const routes = [
  {
    path: "/",
    element: <RecicleArea />
  },
  {
    path: "/regis",
    element: <Register />
  }
];

export default routes;