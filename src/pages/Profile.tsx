import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, LogOut, Globe, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Language } from "@/i18n/translations";

const roleLabels: Record<string, string> = {
  customer: "🌾 Customer (Farmer)",
  machinery_provider: "🚜 Machinery Provider",
  labor: "👷 Labor",
  group_leader: "👥 Group Labor Leader",
  finance_provider: "🏦 Finance Provider",
};

const Profile = () => {
  const { user, role, profile, signOut } = useAuth();
  const { lang, setLang } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      display_name: displayName,
      phone,
    }).eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground mb-4">Please log in to view your profile.</p>
        <Button className="rounded-2xl" onClick={() => navigate("/auth")}>Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-lg pb-24 md:pb-8">
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {(profile?.display_name || user.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-xl">{profile?.display_name || user.email}</CardTitle>
              <p className="text-sm text-muted-foreground">{role ? roleLabels[role] : "No role set"}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-muted-foreground" /> Display Name
            </Label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="rounded-xl h-12 bg-muted/50 border-border/50" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-muted-foreground" /> Email
            </Label>
            <Input value={user.email || ""} disabled className="rounded-xl h-12 bg-muted/50 border-border/50" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4 text-muted-foreground" /> Phone
            </Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." className="rounded-xl h-12 bg-muted/50 border-border/50" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Globe className="h-4 w-4 text-muted-foreground" /> Language
            </Label>
            <div className="flex gap-2">
              {(["en", "hi", "te"] as Language[]).map((l) => (
                <Button
                  key={l}
                  variant={lang === l ? "default" : "outline"}
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setLang(l)}
                >
                  {l === "en" ? "English" : l === "hi" ? "हिंदी" : "తెలుగు"}
                </Button>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full rounded-2xl text-base font-semibold" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </Button>

          <Button variant="outline" size="lg" className="w-full rounded-2xl text-base text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
