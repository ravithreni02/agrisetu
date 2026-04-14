import { Link, useLocation } from "react-router-dom";
import { Home, Tractor, Users, MessageCircle, User, Sprout, Menu, X, Banknote, UsersRound, Plus, Bell, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role } = useAuth();
  const { t } = useLanguage();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchNotifs = async () => {
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);
      setUnreadCount(count || 0);
    };
    fetchNotifs();
    const channel = supabase
      .channel("notif-count")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, fetchNotifs)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const bottomLinks = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/equipment", icon: Tractor, label: t("equipment") },
    { to: "/labor", icon: Users, label: t("labor") },
    { to: "/community", icon: MessageCircle, label: t("community") },
    { to: user ? "/profile" : "/auth", icon: user ? User : LogIn, label: user ? t("profile") : t("login") },
  ];

  const moreLinks = [
    { to: "/group-labor", icon: UsersRound, label: t("groupLabor"), roles: null },
    { to: "/finance", icon: Banknote, label: t("finance"), roles: null },
    ...(role === "machinery_provider" ? [{ to: "/add-equipment", icon: Plus, label: t("addEquipment"), roles: ["machinery_provider"] as string[] }] : []),
    ...(role === "labor" || role === "group_leader" ? [{ to: "/add-labor", icon: Plus, label: t("addLabor"), roles: ["labor", "group_leader"] as string[] }] : []),
    ...(user ? [{ to: "/dashboard", icon: Bell, label: t("dashboard"), roles: null }] : []),
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-primary">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            AgriSetu
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[...bottomLinks, ...moreLinks].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === l.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}
            {user && unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-[10px] h-5 min-w-[20px] rounded-full">
                {unreadCount}
              </Badge>
            )}
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-card px-4 pb-4 pt-2 animate-fade-in">
            {moreLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  location.pathname === l.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <l.icon className="h-5 w-5" />
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {bottomLinks.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "bg-primary/10" : ""}`}>
                  <l.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold leading-tight">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
