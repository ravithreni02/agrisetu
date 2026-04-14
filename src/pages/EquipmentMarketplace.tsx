import { useState } from "react";
import { equipmentData, Equipment } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, Tractor, MapPin, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const EquipmentMarketplace = () => {
  const [items] = useState<Equipment[]>(equipmentData);
  const { toast } = useToast();
  const { user, role } = useAuth();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Record<string, Date | undefined>>({});
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

  const handleRent = async (item: Equipment) => {
    if (!user) {
      toast({ title: "Please login", description: "You need to login to rent equipment.", variant: "destructive" });
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
      booking_type: "equipment",
      item_name: item.name,
      item_id: item.id,
      price: item.price,
      booking_date: format(date, "yyyy-MM-dd"),
    });
    setBookingLoading(null);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking Created!", description: `"${item.name}" booked for ${format(date, "PPP")}. Status: Pending.` });
      // Create notification
      await supabase.from("notifications").insert({
        user_id: user.id,
        title: "Booking Created",
        message: `You booked "${item.name}" for ${format(date, "PPP")}.`,
        type: "booking",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Tractor className="h-7 w-7 text-primary" />
            {t("equipment")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Rent farm machines near you</p>
        </div>
        {role === "machinery_provider" && (
          <Button asChild className="rounded-2xl">
            <Link to="/add-equipment"><Plus className="h-5 w-5 mr-1" /> Add</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((eq) => (
          <Card key={eq.id} className="overflow-hidden rounded-2xl border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <img src={eq.image} alt={eq.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              <Badge className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md ${
                eq.availability 
                  ? "bg-success text-success-foreground border-0" 
                  : "bg-destructive text-destructive-foreground border-0"
              }`}>
                {eq.availability ? (
                  <><CheckCircle2 className="h-3 w-3 mr-1" /> {t("available")}</>
                ) : (
                  <><XCircle className="h-3 w-3 mr-1" /> {t("unavailable")}</>
                )}
              </Badge>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-1">{eq.name}</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3">
                <MapPin className="h-3.5 w-3.5" /> {eq.owner}
              </p>
              {eq.availability && (
                <div className="mb-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className={cn("w-full rounded-xl justify-start text-left text-sm", !selectedDate[eq.id] && "text-muted-foreground")}>
                        <Calendar className="h-4 w-4 mr-2" />
                        {selectedDate[eq.id] ? format(selectedDate[eq.id]!, "PPP") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI
                        mode="single"
                        selected={selectedDate[eq.id]}
                        onSelect={(d) => setSelectedDate({ ...selectedDate, [eq.id]: d })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-primary">₹{eq.price}<span className="text-sm font-normal text-muted-foreground">{t("perDay")}</span></span>
                <Button
                  className="rounded-2xl"
                  disabled={!eq.availability || bookingLoading === eq.id}
                  onClick={() => handleRent(eq)}
                >
                  {bookingLoading === eq.id ? "..." : t("rentNow")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentMarketplace;
