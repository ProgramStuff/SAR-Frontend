import { createBrowserRouter } from 'react-router-dom';
import Login from './app/Login/page';
import Register from './app/Regsiter/page';
import PrivateTest from './routes/PrivateTest';
import PrivateRoutes from './routes/PrivateRoutes';
import Layout from './routes/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Login /> },
            { path: '/Login', element: <Login /> },
            { path: '/Register', element: <Register /> },

            {
                element: <PrivateRoutes role="user" />,
                children: [{ path: '/test', element: <PrivateTest /> }],
            },
            {
                element: <PrivateRoutes role="admin" />,
                children: [
                    { path: '/test', element: <PrivateTest /> },
                    { path: '/incident' },
                    { path: '/Dashboard' },
                ],
            },
            {
                path: '*',
                element: <p>404 Error - Nothing here</p>,
            },
        ],
    },
]);
