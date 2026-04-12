import { useState } from "react";
import { communityPosts, CommunityPost } from "@/data/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Send, Image, MoreHorizontal } from "lucide-react";

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
    <div className="container mx-auto py-8 px-4 max-w-xl pb-24 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="h-7 w-7 text-primary" />
        Community
      </h1>

      {/* New post */}
      <Card className="mb-6 rounded-2xl border-border/50 shadow-sm">
        <CardContent className="p-5">
          <form onSubmit={handlePost} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">Y</div>
              <Textarea 
                placeholder="What's happening on the farm? 🌾" 
                value={newPost.text} 
                onChange={(e) => setNewPost({ ...newPost, text: e.target.value })} 
                rows={3} 
                className="rounded-xl border-border/50 resize-none bg-muted/50 focus:bg-card" 
              />
            </div>
            <div className="flex items-center justify-between pl-13">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Image URL" 
                  value={newPost.image} 
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} 
                  className="rounded-xl text-sm h-9 w-48 border-border/50"
                />
                <Image className="h-5 w-5 text-muted-foreground" />
              </div>
              <Button type="submit" className="rounded-2xl">Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{post.author}</p>
                    <p className="text-muted-foreground text-xs">{post.timestamp}</p>
                  </div>
                </div>
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Image */}
              {post.image && <img src={post.image} alt="" className="w-full max-h-80 object-cover" />}

              {/* Content */}
              <div className="p-4 pt-3">
                <p className="text-sm mb-3 leading-relaxed">{post.text}</p>

                {/* Actions */}
                <div className="flex items-center gap-5 mb-3">
                  <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Heart className="h-5 w-5" /> <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MessageCircle className="h-5 w-5" /> <span className="text-sm font-medium">{post.comments.length}</span>
                  </span>
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="space-y-2 mb-3 bg-muted/40 rounded-xl p-3">
                    {post.comments.map((c, i) => (
                      <p key={i} className="text-sm"><span className="font-semibold">{c.author}</span> {c.text}</p>
                    ))}
                  </div>
                )}

                {/* Comment input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                    className="rounded-xl border-border/50 text-sm h-9"
                  />
                  <Button size="sm" variant="ghost" className="rounded-xl h-9 px-3" onClick={() => handleComment(post.id)}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
