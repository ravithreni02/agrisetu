import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Bell, CalendarCheck, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Notification = Database["public"]["Tables"]["notifications"]["Row"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-success/10 text-success",
  completed: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  rejected: XCircle,
};

const Dashboard = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    const fetch = async () => {
      const [bRes, nRes] = await Promise.all([
        supabase.from("bookings").select("*").or(`booker_id.eq.${user.id},provider_id.eq.${user.id}`).order("created_at", { ascending: false }).limit(20),
        supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
      ]);
      setBookings(bRes.data || []);
      setNotifications(nRes.data || []);
      setLoading(false);
    };
    fetch();

    const channel = supabase
      .channel("dashboard-updates")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetch)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, navigate]);

  const handleBookingAction = async (bookingId: string, status: "confirmed" | "rejected") => {
    await supabase.from("bookings").update({ status }).eq("id", bookingId);
  };

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  };

  if (loading) {
    return <div className="container mx-auto py-16 px-4 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
        <LayoutDashboard className="h-7 w-7 text-primary" />
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Bookings", value: bookings.length },
          { label: "Pending", value: bookings.filter((b) => b.status === "pending").length },
          { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length },
          { label: "Notifications", value: notifications.filter((n) => !n.read).length },
        ].map((s) => (
          <Card key={s.label} className="rounded-2xl border-border/50">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bookings */}
        <Card className="rounded-2xl border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" /> Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No bookings yet</p>
            ) : bookings.map((b) => {
              const StatusIcon = statusIcons[b.status] || Clock;
              const isProvider = b.provider_id === user?.id;
              return (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{b.item_name}</p>
                    <p className="text-xs text-muted-foreground">{b.booking_type} • {b.booking_date || "No date"}</p>
                    {b.price && <p className="text-xs font-medium text-primary">₹{b.price}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`rounded-full text-[10px] px-2 py-0.5 ${statusColors[b.status]}`}>
                      <StatusIcon className="h-3 w-3 mr-0.5" />
                      {b.status}
                    </Badge>
                    {isProvider && b.status === "pending" && (
                      <div className="flex gap-1">
                        <Button size="sm" className="h-7 rounded-lg text-xs px-2" onClick={() => handleBookingAction(b.id, "confirmed")}>Accept</Button>
                        <Button size="sm" variant="outline" className="h-7 rounded-lg text-xs px-2" onClick={() => handleBookingAction(b.id, "rejected")}>Reject</Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-2xl border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No notifications</p>
            ) : notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${n.read ? "bg-muted/20" : "bg-primary/5 border border-primary/20"}`}
              >
                <p className="font-semibold text-sm">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
