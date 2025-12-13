import Home from "../pages/home/Home"
import Layout from "../pages/layouts/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Materials from "../pages/materials/Materials";
import Location from "../pages/location-search/Location"
import UserProfile from "../pages/userProfile/UserProfile";
import HomeUser from "../pages/userHome/HomeUser"
import Bonifications from "../pages/bonifications/Bonifications"
import HistoricRec from "../pages/reciclagens/HistoricRec"


const routes = [
  // Página inicial
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

  // Área logada com Layout
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "UserHome",   // sem "/"
        element: <HomeUser />
      },
      {
        path: "materials",
        element: <Materials />
      },
      {
        path: "location",
        element: <Location />
      },
      {
        path: "userConfig",
        element: <UserProfile />
      },
      {
        path: "bonifications",
        element: <Bonifications />
      },
      {
        path: "recycling",
        element: <HistoricRec />
      }
    ]
  }
];

export default routes;