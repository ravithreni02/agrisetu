import { useState } from "react";
import { laborData, Labor } from "@/data/dummyData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, User } from "lucide-react";

const LaborMarketplace = () => {
  const [items] = useState<Labor[]>(laborData);
  const { toast } = useToast();

  const handleHire = (item: Labor) => {
    toast({ title: "Hire Requested!", description: `You requested to hire ${item.name} (${item.skill}).` });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Labor Marketplace</h1>
        <Button asChild>
          <Link to="/add-labor"><Plus className="h-5 w-5 mr-1" /> Add Labor</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((lb) => (
          <Card key={lb.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{lb.name}</h3>
                  <p className="text-muted-foreground text-sm">{lb.skill}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary text-lg">₹{lb.wage}/day</span>
                <Badge variant={lb.availability ? "default" : "secondary"}>
                  {lb.availability ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button className="w-full" size="lg" disabled={!lb.availability} onClick={() => handleHire(lb)}>
                Hire
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LaborMarketplace;
