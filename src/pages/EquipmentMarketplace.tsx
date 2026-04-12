import { useState } from "react";
import { equipmentData, Equipment } from "@/data/dummyData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const EquipmentMarketplace = () => {
  const [items] = useState<Equipment[]>(equipmentData);
  const { toast } = useToast();

  const handleRent = (item: Equipment) => {
    toast({ title: "Rent Requested!", description: `You requested to rent "${item.name}" from ${item.owner}.` });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Equipment Marketplace</h1>
        <Button asChild>
          <Link to="/add-equipment"><Plus className="h-5 w-5 mr-1" /> Add Equipment</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((eq) => (
          <Card key={eq.id} className="overflow-hidden">
            <img src={eq.image} alt={eq.name} className="w-full h-48 object-cover" />
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-1">{eq.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">Owner: {eq.owner}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary text-lg">₹{eq.price}/day</span>
                <Badge variant={eq.availability ? "default" : "secondary"}>
                  {eq.availability ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button className="w-full" size="lg" disabled={!eq.availability} onClick={() => handleRent(eq)}>
                Rent Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentMarketplace;
