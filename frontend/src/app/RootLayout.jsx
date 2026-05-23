import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';

export default function RootLayout() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}
