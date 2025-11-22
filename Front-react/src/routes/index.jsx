import Home from "../pages/home/Home"
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Location from "../pages/location-search/Location";

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
 path: "/location",
  element: <Location/>
  }
 
];

export default routes;