import { useState } from "react";
import { groupLaborData, GroupLabor as GL } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UsersRound, Plus, Users, IndianRupee } from "lucide-react";

const GroupLabor = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<GL[]>(groupLaborData);
  const [form, setForm] = useState({ groupName: "", workers: "", price: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newGroup: GL = {
      id: String(Date.now()),
      groupName: form.groupName,
      workers: Number(form.workers),
      price: Number(form.price),
    };
    setGroups([newGroup, ...groups]);
    setForm({ groupName: "", workers: "", price: "" });
    toast({ title: "Group Added!", description: `"${form.groupName}" listed successfully.` });
  };

  const handleHire = (g: GL) => {
    toast({ title: "Group Hired!", description: `You hired "${g.groupName}" (${g.workers} workers).` });
  };

  return (
    <div className="container mx-auto py-8 px-4 pb-24 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
        <UsersRound className="h-7 w-7 text-primary" />
        Group Labor
      </h1>

      {/* Add form */}
      <Card className="mb-8 max-w-lg rounded-2xl border-border/50 shadow-sm">
        <CardContent className="p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" /> Create a Group
          </h2>
          <form onSubmit={handleAdd} className="space-y-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <UsersRound className="h-4 w-4 text-muted-foreground" /> Group Name
              </Label>
              <Input placeholder="e.g. Kisan Majdoor Group" value={form.groupName} onChange={(e) => setForm({ ...form, groupName: e.target.value })} required className="rounded-xl h-12 bg-muted/50 border-border/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Users className="h-4 w-4 text-muted-foreground" /> Workers
                </Label>
                <Input type="number" placeholder="10" value={form.workers} onChange={(e) => setForm({ ...form, workers: e.target.value })} required className="rounded-xl h-12 bg-muted/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" /> Price (₹)
                </Label>
                <Input type="number" placeholder="4000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="rounded-xl h-12 bg-muted/50 border-border/50" />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-2xl text-base font-semibold">Add Group</Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g) => (
          <Card key={g.id} className="rounded-2xl border-border/50 shadow-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <UsersRound className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{g.groupName}</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {g.workers} workers
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xl font-extrabold text-primary">₹{g.price}<span className="text-sm font-normal text-muted-foreground">/day</span></span>
                <Button className="rounded-2xl" onClick={() => handleHire(g)}>Hire Group</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupLabor;
