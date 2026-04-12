import { useState } from "react";
import { groupLaborData, GroupLabor as GL } from "@/data/dummyData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UsersRound } from "lucide-react";

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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Group Labor</h1>

      {/* Add form */}
      <Card className="mb-8 max-w-lg">
        <CardContent className="p-5">
          <h2 className="font-semibold text-lg mb-4">Create a Group</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label>Group Name</Label>
              <Input placeholder="e.g. Kisan Majdoor Group" value={form.groupName} onChange={(e) => setForm({ ...form, groupName: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Workers</Label>
                <Input type="number" placeholder="10" value={form.workers} onChange={(e) => setForm({ ...form, workers: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Total Price (₹)</Label>
                <Input type="number" placeholder="4000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">Add Group</Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g) => (
          <Card key={g.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                  <UsersRound className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{g.groupName}</h3>
                  <p className="text-muted-foreground text-sm">{g.workers} workers</p>
                </div>
              </div>
              <span className="font-bold text-primary text-lg">₹{g.price}/day</span>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button className="w-full" size="lg" onClick={() => handleHire(g)}>Hire Group</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupLabor;
