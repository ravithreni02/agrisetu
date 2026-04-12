import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Tractor, ImagePlus, IndianRupee, Tag } from "lucide-react";

const AddEquipment = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", price: "", availability: true, image: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Equipment Added!", description: `"${form.name}" has been listed.` });
    setForm({ name: "", price: "", availability: true, image: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-lg pb-24 md:pb-8">
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
            <Tractor className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Add Equipment</CardTitle>
          <CardDescription>List your farm machine for rent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4 text-muted-foreground" /> Equipment Name
              </Label>
              <Input id="name" placeholder="e.g. Tractor Mahindra 575" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-xl h-12 bg-muted/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2 text-sm font-medium">
                <IndianRupee className="h-4 w-4 text-muted-foreground" /> Price per Day (₹)
              </Label>
              <Input id="price" type="number" placeholder="e.g. 1500" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="rounded-xl h-12 bg-muted/50 border-border/50" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <Label className="font-medium">Available for rent</Label>
              <Switch checked={form.availability} onCheckedChange={(v) => setForm({ ...form, availability: v })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="flex items-center gap-2 text-sm font-medium">
                <ImagePlus className="h-4 w-4 text-muted-foreground" /> Image URL
              </Label>
              <Input id="image" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="rounded-xl h-12 bg-muted/50 border-border/50" />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-2xl text-base font-semibold">List Equipment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEquipment;
