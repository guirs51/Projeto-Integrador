import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'

import Layout from './layout.tsx'
import Admin from './pages/admin.tsx'
import UserHome from './pages/userHome/userHome.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import AdminRequest from './pages/admin/admin-requests.tsx'
import UserProfile from './pages/userProfile/userProfile.tsx'
import { AuthProvider } from './context/authContext.tsx'
import Materials from './pages/materials/materials.tsx'
import Home from './pages/home/home.tsx'
import Register from './pages/register/register.tsx'
import Login from './pages/login/login.tsx'
import Bonifications from './pages/bonificaions/bonifications.tsx'
import Location from './pages/locations/location.tsx'
import AdminConfig from './pages/admin/admin-config.tsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <SnackbarProvider autoHideDuration={5000}>
    <GoogleOAuthProvider clientId="283937599928-psbk3t7eocu0etr13q7rdrnhdl9bkrn0.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/regis' element={<Register />} />
              <Route path='/login' element={<Login />} />

              <Route element={<Layout />}>
                <Route path='/userHome' element={<UserHome />} />
                <Route path='/userConfig' element={<UserProfile />} />
                <Route path='/materials' element={<Materials />} />
                <Route path='/bonifications' element={<Bonifications />} />
                <Route path='/location' element={<Location />} />
              </Route>

              <Route path='/admin/dashboard' element={<Admin />} />
              <Route path='/admin/requests' element={<AdminRequest />} />
              <Route path='/admin/config' element={<AdminConfig/>} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </SnackbarProvider>
)
