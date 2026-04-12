import { useState } from "react";
import { equipmentData, Equipment } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, Tractor, MapPin, CheckCircle2, XCircle } from "lucide-react";

const EquipmentMarketplace = () => {
  const [items] = useState<Equipment[]>(equipmentData);
  const { toast } = useToast();

  const handleRent = (item: Equipment) => {
    toast({ title: "Rent Requested!", description: `You requested to rent "${item.name}" from ${item.owner}.` });
  };

  return (
    <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Tractor className="h-7 w-7 text-primary" />
            Equipment
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Rent farm machines near you</p>
        </div>
        <Button asChild className="rounded-2xl">
          <Link to="/add-equipment"><Plus className="h-5 w-5 mr-1" /> Add</Link>
        </Button>
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
                  <><CheckCircle2 className="h-3 w-3 mr-1" /> Available</>
                ) : (
                  <><XCircle className="h-3 w-3 mr-1" /> Unavailable</>
                )}
              </Badge>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-1">{eq.name}</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3">
                <MapPin className="h-3.5 w-3.5" /> {eq.owner}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-primary">₹{eq.price}<span className="text-sm font-normal text-muted-foreground">/day</span></span>
                <Button className="rounded-2xl" disabled={!eq.availability} onClick={() => handleRent(eq)}>
                  Rent Now
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
