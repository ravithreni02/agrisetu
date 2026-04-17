import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface RoleRouteProps {
  children: ReactNode;
  /** Roles allowed to view this route. If undefined, any authenticated user is allowed. */
  allow?: AppRole[];
  /** Where to send unauthenticated users. */
  redirectUnauth?: string;
  /** Where to send authenticated users with the wrong role. */
  redirectWrongRole?: string;
}

const RoleRoute = ({
  children,
  allow,
  redirectUnauth = "/auth",
  redirectWrongRole = "/dashboard",
}: RoleRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to={redirectUnauth} replace />;

  if (allow && allow.length > 0 && (!role || !allow.includes(role))) {
    return <Navigate to={redirectWrongRole} replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
