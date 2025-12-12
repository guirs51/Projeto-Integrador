import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes/index';
import { UserProvider } from './context/UserContext';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <UserProvider><RouterProvider router={router} /></UserProvider>
  )
}