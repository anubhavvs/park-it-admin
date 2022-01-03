import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Customer from './pages/Customer';
import MainLayout from './components/MainLayout';
import DashboardLayout from './components/DashboardLayout';
import Account from './pages/Account';
import Area from './pages/Area';
import Register from './pages/Register';
import User from './pages/User';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customer', element: <Customer /> },
      { path: 'customer/:id', element: <User /> },
      { path: 'account', element: <Account /> },
      { path: 'area', element: <Area /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> }
    ]
  }
];

export default routes;
