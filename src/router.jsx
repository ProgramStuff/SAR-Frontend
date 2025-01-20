import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Register from './routes/Register';
import PrivateTest from "./routes/PrivateTest";
import PrivateRoutes from "./routes/PrivateRoutes";
import Layout from "./routes/Layout";


export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/Login", element: <Login /> },
        { path: "/Registration", element: <Register /> },
        { 
          element: <PrivateRoutes role="user" />,
          children: [
            { path: "/test", element: <PrivateTest /> },
          ]
        },
        { 
          element: <PrivateRoutes role="admin" />,
          children: [
            { path: "test", element: <PrivateTest /> }
          ]
        },
        { 
          path: "*",
          element: <p>404 Error - Nothing here</p>
        }
      ]
    }
  ]
);
