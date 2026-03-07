
import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom';

import Home from './pages/LandingPage';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'
import Subscribers from './pages/Subscribers'
import LoginForm from './components/forms/LoginForm';
import { Favorites, MyInfo, Activity, UserProfile, Offers } from './components/user';
import PageNotFound from './pages/PageNotFound';
import SignupForm from './components/forms/SignupForm';
import DishDetails from './components/dish/DishDetails';
import Notifications from './pages/Notifications';
import ForgotPassword from './pages/ForgotPassword';
import GuestExperience from './pages/GuestExperience';
import Recommendations from './pages/Recommendations';
import ColorPallets from './pages/ColorPallets';
import { SiteThemeProvider } from './context';
import QrCode from './pages/QrCode';
import Analytics from './pages/Analytics';
import CreateOffers from './pages/CreateOffers';
import MediaLibary from './pages/MediaLibary';
import Feedback from './pages/Feedback';
import MenuDetailsPage from './components/dish/MenuDetails';

const Routes = () => {

    return (
        <SiteThemeProvider>
            <Router>
                <ReactRoutes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignupForm />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/hot-dog-kings/menu' element={<Menu />} />
                    <Route path='/hot-dog-kings/recommendations' element={<Recommendations />} />
                    <Route path='/hot-dog-kings/guest-experience' element={<GuestExperience />} />
                    <Route path='/hot-dog-kings/menu/:type/:id' element={<DishDetails />} />
                    <Route path='/hot-dog-kings/menu/:id' element={<MenuDetailsPage />} />
                    <Route path='/subscribers' element={<Subscribers />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/analytics' element={<Analytics />} />
                    <Route path='/getqrcode' element={<QrCode />} />
                    <Route path='/create-offers' element={<CreateOffers />} />
                    <Route path='/media-library' element={<MediaLibary />} />
                    <Route path='/feedback' element={<Feedback />} />
                    <Route path='/account' element={<UserProfile />}>
                        <Route index element={<Favorites />} />
                        <Route path='my-info' element={<MyInfo />} />
                        <Route path='activity' element={<Activity />} />
                        <Route path='offers' element={<Offers />} />
                    </Route>
                    <Route path='/color-pallet' element={<ColorPallets />} />
                    <Route path='*' element={<PageNotFound />} />
                </ReactRoutes>
            </Router>
        </SiteThemeProvider>
    )
}

export default Routes;