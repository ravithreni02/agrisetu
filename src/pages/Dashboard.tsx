import { Card, CardContent } from "@/components/ui/card";
import { Tractor, Users, UsersRound, Banknote, MessageCircle, TrendingUp, CalendarCheck, LayoutDashboard } from "lucide-react";

const stats = [
  { label: "Equipment Listed", value: 6, icon: Tractor, trend: "+2 this week", color: "bg-primary/10 text-primary" },
  { label: "Workers Available", value: 5, icon: Users, trend: "+1 today", color: "bg-accent text-accent-foreground" },
  { label: "Active Groups", value: 3, icon: UsersRound, trend: "Stable", color: "bg-secondary text-secondary-foreground" },
  { label: "Loan Applications", value: 12, icon: Banknote, trend: "+3 this month", color: "bg-primary/10 text-primary" },
  { label: "Community Posts", value: 3, icon: MessageCircle, trend: "+1 today", color: "bg-accent text-accent-foreground" },
  { label: "Total Bookings", value: 28, icon: CalendarCheck, trend: "+5 this week", color: "bg-secondary text-secondary-foreground" },
];

const Dashboard = () => (
  <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
    <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
      <LayoutDashboard className="h-7 w-7 text-primary" />
      Dashboard
    </h1>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((s) => (
        <Card key={s.label} className="rounded-2xl border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-5">
            <div className={`h-12 w-12 rounded-2xl ${s.color} flex items-center justify-center mb-4`}>
              <s.icon className="h-6 w-6" />
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">{s.value}</p>
            <p className="text-sm font-medium text-foreground mb-1">{s.label}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {s.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Dashboard;
