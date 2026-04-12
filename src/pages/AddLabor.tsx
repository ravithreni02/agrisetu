import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const AddLabor = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", skill: "", wage: "", availability: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Labor Added!", description: `${form.name} has been listed.` });
    setForm({ name: "", skill: "", wage: "", availability: true });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Labor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="e.g. Ramesh Verma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Input id="skill" placeholder="e.g. Harvesting" value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wage">Daily Wage (₹)</Label>
              <Input id="wage" type="number" placeholder="e.g. 500" value={form.wage} onChange={(e) => setForm({ ...form, wage: e.target.value })} required />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.availability} onCheckedChange={(v) => setForm({ ...form, availability: v })} />
              <Label>Available for work</Label>
            </div>
            <Button type="submit" size="lg" className="w-full">List Labor</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLabor;
