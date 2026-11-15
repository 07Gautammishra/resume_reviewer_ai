import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AILogo from "@/components/layout/AILogo";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refresh } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
        return;
      }

      if (token) {
        localStorage.setItem("scanmycv_token", token);
      }

      try {
        await refresh();
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Auth callback refresh failed:", err);
        navigate("/login?error=Session+could+not+be+verified", { replace: true });
      }
    }

    handleCallback();
  }, [searchParams, navigate, refresh]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--ink)] px-4">
      <div className="flex flex-col items-center text-center space-y-4">
        <AILogo />
        <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
          <Loader2 className="h-4 w-4 animate-spin text-[var(--accent)]" />
          <span>Verifying authentication and connecting...</span>
        </div>
      </div>
    </div>
  );
}
