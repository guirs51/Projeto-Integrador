import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes/index';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  )
}