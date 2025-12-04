import { elements } from "chart.js";
import Home from "../pages/home/Home"
import Layout from "../pages/layouts/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserHome from "../pages/userHome/UserHome"
import Test from "../pages/materials/Materials";


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
      {path: "/test",
        element: <Test/>
      }
     
    ]
  }
];

export default routes;
