import { useState } from "react";
import { communityPosts, CommunityPost } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Send, User } from "lucide-react";

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [newPost, setNewPost] = useState({ text: "", image: "" });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.text.trim()) return;
    const post: CommunityPost = {
      id: String(Date.now()),
      author: "You",
      text: newPost.text,
      image: newPost.image || undefined,
      likes: 0,
      comments: [],
      timestamp: "Just now",
    };
    setPosts([post, ...posts]);
    setNewPost({ text: "", image: "" });
    toast({ title: "Posted!" });
  };

  const handleLike = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleComment = (id: string) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, { author: "You", text }] } : p
      )
    );
    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Community</h1>

      {/* New post */}
      <Card className="mb-8">
        <CardContent className="p-5">
          <form onSubmit={handlePost} className="space-y-3">
            <Textarea placeholder="Share something with the community..." value={newPost.text} onChange={(e) => setNewPost({ ...newPost, text: e.target.value })} rows={3} />
            <Input placeholder="Image URL (optional)" value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} />
            <Button type="submit" size="lg">Post</Button>
          </form>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-muted-foreground text-xs">{post.timestamp}</p>
                </div>
              </div>
              <p className="mb-3">{post.text}</p>
              {post.image && <img src={post.image} alt="" className="w-full rounded-lg mb-3 max-h-80 object-cover" />}

              <div className="flex items-center gap-4 mb-3">
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="h-5 w-5" /> {post.likes}
                </button>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle className="h-5 w-5" /> {post.comments.length}
                </span>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="space-y-2 mb-3 pl-4 border-l-2">
                  {post.comments.map((c, i) => (
                    <p key={i} className="text-sm"><span className="font-medium">{c.author}:</span> {c.text}</p>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                />
                <Button size="icon" variant="ghost" onClick={() => handleComment(post.id)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
