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
import { LocationProvider } from './context/locationContext.tsx'
import AdminBonus from './pages/admin/admin-bonus.tsx'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <LocationProvider>
    <SnackbarProvider autoHideDuration={2000}>
      <GoogleOAuthProvider clientId="283937599928-psbk3t7eocu0etr13q7rdrnhdl9bkrn0.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
              <AuthProvider>
                <Routes>
                  {/* rotas que não respeitam o layout */}

                  <Route path="/" element={<Home />} />
                  <Route path='/regis' element={<Register />}></Route>
                  <Route path='/login' element={<Login />}></Route>

                  {/* rotas que respeitam */}

                  <Route element={<Layout />}>

                    <Route path='/userHome' element={<UserHome />} />

                    <Route path='/userConfig' element={<UserProfile />}></Route>

                    <Route path='/materials' element={<Materials />}></Route>
                    <Route path='/bonifications' element={<Bonifications />}></Route>
                    <Route path='/location' element={<Location />}></Route>
                  </Route>

                  <Route path='/admin/dashboard' element={<Admin />} />
                  <Route path='/admin/requests' element={<AdminRequest />} />
                  <Route path='/admin/config' element={<AdminConfig />}></Route>
                  <Route path='/admin/bonus' element={<AdminBonus />}></Route>
                </Routes>
              </AuthProvider>
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  </LocationProvider>


)
