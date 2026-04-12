import { Link } from "react-router-dom";
import { Tractor, Users, Banknote, MessageCircle, Plus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { to: "/equipment", icon: Tractor, label: "Equipment Marketplace", desc: "Rent farm machines easily" },
  { to: "/labor", icon: Users, label: "Labor Marketplace", desc: "Hire skilled farm workers" },
  { to: "/group-labor", icon: UsersRound, label: "Group Labor", desc: "Hire worker groups" },
  { to: "/finance", icon: Banknote, label: "Finance", desc: "Apply for farm loans" },
  { to: "/community", icon: MessageCircle, label: "Community", desc: "Connect with farmers" },
  { to: "/add-equipment", icon: Plus, label: "Add Equipment", desc: "List your machines" },
];

const Home = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="bg-primary text-primary-foreground py-16 px-4">
      <div className="container mx-auto text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">AgriSetu 🌾</h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Bridging farmers with equipment, labor, finance &amp; community — all in one place.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/equipment">Browse Equipment</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link to="/labor">Find Labor</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Feature cards */}
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">What can you do?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.to} to={f.to}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-14 w-14 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{f.label}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default Home;
