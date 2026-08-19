import { Link } from "react-router-dom";
import { Tractor, Users, Banknote, MessageCircle, UsersRound, Sprout, ArrowRight, Leaf, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  const features = [
    { to: "/crop-advisor", icon: Leaf, label: "AgriGenie", desc: "AI crop advisor", color: "bg-primary/10 text-primary" },
    { to: "/equipment", icon: Tractor, label: t("equipment"), desc: "Rent farm machines easily", color: "bg-accent text-accent-foreground" },
    { to: "/labor", icon: Users, label: t("labor"), desc: "Skilled farm workers", color: "bg-secondary text-secondary-foreground" },
    { to: "/community", icon: MessageCircle, label: t("community"), desc: "Connect with farmers", color: "bg-primary/10 text-primary" },
    { to: "/finance", icon: Banknote, label: t("finance"), desc: "Quick farm finance", color: "bg-accent text-accent-foreground" },
    { to: "/group-labor", icon: UsersRound, label: t("groupLabor"), desc: "Hire worker groups", color: "bg-secondary text-secondary-foreground" },
  ];


  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-pulse"><Leaf className="h-20 w-20" /></div>
          <div className="absolute top-20 right-20 animate-pulse delay-300"><Sprout className="h-16 w-16" /></div>
          <div className="absolute bottom-10 left-1/3 animate-pulse delay-500"><Sun className="h-24 w-24" /></div>
          <div className="absolute bottom-20 right-10 animate-pulse delay-700"><Tractor className="h-20 w-20" /></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Sprout className="h-4 w-4" />
              Smart Agriculture Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed max-w-xl mx-auto">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl px-8 text-base font-semibold shadow-lg" asChild>
                <Link to="/equipment">
                  <Tractor className="h-5 w-5 mr-2" />
                  {t("rentEquipment")}
                </Link>
              </Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl px-8 text-base font-semibold border-2 border-primary-foreground/20 shadow-lg" asChild>
                <Link to="/labor">
                  <Users className="h-5 w-5 mr-2" />
                  {t("hireLabor")}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto">
          {[
            { label: "Farmers", value: "500+" },
            { label: "Equipment", value: "120+" },
            { label: "Workers", value: "300+" },
          ].map((s) => (
            <Card key={s.label} className="text-center glass-card rounded-2xl">
              <CardContent className="p-4 md:p-6">
                <p className="text-2xl md:text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-14 px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What can you do?</h2>
          <p className="text-muted-foreground">Everything a modern farmer needs</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="group">
              <Card className="h-full rounded-2xl border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                <CardContent className="flex flex-col items-center text-center gap-3 p-5 md:p-7">
                  <div className={`h-14 w-14 rounded-2xl ${f.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <f.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg">{f.label}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1">{f.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
