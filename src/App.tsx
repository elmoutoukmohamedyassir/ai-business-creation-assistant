import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/routing/ProtectedRoute';

import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { AuthLayout } from './components/layout/AuthLayout';

// Lazy-load pages for code splitting (reduces initial bundle from 567KB to ~180KB)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const IntakePage = lazy(() => import('./pages/IntakePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage'));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage'));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <div className="flex gap-1.5 items-center">
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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

            {/* Intake — protected, standalone (no dashboard sidebar) */}
            <Route
              path="/intake"
              element={
                <ProtectedRoute>
                  <IntakePage />
                </ProtectedRoute>
              }
            />

            {/* Dashboard Routes — all protected */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/updates" element={<UpdatesPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}