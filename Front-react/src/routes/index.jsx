import { elements } from "chart.js";
import Home from "../pages/home/Home"
import Layout from "../pages/layouts/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserHome from "../pages/userHome/UserHome"
import Materials from "../pages/materials/Materials";
import Location from "../pages/location-search/Location"


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

  // Rotas que usam o Layout
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/UserHome",
        element: <UserHome />
      },

      {
        path: "/materials",
        element: <Materials/>
      },
      {
        path: "/location",
        element: <Location />
      }

    ]
  }
];

export default routes;