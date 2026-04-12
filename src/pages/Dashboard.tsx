import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tractor, Users, UsersRound, Banknote, MessageCircle } from "lucide-react";

const stats = [
  { label: "Equipment Listed", value: 6, icon: Tractor },
  { label: "Laborers Available", value: 5, icon: Users },
  { label: "Groups Active", value: 3, icon: UsersRound },
  { label: "Loan Applications", value: 12, icon: Banknote },
  { label: "Community Posts", value: 3, icon: MessageCircle },
];

const Dashboard = () => (
  <div className="container mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-base font-medium">{s.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-primary">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Dashboard;
