import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Banknote, ShieldCheck } from "lucide-react";

const Finance = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ amount: "", duration: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Loan Application Submitted!", description: `Amount: ₹${form.amount}, Duration: ${form.duration} months.` });
    setForm({ amount: "", duration: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-lg">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
              <Banknote className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Farm Loan</CardTitle>
              <CardDescription>Quick loans for agricultural needs</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount (₹)</Label>
              <Input id="amount" type="number" placeholder="e.g. 50000" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Input id="duration" type="number" placeholder="e.g. 12" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
            </div>
            <Button type="submit" size="lg" className="w-full">Apply for Loan</Button>
          </form>
          <div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>Your information is secure and confidential.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Finance;
