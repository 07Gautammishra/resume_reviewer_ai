import { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter, Outlet } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";

// Minimal, zero-layout-shift brand loading fallback
function RouteLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[var(--bg)] text-[var(--ink-muted)] text-sm transition-colors">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--border)]" />
          <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-mono tracking-wider uppercase opacity-75">Loading...</span>
      </div>
    </div>
  );
}

const withSuspense = (Component) => (props) => (
  <Suspense fallback={<RouteLoadingFallback />}>
    <Component {...props} />
  </Suspense>
);

// High-performance code-splitting with dynamic imports
const Landing = withSuspense(lazy(() => import("@/pages/Landing")));
const Dashboard = withSuspense(lazy(() => import("@/pages/Dashboard")));
const Login = withSuspense(lazy(() => import("@/pages/Login")));
const Register = withSuspense(lazy(() => import("@/pages/Register")));
const AuthCallback = withSuspense(lazy(() => import("@/pages/AuthCallback")));
const Resumes = withSuspense(lazy(() => import("@/pages/Resumes")));
const ResumeDetail = withSuspense(lazy(() => import("@/pages/ResumeDetail")));
const ExportPage = withSuspense(lazy(() => import("@/pages/Export")));
const Insights = withSuspense(lazy(() => import("@/pages/Insights")));
const Versions = withSuspense(lazy(() => import("@/pages/Versions")));
const History = withSuspense(lazy(() => import("@/pages/History")));
const Settings = withSuspense(lazy(() => import("@/pages/Settings")));

// Instant route prefetching utilities
export const prefetchRoute = {
  landing: () => import("@/pages/Landing"),
  dashboard: () => import("@/pages/Dashboard"),
  login: () => import("@/pages/Login"),
  register: () => import("@/pages/Register"),
  resumes: () => import("@/pages/Resumes"),
  insights: () => import("@/pages/Insights"),
  versions: () => import("@/pages/Versions"),
  history: () => import("@/pages/History"),
  settings: () => import("@/pages/Settings"),
};

// Prevents authenticated users from viewing /login and /register
function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingFallback />;
  }

  // If already logged in, redirect to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

// Restricts access to authenticated users only
function ProtectedShell() {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingFallback />;
  }

  if (!user) return <Navigate to="/login" replace />;

  return <AppShell />;
}

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "auth/callback", element: <AuthCallback /> },

  // Public routes (guests only)
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Protected routes (logged-in users only)
  {
    path: "/",
    element: <ProtectedShell />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "resumes", element: <Resumes /> },
      { path: "resumes/:id", element: <ResumeDetail /> },
      { path: "resumes/:id/export", element: <ExportPage /> },
      { path: "insights", element: <Insights /> },
      { path: "versions", element: <Versions /> },
      { path: "history", element: <History /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
