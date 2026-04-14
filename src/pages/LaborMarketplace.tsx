import { useState } from "react";
import { laborData, Labor } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, Users, Star, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const LaborMarketplace = () => {
  const [items] = useState<Labor[]>(laborData);
  const { toast } = useToast();
  const { user, role } = useAuth();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Record<string, Date | undefined>>({});
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

  const handleHire = async (item: Labor) => {
    if (!user) {
      toast({ title: "Please login", description: "You need to login to hire labor.", variant: "destructive" });
      return;
    }
    const date = selectedDate[item.id];
    if (!date) {
      toast({ title: "Select a date", description: "Please pick a booking date.", variant: "destructive" });
      return;
    }
    setBookingLoading(item.id);
    const { error } = await supabase.from("bookings").insert({
      booker_id: user.id,
      booking_type: "labor",
      item_name: item.name,
      item_id: item.id,
      price: item.wage,
      booking_date: format(date, "yyyy-MM-dd"),
    });
    setBookingLoading(null);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Hire Request Sent!", description: `Requested ${item.name} for ${format(date, "PPP")}. Status: Pending.` });
      await supabase.from("notifications").insert({
        user_id: user.id,
        title: "Hire Request Sent",
        message: `You requested to hire ${item.name} for ${format(date, "PPP")}.`,
        type: "booking",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            {t("labor")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Hire skilled farm workers</p>
        </div>
        {(role === "labor" || role === "group_leader") && (
          <Button asChild className="rounded-2xl">
            <Link to="/add-labor"><Plus className="h-5 w-5 mr-1" /> Add</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((lb) => (
          <Card key={lb.id} className="rounded-2xl border-border/50 shadow-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-xl font-bold text-primary">
                  {lb.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{lb.name}</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-primary fill-primary" /> {lb.skill}
                  </p>
                </div>
                <Badge className={`rounded-full px-2.5 py-1 text-[10px] font-semibold shrink-0 ${
                  lb.availability 
                    ? "bg-success text-success-foreground border-0" 
                    : "bg-destructive text-destructive-foreground border-0"
                }`}>
                  {lb.availability ? <><CheckCircle2 className="h-3 w-3 mr-0.5" /> {t("free")}</> : <><XCircle className="h-3 w-3 mr-0.5" /> {t("busy")}</>}
                </Badge>
              </div>
              {lb.availability && (
                <div className="mb-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className={cn("w-full rounded-xl justify-start text-left text-sm", !selectedDate[lb.id] && "text-muted-foreground")}>
                        <Calendar className="h-4 w-4 mr-2" />
                        {selectedDate[lb.id] ? format(selectedDate[lb.id]!, "PPP") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI
                        mode="single"
                        selected={selectedDate[lb.id]}
                        onSelect={(d) => setSelectedDate({ ...selectedDate, [lb.id]: d })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xl font-extrabold text-primary">₹{lb.wage}<span className="text-sm font-normal text-muted-foreground">{t("perDay")}</span></span>
                <Button
                  className="rounded-2xl"
                  disabled={!lb.availability || bookingLoading === lb.id}
                  onClick={() => handleHire(lb)}
                >
                  {bookingLoading === lb.id ? "..." : t("hire")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LaborMarketplace;
