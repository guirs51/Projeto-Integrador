import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
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




createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
      <Routes>
        {/* rotas que não respeitam o layout */}

        <Route path="/" element={<Home/>} />
        <Route path='/regis' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

        {/* rotas que respeitam */}
        
        <Route element={<Layout />}>
          <Route path='/admin/dashboard' element={<Admin />} />
          <Route path='/admin/requests' element={<AdminRequest />} />

          <Route path='/userHome' element={<UserHome />} />

          <Route path='/userConfig' element={<UserProfile />}></Route>

          <Route path='/materials' element={<Materials/>}></Route>
          <Route path='/bonifications' element={<Bonifications/>}></Route>
                <Route path='/location' element={<Location/>}></Route>
        </Route>


      </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>

)
