"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  FileText, 
  Image as ImageIcon, 
  Check, 
  X, 
  Globe, 
  Loader2, 
  ArrowLeft,
  Calendar,
  User
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
  published_at: string;
  is_active?: boolean;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "edit">("list");
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("Volt Digital Admin");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setAuthLoading(false);
        fetchBlogs();
      }
    };
    checkUser();
  }, [router]);

  // Fetch blogs from Supabase
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err: any) {
      showNotification("error", "Failed to fetch blogs: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper for notification
  const showNotification = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Handle Slug generation
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    // Auto generate slug
    if (activeTab === "create") {
      setSlug(generateSlug(value));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove non-word chars
      .replace(/[\s_-]+/g, "-") // replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, ""); // trim hyphens
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `blog-covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setSlug("");
    setAuthor("Volt Digital Admin");
    setDescription("");
    setContent("");
    setImageFile(null);
    setImagePreview("");
    setExistingImageUrl("");
    setEditingBlogId(null);
  };

  // Handle Create Blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase.from("blogs").insert([
        {
          title,
          slug,
          author,
          description,
          content,
          image_url: imageUrl,
          published_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      showNotification("success", "Blog post created successfully!");
      resetForm();
      setActiveTab("list");
      fetchBlogs();
    } catch (err: any) {
      showNotification("error", "Error creating blog: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Populate Edit form
  const startEdit = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setAuthor(blog.author);
    setDescription(blog.description);
    setContent(blog.content);
    setExistingImageUrl(blog.image_url);
    setImagePreview(blog.image_url);
    setActiveTab("edit");
  };

  // Handle Update Blog
  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogId) return;
    setSubmitting(true);

    try {
      let imageUrl = existingImageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from("blogs")
        .update({
          title,
          slug,
          author,
          description,
          content,
          image_url: imageUrl,
        })
        .eq("id", editingBlogId);

      if (error) throw error;

      showNotification("success", "Blog post updated successfully!");
      resetForm();
      setActiveTab("list");
      fetchBlogs();
    } catch (err: any) {
      showNotification("error", "Error updating blog: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Blog
  const handleDeleteBlog = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;

    try {
      // 1. Delete from database
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      // 2. Try to delete the image from storage if it exists
      if (imageUrl && imageUrl.includes("blog-images")) {
        try {
          const urlParts = imageUrl.split("blog-images/");
          if (urlParts.length > 1) {
            const filePath = urlParts[1];
            await supabase.storage.from("blog-images").remove([filePath]);
          }
        } catch (storageErr) {
          console.error("Failed to delete storage image:", storageErr);
        }
      }

      showNotification("success", "Blog post deleted successfully!");
      fetchBlogs();
    } catch (err: any) {
      showNotification("error", "Error deleting blog: " + err.message);
    }
  };

  // Handle Toggle Active Status
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      
      showNotification("success", `Blog post ${!currentStatus ? 'activated' : 'disabled'} successfully!`);
      fetchBlogs();
    } catch (err: any) {
      showNotification("error", "Error updating status: " + err.message);
    }
  };

  // Log out handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#010C19] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#1071FF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010C19] text-white flex flex-col font-sans">
      
      {/* Admin Navbar */}
      <header className="border-b border-white/10 bg-[#050A15]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#1071FF] font-bold text-2xl tracking-tight">Volt Digital</span>
          <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white/80 uppercase">
            Admin Portal
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5"
          >
            <Globe className="w-4 h-4" />
            View Site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        
        {/* Status Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${
            message.type === "success" 
              ? "bg-green-500/10 border-green-500/20 text-green-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            {message.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* --- TAB: LIST BLOGS --- */}
        {activeTab === "list" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Blog Articles</h2>
                <p className="text-white/50 text-sm mt-1">Manage and publish articles on your platform.</p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab("create");
                }}
                className="flex items-center justify-center gap-2 bg-[#1071FF] hover:bg-[#0D5BCC] text-white px-5 py-3 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(16,113,255,0.25)] font-semibold text-sm cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                New Article
              </button>
            </div>

            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#1071FF]" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="border border-white/10 rounded-[32px] bg-white/5 p-12 text-center flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-white/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-white/50 text-sm max-w-sm mb-6">
                  Get started by creating your first article using the creator button.
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab("create");
                  }}
                  className="bg-white/10 hover:bg-white/15 px-5 py-2.5 rounded-xl border border-white/5 transition-colors cursor-pointer text-sm font-semibold"
                >
                  Create Article
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div 
                    key={blog.id}
                    className="border border-white/10 rounded-[32px] bg-gradient-to-b from-white/10 to-white/5 hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                  >
                    <div>
                      {/* Thumbnail Cover */}
                      <div className="relative w-full aspect-[16/10] bg-[#050A15] overflow-hidden">
                        {blog.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={blog.image_url} 
                            alt={blog.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Info details */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(blog.published_at).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {blog.author}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight mb-2 line-clamp-2 text-white group-hover:text-[#1071FF] transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-3 leading-relaxed">
                          {blog.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => handleToggleActive(blog.id, blog.is_active ?? true)}
                        className={`flex-1 flex items-center justify-center gap-2 border py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          (blog.is_active ?? true) 
                            ? "bg-green-500/10 hover:bg-green-500/20 border-green-500/20 text-green-400" 
                            : "bg-gray-500/10 hover:bg-gray-500/20 border-gray-500/20 text-gray-400"
                        }`}
                      >
                        {(blog.is_active ?? true) ? "Active" : "Disabled"}
                      </button>
                      <button
                        onClick={() => startEdit(blog)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id, blog.image_url)}
                        className="flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 p-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB: CREATE / EDIT BLOG --- */}
        {(activeTab === "create" || activeTab === "edit") && (
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab("list");
                }}
                className="p-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {activeTab === "create" ? "Create New Article" : "Edit Article"}
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  {activeTab === "create" ? "Add a new dynamic article to the blog feed." : "Modify existing article contents."}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={activeTab === "create" ? handleCreateBlog : handleUpdateBlog} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    required
                    placeholder="Enter article title"
                    className="bg-[#050A15] border border-white/10 rounded-2xl py-3.5 px-4 outline-none focus:border-[#1071FF] transition-all"
                  />
                </div>

                {/* Slug */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    required
                    placeholder="article-url-slug"
                    className="bg-[#050A15] border border-white/10 rounded-2xl py-3.5 px-4 outline-none focus:border-[#1071FF] transition-all"
                  />
                </div>

                {/* Author */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="Volt Digital Admin"
                    className="bg-[#050A15] border border-white/10 rounded-2xl py-3.5 px-4 outline-none focus:border-[#1071FF] transition-all"
                  />
                </div>

                {/* Cover Image */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="flex items-center gap-3 bg-[#050A15] border border-white/10 border-dashed rounded-2xl py-3.5 px-4 outline-none hover:border-[#1071FF] transition-all cursor-pointer text-sm text-white/60 hover:text-white"
                  >
                    <ImageIcon className="w-5 h-5 text-white/40" />
                    {imageFile ? imageFile.name : "Select cover image..."}
                  </label>
                </div>

              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full max-w-md aspect-[16/9] rounded-2xl border border-white/10 overflow-hidden bg-[#050A15]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(existingImageUrl || "");
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-black/70 hover:bg-black rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">
                  Short Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={2}
                  placeholder="Enter a brief summary of the article..."
                  className="bg-[#050A15] border border-white/10 rounded-2xl py-3.5 px-4 outline-none focus:border-[#1071FF] transition-all resize-none"
                />
              </div>

              {/* Content Editor */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pl-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Article Content
                  </label>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">
                    Supports HTML/Markdown
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={14}
                  placeholder="Write your article content here. You can use standard paragraphs, HTML tags, or markdown spacing..."
                  className="bg-[#050A15] border border-white/10 rounded-2xl py-3.5 px-4 outline-none focus:border-[#1071FF] transition-all font-mono text-sm leading-relaxed"
                />
              </div>

              {/* Form Controls */}
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1071FF] hover:bg-[#0D5BCC] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-[0_0_20px_rgba(16,113,255,0.2)] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {activeTab === "create" 
                    ? (submitting ? "Publishing..." : "Publish Article") 
                    : (submitting ? "Saving..." : "Save Changes")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab("list");
                  }}
                  className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 border border-white/5 text-white px-8 py-4 rounded-2xl font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-white/30 bg-[#010811]">
        &copy; {new Date().getFullYear()} Volt Digital. All rights reserved.
      </footer>
    </div>
  );
}
