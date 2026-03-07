
import { BrowserRouter as Router, Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';

import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'
import Subscribers from './pages/Subscribers'
import LoginForm from './components/LoginForm';
import { Favorites, MyInfo, UserProfile } from './components/user';
import PageNotFound from './pages/PageNotFound';
import { UserAuth } from './context/AuthContext';
import SignupForm from './components/SignupForm';
import DishDetails from './components/dish/DishDetails';
import Notifications from './pages/Notifications';
import ForgotPassword from './pages/ForgotPassword';
import GuestExperience from './pages/GuestExperience';
import Recommendations from './pages/Recommendations';
import ColorPallets from './pages/ColorPallets';
import { SiteThemeProvider } from './context';
import QrCode from './pages/QrCode';
import Analytics from './pages/Analytics';

const Routes = () => {
    const { user } = UserAuth();

    return (
        <SiteThemeProvider>
            <Router>
                <ReactRoutes>
                    <Route path='/signup' element={<SignupForm />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/' element={<Navigate to={!user ? "/hot-dog-kings/menu" : !user.isAdmin ? "/hot-dog-kings/menu" : "/dashboard"} />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/hot-dog-kings/menu' element={<Menu />} />
                    <Route path='/hot-dog-kings/recommendations' element={<Recommendations />} />
                    <Route path='/hot-dog-kings/guest-experience' element={<GuestExperience />} />
                    <Route path='/hot-dog-kings/menu/:type/:id' element={<DishDetails />} />
                    <Route path='/subscribers' element={<Subscribers />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/analytics' element={<Analytics />} />
                    <Route path='/getqrcode' element={<QrCode />} />
                    <Route path='/account' element={<UserProfile />}>
                        <Route index element={<Favorites />} />
                        <Route path='my-info' element={<MyInfo />} />
                    </Route>
                    <Route path='/color-pallet' element={<ColorPallets />} />
                    <Route path='*' element={<PageNotFound />} />
                </ReactRoutes>
            </Router>
        </SiteThemeProvider>
    )
}

export default Routes;