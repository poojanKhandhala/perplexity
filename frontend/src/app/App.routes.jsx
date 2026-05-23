import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);
