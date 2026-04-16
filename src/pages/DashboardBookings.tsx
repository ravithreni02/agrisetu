import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  rejected: XCircle,
};

const DashboardBookings = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .or(`booker_id.eq.${user.id},provider_id.eq.${user.id}`)
        .order("created_at", { ascending: false })
        .limit(50);
      setBookings(data || []);
      setDataLoading(false);
    };
    fetch();

    const channel = supabase
      .channel("bookings-page")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const handleAction = async (id: string, status: "confirmed" | "rejected") => {
    await supabase.from("bookings").update({ status }).eq("id", id);
  };

  if (loading || !user) return null;

  const isProvider = role === "machinery_provider" || role === "labor" || role === "group_leader";

  return (
    <DashboardLayout>
      <div className="p-6 pb-24 md:pb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <CalendarCheck className="h-6 w-6 text-primary" /> All Bookings
        </h1>

        {dataLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : bookings.length === 0 ? (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-8 text-center text-muted-foreground">No bookings found</CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => {
              const StatusIcon = statusIcons[b.status] || Clock;
              const isMyProvider = b.provider_id === user.id;
              return (
                <Card key={b.id} className="rounded-2xl border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{b.item_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.booking_type} • {b.booking_date || "No date"}
                        {isMyProvider && " • You're the provider"}
                        {b.booker_id === user.id && " • You booked"}
                      </p>
                      {b.price && <p className="text-xs font-medium text-primary mt-0.5">₹{b.price}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`rounded-full text-[10px] px-2 py-0.5 ${statusColors[b.status]}`}>
                        <StatusIcon className="h-3 w-3 mr-0.5" />
                        {b.status}
                      </Badge>
                      {isProvider && isMyProvider && b.status === "pending" && (
                        <div className="flex gap-1">
                          <Button size="sm" className="h-7 rounded-lg text-xs px-2" onClick={() => handleAction(b.id, "confirmed")}>Accept</Button>
                          <Button size="sm" variant="outline" className="h-7 rounded-lg text-xs px-2" onClick={() => handleAction(b.id, "rejected")}>Reject</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardBookings;
