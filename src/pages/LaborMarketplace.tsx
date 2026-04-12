import { useState } from "react";
import { laborData, Labor } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, Users, Star, CheckCircle2, XCircle } from "lucide-react";

const LaborMarketplace = () => {
  const [items] = useState<Labor[]>(laborData);
  const { toast } = useToast();

  const handleHire = (item: Labor) => {
    toast({ title: "Hire Requested!", description: `You requested to hire ${item.name} (${item.skill}).` });
  };

  return (
    <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Labor
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Hire skilled farm workers</p>
        </div>
        <Button asChild className="rounded-2xl">
          <Link to="/add-labor"><Plus className="h-5 w-5 mr-1" /> Add</Link>
        </Button>
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
                  {lb.availability ? <><CheckCircle2 className="h-3 w-3 mr-0.5" /> Free</> : <><XCircle className="h-3 w-3 mr-0.5" /> Busy</>}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xl font-extrabold text-primary">₹{lb.wage}<span className="text-sm font-normal text-muted-foreground">/day</span></span>
                <Button className="rounded-2xl" disabled={!lb.availability} onClick={() => handleHire(lb)}>
                  Hire
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
