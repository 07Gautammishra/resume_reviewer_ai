import { lazy, Suspense, useEffect } from "react";
import { Navigate, createBrowserRouter, Outlet, useRouteError, Link, ScrollRestoration, useLocation } from "react-router-dom";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
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

// Enterprise-grade fallback when an unhandled route error occurs
function RouteErrorBoundary() {
  const error = useRouteError();
  const errorMessage = error?.statusText || error?.message || "An unexpected application error occurred.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-4 text-[var(--ink)]">
      <div className="max-w-md w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 shadow-card text-center">
        <div className="w-12 h-12 rounded-2xl bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/25 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={24} strokeWidth={2.2} />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--ink)] mb-2">Something went wrong</h2>
        <p className="text-xs text-[var(--ink-muted)] mb-6 leading-relaxed font-mono bg-[var(--surface-2)] p-3 rounded-xl border border-[var(--border)] text-left overflow-auto max-h-24">
          {errorMessage}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-xs font-medium text-[var(--ink)] hover:bg-[var(--border)]/40 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} /> Reload
          </button>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[var(--ink)] text-[var(--bg)] text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Home size={14} /> Dashboard
          </Link>
        </div>
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

const ROUTE_TITLES = {
  "/": "ScanMyCv · AI Resume Reviewer & ATS Optimizer",
  "/login": "Sign In · ScanMyCv",
  "/register": "Create Account · ScanMyCv",
  "/dashboard": "Dashboard · ScanMyCv",
  "/resumes": "Resumes · ScanMyCv",
  "/insights": "Insights · ScanMyCv",
  "/versions": "Versions · ScanMyCv",
  "/history": "History · ScanMyCv",
  "/settings": "Settings · ScanMyCv",
  "/auth/callback": "Signing in... · ScanMyCv",
};

function resolveTitle(pathname) {
  if (ROUTE_TITLES[pathname]) {
    return ROUTE_TITLES[pathname];
  }
  if (pathname.startsWith("/resumes/") && pathname.endsWith("/export")) {
    return "Export Resume · ScanMyCv";
  }
  if (pathname.startsWith("/resumes/")) {
    return "Resume Analysis · ScanMyCv";
  }
  return "ScanMyCv";
}

// Global root layout providing industry-standard scroll restoration and dynamic tab titles
function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    document.title = resolveTitle(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
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
    ],
  },
]);
