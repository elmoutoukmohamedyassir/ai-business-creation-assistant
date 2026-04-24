import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import IntakePage from './pages/IntakePage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import AssistantPage from './pages/AssistantPage';
import UpdatesPage from './pages/UpdatesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Intake */}
        <Route path="/intake" element={<IntakePage />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}
