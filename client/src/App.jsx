import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SignIn, SignUp } from '@clerk/react';
import { Toaster } from 'react-hot-toast';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import GridBackground from './components/layout/GridBackground';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Winners from './pages/Winners';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Support from './pages/Support';
import Contact from './pages/Contact';
import CompleteProfile from './pages/CompleteProfile';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminPayments from './pages/admin/AdminPayments';
import AdminLeaderboard from './pages/admin/AdminLeaderboard';
import AdminWinners from './pages/admin/AdminWinners';
import AdminSupport from './pages/admin/AdminSupport';
import AdminNotifications from './pages/admin/AdminNotifications';

// Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

import { useState, useEffect } from 'react';

// Clerk Config moved to main.jsx if needed, but constants here can be removed if unused.


export default function App() {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <NotificationProvider>
          <GridBackground />
          <CustomCursor />
          <ScrollProgress />

          <AnimatePresence>
            {initialLoading && (
              <motion.div
                key="loading-screen"
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="fixed inset-0 z-[10000]"
              >
                <LoadingScreen />
              </motion.div>
            )}
          </AnimatePresence>

          {!isAdminRoute && <Navbar />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetail />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/winners" element={<Winners />} />
              <Route path="/team" element={<Team />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/contact" element={<Contact />} />

              {/* Clerk Auth Pages */}
              <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
              <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

              {/* Profile Completion */}
              <Route path="/complete-profile" element={<CompleteProfile />} />

              {/* Protected */}
              <Route element={<ProtectedRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/support" element={<Support />} />
              </Route>

              {/* Admin */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="registrations" element={<AdminRegistrations />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="leaderboard" element={<AdminLeaderboard />} />
                  <Route path="winners" element={<AdminWinners />} />
                  <Route path="support" element={<AdminSupport />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>

          {!isAdminRoute && <Footer />}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
              },
            }}
          />
        </NotificationProvider>
      </AuthProvider>
  );
}
