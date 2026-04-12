import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const AddEquipment = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", price: "", availability: true, image: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Equipment Added!", description: `"${form.name}" has been listed.` });
    setForm({ name: "", price: "", availability: true, image: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input id="name" placeholder="e.g. Tractor Mahindra 575" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Day (₹)</Label>
              <Input id="price" type="number" placeholder="e.g. 1500" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.availability} onCheckedChange={(v) => setForm({ ...form, availability: v })} />
              <Label>Available for rent</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <Button type="submit" size="lg" className="w-full">List Equipment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEquipment;
