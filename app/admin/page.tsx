"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  isAuthenticated,
  login,
  logout,
  getProducts,
  saveProducts,
  getIndustries,
  saveIndustries,
  getLocations,
  saveLocations,
  getKeywords,
  saveKeywords,
  getBlogs,
  saveBlogs,
} from "./actions";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  features: string[];
}

interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
}

interface KeywordsConfig {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  keywords?: string[];
}

export default function AdminPage() {
  // Auth state
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab state
  const [currentTab, setCurrentTab] = useState<"products" | "industries" | "locations" | "keywords" | "blogs">("products");

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<KeywordsConfig>({
    primaryKeywords: [],
    secondaryKeywords: [],
    longTailKeywords: [],
  });
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editing modals/forms state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingIndustry, setEditingIndustry] = useState<Partial<Industry> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [newLocation, setNewLocation] = useState("");
  
  // Custom tag/item inputs
  const [tempProductKeyword, setTempProductKeyword] = useState("");
  const [tempProductFeature, setTempProductFeature] = useState("");
  const [tempIndustryKeyword, setTempIndustryKeyword] = useState("");
  const [tempBlogKeyword, setTempBlogKeyword] = useState("");
  const [tempKeywordInput, setTempKeywordInput] = useState({ primary: "", secondary: "", longTail: "" });
  const [editorTab, setEditorTab] = useState<"visual" | "html">("visual");

  const wysiwygRef = useRef<HTMLDivElement>(null);

  const execFormatter = (command: string, value: string = "") => {
    if (wysiwygRef.current) {
      wysiwygRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (wysiwygRef.current) {
      setEditingBlog((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          content: wysiwygRef.current!.innerHTML,
        };
      });
    }
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL (e.g. https://google.com):");
    if (url) {
      execFormatter("createLink", url);
    }
  };

  const [activeFormats, setActiveFormats] = useState({
    h1: false,
    h2: false,
    h3: false,
    p: false,
    bold: false,
    italic: false,
    underline: false,
    list: false,
    blockquote: false,
  });

  const updateActiveFormats = () => {
    if (!wysiwygRef.current) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    
    let node = sel.anchorNode;
    let isInsideEditor = false;
    let isH1 = false;
    let isH2 = false;
    let isH3 = false;
    let isP = false;
    let isList = false;
    let isBlockquote = false;
    
    while (node) {
      if (node === wysiwygRef.current) {
        isInsideEditor = true;
        break;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = (node as Element).tagName.toUpperCase();
        if (tagName === "H1") isH1 = true;
        if (tagName === "H2") isH2 = true;
        if (tagName === "H3") isH3 = true;
        if (tagName === "P") isP = true;
        if (tagName === "UL" || tagName === "OL" || tagName === "LI") isList = true;
        if (tagName === "BLOCKQUOTE") isBlockquote = true;
      }
      node = node.parentNode;
    }
    
    if (!isInsideEditor) return;

    setActiveFormats({
      h1: isH1,
      h2: isH2,
      h3: isH3,
      p: isP || (!isH1 && !isH2 && !isH3 && !isList && !isBlockquote),
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      list: isList || document.queryCommandState("insertUnorderedList"),
      blockquote: isBlockquote,
    });
  };

  const toggleBlock = (tag: string) => {
    if (!wysiwygRef.current) return;
    
    // Check if the current format is already this tag
    const isCurrentlyTag = activeFormats[tag.toLowerCase() as keyof typeof activeFormats];
    
    // If it's already this tag, toggle to "p" (normal text)
    // Otherwise, set it to the requested tag
    const targetTag = isCurrentlyTag ? "p" : tag;
    
    const commandValue = targetTag.toLowerCase();
    
    execFormatter("formatBlock", commandValue);
    
    // If formatting to a normal paragraph ("p"), also clear inline formatting (bold/italic/etc.) and hyperlinks
    if (commandValue === "p") {
      document.execCommand("removeFormat", false);
      document.execCommand("unlink", false);
    }
    
    updateActiveFormats();
  };

  const toggleList = () => {
    execFormatter("insertUnorderedList");
    updateActiveFormats();
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormats();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [editingBlog?.id, editorTab]);

  useEffect(() => {
    if (currentTab === "blogs" && editingBlog && wysiwygRef.current) {
      const targetContent = editingBlog.content || "";
      if (wysiwygRef.current.innerHTML !== targetContent) {
        wysiwygRef.current.innerHTML = targetContent;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingBlog?.id, currentTab, editorTab]);


  // Show Toast helper
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch all site configuration data
  async function loadAllData() {
    setIsLoading(true);
    try {
      const [p, ind, loc, keyw, blg] = await Promise.all([
        getProducts(),
        getIndustries(),
        getLocations(),
        getKeywords(),
        getBlogs(),
      ]);
      setProducts(p || []);
      setIndustries(ind || []);
      setLocations(loc || []);
      setKeywords(
        keyw || {
          primaryKeywords: [],
          secondaryKeywords: [],
          longTailKeywords: [],
        }
      );
      setBlogs(blg || []);
    } catch (error) {
      showToast("Failed to load website content.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  // Initial session check
  useEffect(() => {
    async function checkAuth() {
      try {
        const auth = await isAuthenticated();
        setIsLoggedIn(auth);
        if (auth) {
          await loadAllData();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Admin login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const result = await login(password);
      if (result.success) {
        setIsLoggedIn(true);
        setPassword("");
        await loadAllData();
      } else {
        setLoginError(result.error || "Authentication failed");
      }
    } catch (err) {
      setLoginError("An error occurred during login.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      showToast("Logged out successfully.", "success");
    } catch (err) {
      showToast("Failed to log out.", "error");
    }
  };

  // --- CRUD HELPERS FOR PRODUCTS ---
  const startEditProduct = (prod: Product | null) => {
    if (prod) {
      setEditingProduct({ ...prod });
    } else {
      setEditingProduct({
        id: "",
        name: "",
        slug: "",
        description: "",
        keywords: [],
        features: [],
      });
    }
    setTempProductKeyword("");
    setTempProductFeature("");
  };

  const saveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.slug || !editingProduct.description) {
      showToast("Please fill out all required fields.", "error");
      return;
    }

    setIsSaving(true);
    try {
      let updatedProducts = [...products];
      
      // If it's a new product (no id, or id not found in products list)
      const isNew = !products.some(p => p.id === editingProduct.id);
      
      if (isNew) {
        const newId = editingProduct.slug;
        const newProd: Product = {
          id: newId,
          name: editingProduct.name,
          slug: editingProduct.slug,
          description: editingProduct.description,
          keywords: editingProduct.keywords || [],
          features: editingProduct.features || [],
        };
        updatedProducts.push(newProd);
      } else {
        updatedProducts = updatedProducts.map((p) =>
          p.id === editingProduct.id ? (editingProduct as Product) : p
        );
      }

      const res = await saveProducts(updatedProducts);
      if (res.success) {
        setProducts(updatedProducts);
        setEditingProduct(null);
        showToast("Product saved successfully!", "success");
      }
    } catch (err) {
      showToast("Failed to save product.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setIsSaving(true);
    try {
      const updatedProducts = products.filter((p) => p.id !== id);
      const res = await saveProducts(updatedProducts);
      if (res.success) {
        setProducts(updatedProducts);
        showToast("Product deleted successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to delete product.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // --- CRUD HELPERS FOR INDUSTRIES ---
  const startEditIndustry = (ind: Industry | null) => {
    if (ind) {
      setEditingIndustry({ ...ind });
    } else {
      setEditingIndustry({
        id: "",
        name: "",
        slug: "",
        description: "",
        keywords: [],
      });
    }
    setTempIndustryKeyword("");
  };

  const saveIndustryForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndustry) return;

    if (!editingIndustry.name || !editingIndustry.slug || !editingIndustry.description) {
      showToast("Please fill out all required fields.", "error");
      return;
    }

    setIsSaving(true);
    try {
      let updatedIndustries = [...industries];
      const isNew = !industries.some((i) => i.id === editingIndustry.id);

      if (isNew) {
        const newId = editingIndustry.slug;
        const newInd: Industry = {
          id: newId,
          name: editingIndustry.name,
          slug: editingIndustry.slug,
          description: editingIndustry.description,
          keywords: editingIndustry.keywords || [],
        };
        updatedIndustries.push(newInd);
      } else {
        updatedIndustries = updatedIndustries.map((i) =>
          i.id === editingIndustry.id ? (editingIndustry as Industry) : i
        );
      }

      const res = await saveIndustries(updatedIndustries);
      if (res.success) {
        setIndustries(updatedIndustries);
        setEditingIndustry(null);
        showToast("Industry saved successfully!", "success");
      }
    } catch (err) {
      showToast("Failed to save industry.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteIndustry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this industry?")) return;

    setIsSaving(true);
    try {
      const updatedIndustries = industries.filter((i) => i.id !== id);
      const res = await saveIndustries(updatedIndustries);
      if (res.success) {
        setIndustries(updatedIndustries);
        showToast("Industry deleted successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to delete industry.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // --- CRUD HELPERS FOR LOCATIONS ---
  const addLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.trim()) return;

    if (locations.includes(newLocation.trim())) {
      showToast("Location already exists.", "error");
      return;
    }

    const updatedLocations = [...locations, newLocation.trim()];
    setIsSaving(true);
    try {
      const res = await saveLocations(updatedLocations);
      if (res.success) {
        setLocations(updatedLocations);
        setNewLocation("");
        showToast("Location added successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to add location.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const removeLocation = async (locToRemove: string) => {
    if (!window.confirm(`Are you sure you want to remove ${locToRemove}?`)) return;

    const updatedLocations = locations.filter((loc) => loc !== locToRemove);
    setIsSaving(true);
    try {
      const res = await saveLocations(updatedLocations);
      if (res.success) {
        setLocations(updatedLocations);
        showToast("Location removed successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to remove location.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // --- CRUD HELPERS FOR KEYWORDS ---
  const addKeywordTag = async (type: "primary" | "secondary" | "longTail") => {
    const val = tempKeywordInput[type].trim();
    if (!val) return;

    const key = type === "primary" ? "primaryKeywords" : type === "secondary" ? "secondaryKeywords" : "longTailKeywords";
    if (keywords[key].includes(val)) {
      showToast("Keyword already exists in this list.", "error");
      return;
    }

    const updatedKeywords = {
      ...keywords,
      [key]: [...keywords[key], val],
    };

    setIsSaving(true);
    try {
      const res = await saveKeywords(updatedKeywords);
      if (res.success) {
        setKeywords(updatedKeywords);
        setTempKeywordInput({ ...tempKeywordInput, [type]: "" });
        showToast("Keyword added successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to add keyword.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const removeKeywordTag = async (type: "primary" | "secondary" | "longTail", word: string) => {
    const key = type === "primary" ? "primaryKeywords" : type === "secondary" ? "secondaryKeywords" : "longTailKeywords";
    const updatedKeywords = {
      ...keywords,
      [key]: keywords[key].filter((w) => w !== word),
    };

    setIsSaving(true);
    try {
      const res = await saveKeywords(updatedKeywords);
      if (res.success) {
        setKeywords(updatedKeywords);
        showToast("Keyword removed successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to remove keyword.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // --- CRUD HELPERS FOR BLOGS ---
  const startEditBlog = (blog: BlogPost | null) => {
    if (blog) {
      setEditingBlog({ ...blog });
    } else {
      setEditingBlog({
        id: "",
        title: "",
        slug: "",
        date: new Date().toISOString().split("T")[0],
        excerpt: "",
        content: "",
        coverImage: "",
        author: "",
        category: "",
        keywords: [],
      });
    }
    setTempBlogKeyword("");
    setEditorTab("visual");
  };

  const saveBlogForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    if (
      !editingBlog.title ||
      !editingBlog.slug ||
      !editingBlog.date ||
      !editingBlog.excerpt ||
      !editingBlog.content ||
      !editingBlog.author ||
      !editingBlog.category
    ) {
      showToast("Please fill out all required fields.", "error");
      return;
    }

    setIsSaving(true);
    try {
      let updatedBlogs = [...blogs];
      const isNew = !blogs.some((b) => b.id === editingBlog.id);

      if (isNew) {
        const newId = editingBlog.slug!;
        const newBlog: BlogPost = {
          id: newId,
          title: editingBlog.title!,
          slug: editingBlog.slug!,
          date: editingBlog.date!,
          excerpt: editingBlog.excerpt!,
          content: editingBlog.content!,
          coverImage: editingBlog.coverImage || "",
          author: editingBlog.author!,
          category: editingBlog.category!,
          keywords: editingBlog.keywords || [],
        };
        updatedBlogs.push(newBlog);
      } else {
        updatedBlogs = updatedBlogs.map((b) =>
          b.id === editingBlog.id ? (editingBlog as BlogPost) : b
        );
      }

      const res = await saveBlogs(updatedBlogs);
      if (res.success) {
        setBlogs(updatedBlogs);
        setEditingBlog(null);
        showToast("Blog saved successfully!", "success");
      }
    } catch (err) {
      showToast("Failed to save blog.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setIsSaving(true);
    try {
      const updatedBlogs = blogs.filter((b) => b.id !== id);
      const res = await saveBlogs(updatedBlogs);
      if (res.success) {
        setBlogs(updatedBlogs);
        showToast("Blog deleted successfully.", "success");
      }
    } catch (err) {
      showToast("Failed to delete blog.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
        <p className="text-gray-400 font-medium">Verifying admin credentials...</p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden py-12">
        {/* Decorative ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="w-full max-w-md glass-card-dark p-8 rounded-2xl shadow-premium border border-white/5 animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              RTGS PACK <span className="text-accent font-light">LLP</span>
            </h1>
            <p className="text-gray-400 text-sm">Control Panel Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="passcode" className="block text-sm font-semibold text-gray-300 mb-2">
                Administrator Passcode
              </label>
              <input
                type="password"
                id="passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition duration-300"
              />
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-accent/30 hover:bg-accent/90 active:scale-[0.98] transition-all duration-300 flex items-center justify-center"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center px-5 py-3 rounded-lg shadow-2xl transition-all duration-300 border animate-slide-in-up ${
            toast.type === "success"
              ? "bg-emerald-950/90 text-emerald-400 border-emerald-500/30"
              : "bg-red-950/90 text-red-400 border-red-500/30"
          }`}
        >
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              RTGS PACK <span className="text-accent font-normal">Admin</span>
            </h1>
            <span className="bg-white/5 text-gray-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-widest">
              Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition duration-200"
              title="Refresh Data"
            >
              <svg className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-red-950/30 hover:text-red-400 hover:border-red-900/50 active:scale-[0.98] transition-all duration-300 text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 md:px-6">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b border-white/5 mb-8 overflow-x-auto pb-1">
          {[
            { id: "products", label: "Products", icon: "📦" },
            { id: "industries", label: "Industries We Serve", icon: "🏭" },
            { id: "locations", label: "Locations", icon: "📍" },
            { id: "keywords", label: "SEO Keywords", icon: "🔍" },
            { id: "blogs", label: "Blogs", icon: "✍️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id as "products" | "industries" | "locations" | "keywords" | "blogs");
                setEditingProduct(null);
                setEditingIndustry(null);
                setEditingBlog(null);
              }}
              className={`flex items-center space-x-2 py-3 px-5 rounded-t-lg font-semibold border-b-2 text-sm md:text-base whitespace-nowrap transition duration-200 ${
                currentTab === tab.id
                  ? "border-accent text-accent bg-white/5"
                  : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-4"></div>
            <p>Loading database configurations...</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            
            {/* ================= PRODUCTS TAB ================= */}
            {currentTab === "products" && (
              <div>
                {!editingProduct ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">Product Categories</h2>
                        <p className="text-gray-400 text-sm">Create and edit the industrial items display.</p>
                      </div>
                      <button
                        onClick={() => startEditProduct(null)}
                        className="bg-accent text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-accent/90 active:scale-[0.98] transition duration-200 flex items-center space-x-2 text-sm"
                      >
                        <span>+ Add Product</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((prod) => (
                        <div
                          key={prod.id}
                          className="glass-card-dark p-6 rounded-xl border border-white/5 flex flex-col h-full hover:border-white/10 transition duration-300"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-white line-clamp-1">{prod.name}</h3>
                            <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded font-mono">
                              {prod.slug}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                            {prod.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {prod.features?.slice(0, 3).map((f) => (
                              <span key={f} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                                {f}
                              </span>
                            ))}
                            {prod.features?.length > 3 && (
                              <span className="text-xs text-gray-500 px-1 py-0.5">+{prod.features.length - 3} more</span>
                            )}
                          </div>

                          <div className="flex space-x-2 pt-4 border-t border-white/5">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-200 py-2 rounded-lg text-sm font-semibold transition duration-200 border border-white/10"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              disabled={isSaving}
                              className="px-3 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 py-2 rounded-lg text-sm font-semibold transition duration-200 border border-red-900/30"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* PRODUCT EDIT FORM */
                  <div className="max-w-3xl mx-auto glass-card-dark p-6 md:p-8 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                      <h2 className="text-xl font-bold text-white">
                        {editingProduct.id ? `Edit: ${editingProduct.name}` : "Create New Product"}
                      </h2>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        ✕ Cancel
                      </button>
                    </div>

                    <form onSubmit={saveProductForm} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Product Name *</label>
                          <input
                            type="text"
                            value={editingProduct.name || ""}
                            onChange={(e) => {
                              const name = e.target.value;
                              const slug = name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "");
                              setEditingProduct({
                                ...editingProduct,
                                name,
                                slug: editingProduct.id ? editingProduct.slug : slug, // Only auto-slug for new ones
                              });
                            }}
                            required
                            placeholder="e.g. Plastic Trays"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">URL Slug *</label>
                          <input
                            type="text"
                            value={editingProduct.slug || ""}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                slug: e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\-]+/g, ""),
                              })
                            }
                            required
                            placeholder="e.g. plastic-trays"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
                        <textarea
                          value={editingProduct.description || ""}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          required
                          rows={4}
                          placeholder="Provide a comprehensive product description..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                        />
                      </div>

                      {/* Product Features Config */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Key Features</label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={tempProductFeature}
                            onChange={(e) => setTempProductFeature(e.target.value)}
                            placeholder="e.g. Heat Resistant"
                            className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (!tempProductFeature.trim()) return;
                                const features = editingProduct.features || [];
                                if (!features.includes(tempProductFeature.trim())) {
                                  setEditingProduct({
                                    ...editingProduct,
                                    features: [...features, tempProductFeature.trim()],
                                  });
                                }
                                setTempProductFeature("");
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!tempProductFeature.trim()) return;
                              const features = editingProduct.features || [];
                              if (!features.includes(tempProductFeature.trim())) {
                                setEditingProduct({
                                  ...editingProduct,
                                  features: [...features, tempProductFeature.trim()],
                                });
                              }
                              setTempProductFeature("");
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-lg font-bold border border-white/10 transition"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editingProduct.features?.map((feat) => (
                            <span
                              key={feat}
                              className="inline-flex items-center text-sm bg-primary/30 border border-primary/50 text-white px-3 py-1 rounded-full"
                            >
                              <span>{feat}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    features: (editingProduct.features || []).filter((f) => f !== feat),
                                  })
                                }
                                className="ml-2 text-accent hover:text-white"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Product Keywords Config */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Search Keywords (SEO)</label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={tempProductKeyword}
                            onChange={(e) => setTempProductKeyword(e.target.value)}
                            placeholder="e.g. PP Box Manufacturer"
                            className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (!tempProductKeyword.trim()) return;
                                const kws = editingProduct.keywords || [];
                                if (!kws.includes(tempProductKeyword.trim())) {
                                  setEditingProduct({
                                    ...editingProduct,
                                    keywords: [...kws, tempProductKeyword.trim()],
                                  });
                                }
                                setTempProductKeyword("");
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!tempProductKeyword.trim()) return;
                              const kws = editingProduct.keywords || [];
                              if (!kws.includes(tempProductKeyword.trim())) {
                                setEditingProduct({
                                  ...editingProduct,
                                  keywords: [...kws, tempProductKeyword.trim()],
                                });
                              }
                              setTempProductKeyword("");
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-lg font-bold border border-white/10 transition"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editingProduct.keywords?.map((word) => (
                            <span
                              key={word}
                              className="inline-flex items-center text-sm bg-secondary/30 border border-secondary/50 text-white px-3 py-1 rounded-full"
                            >
                              <span>{word}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    keywords: (editingProduct.keywords || []).filter((w) => w !== word),
                                  })
                                }
                                className="ml-2 text-accent hover:text-white"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-6 border-t border-white/5">
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex-grow bg-accent text-white py-3 rounded-lg font-bold shadow-lg hover:bg-accent/90 active:scale-[0.98] transition duration-200 flex items-center justify-center"
                        >
                          {isSaving ? "Saving changes..." : "Save Product Settings"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-6 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ================= INDUSTRIES TAB ================= */}
            {currentTab === "industries" && (
              <div>
                {!editingIndustry ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">Industries We Serve</h2>
                        <p className="text-gray-400 text-sm">Configure manufacturing and commercial sectors.</p>
                      </div>
                      <button
                        onClick={() => startEditIndustry(null)}
                        className="bg-accent text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-accent/90 active:scale-[0.98] transition duration-200 flex items-center space-x-2 text-sm"
                      >
                        <span>+ Add Industry</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {industries.map((ind) => (
                        <div
                          key={ind.id}
                          className="glass-card-dark p-6 rounded-xl border border-white/5 flex flex-col h-full hover:border-white/10 transition duration-300"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-white line-clamp-1">{ind.name}</h3>
                            <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded font-mono">
                              {ind.slug}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                            {ind.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {ind.keywords?.slice(0, 3).map((k) => (
                              <span key={k} className="text-xs bg-secondary/20 text-accent px-2 py-0.5 rounded-full">
                                {k}
                              </span>
                            ))}
                            {ind.keywords?.length > 3 && (
                              <span className="text-xs text-gray-500 px-1 py-0.5">+{ind.keywords.length - 3} more</span>
                            )}
                          </div>

                          <div className="flex space-x-2 pt-4 border-t border-white/5">
                            <button
                              onClick={() => startEditIndustry(ind)}
                              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-200 py-2 rounded-lg text-sm font-semibold transition duration-200 border border-white/10"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteIndustry(ind.id)}
                              disabled={isSaving}
                              className="px-3 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 py-2 rounded-lg text-sm font-semibold transition duration-200 border border-red-900/30"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* INDUSTRY EDIT FORM */
                  <div className="max-w-3xl mx-auto glass-card-dark p-6 md:p-8 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                      <h2 className="text-xl font-bold text-white">
                        {editingIndustry.id ? `Edit Sector: ${editingIndustry.name}` : "Create New Sector"}
                      </h2>
                      <button
                        onClick={() => setEditingIndustry(null)}
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        ✕ Cancel
                      </button>
                    </div>

                    <form onSubmit={saveIndustryForm} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Industry Sector Name *</label>
                          <input
                            type="text"
                            value={editingIndustry.name || ""}
                            onChange={(e) => {
                              const name = e.target.value;
                              const slug = name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "");
                              setEditingIndustry({
                                ...editingIndustry,
                                name,
                                slug: editingIndustry.id ? editingIndustry.slug : slug,
                              });
                            }}
                            required
                            placeholder="e.g. Aerospace Packaging"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">URL Slug *</label>
                          <input
                            type="text"
                            value={editingIndustry.slug || ""}
                            onChange={(e) =>
                              setEditingIndustry({
                                ...editingIndustry,
                                slug: e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\-]+/g, ""),
                              })
                            }
                            required
                            placeholder="e.g. aerospace-packaging"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
                        <textarea
                          value={editingIndustry.description || ""}
                          onChange={(e) => setEditingIndustry({ ...editingIndustry, description: e.target.value })}
                          required
                          rows={4}
                          placeholder="Describe the packaging application and requirements for this industry sector..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                        />
                      </div>

                      {/* Industry Keywords */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Sector Keywords (SEO)</label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={tempIndustryKeyword}
                            onChange={(e) => setTempIndustryKeyword(e.target.value)}
                            placeholder="e.g. Aerospace Box"
                            className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (!tempIndustryKeyword.trim()) return;
                                const kws = editingIndustry.keywords || [];
                                if (!kws.includes(tempIndustryKeyword.trim())) {
                                  setEditingIndustry({
                                    ...editingIndustry,
                                    keywords: [...kws, tempIndustryKeyword.trim()],
                                  });
                                }
                                setTempIndustryKeyword("");
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!tempIndustryKeyword.trim()) return;
                              const kws = editingIndustry.keywords || [];
                              if (!kws.includes(tempIndustryKeyword.trim())) {
                                setEditingIndustry({
                                  ...editingIndustry,
                                  keywords: [...kws, tempIndustryKeyword.trim()],
                                });
                              }
                              setTempIndustryKeyword("");
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-lg font-bold border border-white/10 transition"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editingIndustry.keywords?.map((word) => (
                            <span
                              key={word}
                              className="inline-flex items-center text-sm bg-secondary/30 border border-secondary/50 text-white px-3 py-1 rounded-full"
                            >
                              <span>{word}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingIndustry({
                                    ...editingIndustry,
                                    keywords: (editingIndustry.keywords || []).filter((w) => w !== word),
                                  })
                                }
                                className="ml-2 text-accent hover:text-white"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-6 border-t border-white/5">
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex-grow bg-accent text-white py-3 rounded-lg font-bold shadow-lg hover:bg-accent/90 active:scale-[0.98] transition duration-200 flex items-center justify-center"
                        >
                          {isSaving ? "Saving changes..." : "Save Industry Settings"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingIndustry(null)}
                          className="px-6 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ================= LOCATIONS TAB ================= */}
            {currentTab === "locations" && (
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white">Locations Served</h2>
                  <p className="text-gray-400 text-sm">Add or delete physical locations from landing configurations.</p>
                </div>

                <div className="glass-card-dark p-6 rounded-xl border border-white/5 mb-8">
                  <form onSubmit={addLocation} className="flex gap-3">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Enter city or hub name (e.g. Pune)"
                      required
                      className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    />
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-2.5 rounded-lg active:scale-95 transition"
                    >
                      {isSaving ? "Adding..." : "Add Hub"}
                    </button>
                  </form>
                </div>

                <div className="glass-card-dark p-6 rounded-xl border border-white/5">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4 border-b border-white/5 pb-2">Active Locations List</h3>
                  
                  {locations.length === 0 ? (
                    <p className="text-gray-500 text-center py-6 text-sm">No locations configured.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {locations.map((loc) => (
                        <div
                          key={loc}
                          className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg py-2.5 px-4"
                        >
                          <span className="text-white font-medium">{loc}</span>
                          <button
                            onClick={() => removeLocation(loc)}
                            disabled={isSaving}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded transition"
                          >
                            ✕ Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= KEYWORDS TAB ================= */}
            {currentTab === "keywords" && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-white">SEO Keywords Management</h2>
                  <p className="text-gray-400 text-sm">Configure primary, secondary, and long-tail metadata terms for SEO optimization.</p>
                </div>

                {/* Primary Keywords Section */}
                <div className="glass-card-dark p-6 rounded-xl border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">Primary Keywords</h3>
                  <p className="text-gray-400 text-xs mb-4">Core high-traffic keywords representing primary products and offerings.</p>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={tempKeywordInput.primary}
                      onChange={(e) => setTempKeywordInput({ ...tempKeywordInput, primary: e.target.value })}
                      placeholder="Add primary keyword..."
                      className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addKeywordTag("primary");
                        }
                      }}
                    />
                    <button
                      onClick={() => addKeywordTag("primary")}
                      disabled={isSaving}
                      className="bg-accent/20 hover:bg-accent/40 text-accent font-bold px-4 rounded-lg border border-accent/30 transition text-sm"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {keywords.primaryKeywords?.map((word) => (
                      <span
                        key={word}
                        className="inline-flex items-center text-sm bg-primary/20 border border-primary/45 text-gray-200 px-3 py-1 rounded-full"
                      >
                        <span>{word}</span>
                        <button
                          onClick={() => removeKeywordTag("primary", word)}
                          disabled={isSaving}
                          className="ml-2 text-accent hover:text-white transition"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary Keywords Section */}
                <div className="glass-card-dark p-6 rounded-xl border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">Secondary Keywords</h3>
                  <p className="text-gray-400 text-xs mb-4">Secondary level high-intent search queries.</p>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={tempKeywordInput.secondary}
                      onChange={(e) => setTempKeywordInput({ ...tempKeywordInput, secondary: e.target.value })}
                      placeholder="Add secondary keyword..."
                      className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addKeywordTag("secondary");
                        }
                      }}
                    />
                    <button
                      onClick={() => addKeywordTag("secondary")}
                      disabled={isSaving}
                      className="bg-accent/20 hover:bg-accent/40 text-accent font-bold px-4 rounded-lg border border-accent/30 transition text-sm"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {keywords.secondaryKeywords?.map((word) => (
                      <span
                        key={word}
                        className="inline-flex items-center text-sm bg-secondary/20 border border-secondary/45 text-gray-200 px-3 py-1 rounded-full"
                      >
                        <span>{word}</span>
                        <button
                          onClick={() => removeKeywordTag("secondary", word)}
                          disabled={isSaving}
                          className="ml-2 text-accent hover:text-white transition"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Long-Tail Keywords Section */}
                <div className="glass-card-dark p-6 rounded-xl border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">Long-Tail Keywords</h3>
                  <p className="text-gray-400 text-xs mb-4">Niche long-tail search items targeting precise conversions.</p>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={tempKeywordInput.longTail}
                      onChange={(e) => setTempKeywordInput({ ...tempKeywordInput, longTail: e.target.value })}
                      placeholder="Add long-tail keyword..."
                      className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addKeywordTag("longTail");
                        }
                      }}
                    />
                    <button
                      onClick={() => addKeywordTag("longTail")}
                      disabled={isSaving}
                      className="bg-accent/20 hover:bg-accent/40 text-accent font-bold px-4 rounded-lg border border-accent/30 transition text-sm"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {keywords.longTailKeywords?.map((word) => (
                      <span
                        key={word}
                        className="inline-flex items-center text-sm bg-white/5 border border-white/10 text-gray-200 px-3 py-1 rounded-full"
                      >
                        <span>{word}</span>
                        <button
                          onClick={() => removeKeywordTag("longTail", word)}
                          disabled={isSaving}
                          className="ml-2 text-accent hover:text-white transition"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ================= BLOGS TAB ================= */}
            {currentTab === "blogs" && (
              <div>
                {!editingBlog ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">Blog Management</h2>
                        <p className="text-gray-400 text-sm">Write, format, update and delete blog articles.</p>
                      </div>
                      <button
                        onClick={() => startEditBlog(null)}
                        className="bg-accent text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-accent/90 active:scale-[0.98] transition duration-200 flex items-center space-x-2 text-sm"
                      >
                        <span>+ Write Blog</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="glass-card-dark p-6 rounded-xl border border-white/5 flex flex-col h-full hover:border-white/10 transition duration-300"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-white line-clamp-1">{blog.title}</h3>
                            <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded font-mono">
                              {blog.category}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>By {blog.author}</span>
                            <span>{blog.date}</span>
                          </div>

                          <div className="flex space-x-2 pt-4 border-t border-white/5">
                            <button
                              onClick={() => startEditBlog(blog)}
                              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-200 py-2 rounded-lg text-sm font-semibold transition duration-200 border border-white/10"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteBlog(blog.id)}
                              disabled={isSaving}
                              className="px-3 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 py-2 rounded-lg text-sm font-semibold transition duration-200 border border-red-900/30"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {blogs.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                          No blog posts found. Click &quot;+ Write Blog&quot; to create one.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* BLOG EDIT FORM */
                  <div className="max-w-5xl mx-auto glass-card-dark p-6 md:p-8 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                      <h2 className="text-xl font-bold text-white">
                        {editingBlog.id ? `Edit Blog: ${editingBlog.title}` : "Write New Blog"}
                      </h2>
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        ✕ Cancel
                      </button>
                    </div>

                    <form onSubmit={saveBlogForm} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Blog Title *</label>
                          <input
                            type="text"
                            value={editingBlog.title || ""}
                            onChange={(e) => {
                              const title = e.target.value;
                              const slug = title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "");
                              setEditingBlog({
                                ...editingBlog,
                                title,
                                slug: editingBlog.id ? editingBlog.slug : slug,
                              });
                            }}
                            required
                            placeholder="e.g. Benefits of PP Boxes"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">URL Slug *</label>
                          <input
                            type="text"
                            value={editingBlog.slug || ""}
                            onChange={(e) =>
                              setEditingBlog({
                                ...editingBlog,
                                slug: e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\-]+/g, ""),
                              })
                            }
                            required
                            placeholder="e.g. benefits-of-pp-boxes"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Author *</label>
                          <input
                            type="text"
                            value={editingBlog.author || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                            required
                            placeholder="e.g. John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                          <select
                            value={editingBlog.category || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent font-sans text-gray-300"
                          >
                            <option value="" disabled className="bg-gray-900">Select Category</option>
                            <option value="Packaging" className="bg-gray-900">Packaging</option>
                            <option value="Logistics" className="bg-gray-900">Logistics</option>
                            <option value="Sustainability" className="bg-gray-900">Sustainability</option>
                            <option value="Electronics" className="bg-gray-900">Electronics</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Date *</label>
                          <input
                            type="date"
                            value={editingBlog.date || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent font-sans text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Cover Image URL</label>
                          <input
                            type="text"
                            value={editingBlog.coverImage || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                            placeholder="e.g. /blog-guide-pp-boxes.webp"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Search Keywords (SEO)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={tempBlogKeyword}
                              onChange={(e) => setTempBlogKeyword(e.target.value)}
                              placeholder="Press enter to add..."
                              className="flex-grow bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  if (!tempBlogKeyword.trim()) return;
                                  const kws = editingBlog.keywords || [];
                                  if (!kws.includes(tempBlogKeyword.trim())) {
                                    setEditingBlog({
                                      ...editingBlog,
                                      keywords: [...kws, tempBlogKeyword.trim()],
                                    });
                                  }
                                  setTempBlogKeyword("");
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!tempBlogKeyword.trim()) return;
                                const kws = editingBlog.keywords || [];
                                if (!kws.includes(tempBlogKeyword.trim())) {
                                  setEditingBlog({
                                    ...editingBlog,
                                    keywords: [...kws, tempBlogKeyword.trim()],
                                  });
                                }
                                setTempBlogKeyword("");
                              }}
                              className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-lg font-bold border border-white/10 transition"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {editingBlog.keywords?.map((word) => (
                              <span
                                key={word}
                                className="inline-flex items-center text-xs bg-secondary/35 border border-secondary/50 text-white px-2 py-0.5 rounded-full"
                              >
                                <span>{word}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditingBlog({
                                      ...editingBlog,
                                      keywords: (editingBlog.keywords || []).filter((w) => w !== word),
                                    })
                                  }
                                  className="ml-1 text-accent hover:text-white"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt (Short Description) *</label>
                        <textarea
                          value={editingBlog.excerpt || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          required
                          rows={2}
                          placeholder="Provide a short, catchy summary of the article..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                        />
                      </div>

                      {/* Content WYSIWYG Editor with HTML source toggle */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-semibold text-gray-300">Blog Content (Rich Text Editor) *</label>
                          <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
                            <button
                              type="button"
                              onClick={() => setEditorTab("visual")}
                              className={`px-3 py-1 text-xs font-semibold rounded-md transition duration-200 cursor-pointer ${
                                editorTab === "visual"
                                  ? "bg-accent text-white shadow-sm"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              Visual Editor
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditorTab("html")}
                              className={`px-3 py-1 text-xs font-semibold rounded-md transition duration-200 cursor-pointer ${
                                editorTab === "html"
                                  ? "bg-accent text-white shadow-sm"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              HTML Source
                            </button>
                          </div>
                        </div>

                        {editorTab === "visual" ? (
                          <div className="flex flex-col">
                            {/* Formatting Toolbar */}
                            <div className="flex flex-wrap gap-2 p-2 bg-white/5 border border-white/10 rounded-t-lg border-b-0 items-center">
                              <span className="text-xs text-gray-400 font-semibold px-2">Size:</span>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  toggleBlock("H1");
                                }}
                                className={`px-2 py-1 text-xs border rounded font-bold transition duration-200 cursor-pointer ${
                                  activeFormats.h1
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Heading 1 (Large)"
                              >
                                H1
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  toggleBlock("H2");
                                }}
                                className={`px-2 py-1 text-xs border rounded font-bold transition duration-200 cursor-pointer ${
                                  activeFormats.h2
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Heading 2 (Medium)"
                              >
                                H2
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  toggleBlock("H3");
                                }}
                                className={`px-2 py-1 text-xs border rounded font-bold transition duration-200 cursor-pointer ${
                                  activeFormats.h3
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Heading 3 (Small)"
                              >
                                H3
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  toggleBlock("P");
                                }}
                                className={`px-2 py-1 text-xs border rounded transition duration-200 cursor-pointer ${
                                  activeFormats.p
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Normal Text"
                              >
                                Normal
                              </button>
                              
                              <div className="h-4 w-px bg-white/10 mx-1"></div>
                              
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  execFormatter("bold");
                                  updateActiveFormats();
                                }}
                                className={`px-2.5 py-1 text-xs border rounded font-extrabold transition duration-200 cursor-pointer ${
                                  activeFormats.bold
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Bold"
                              >
                                B
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  execFormatter("italic");
                                  updateActiveFormats();
                                }}
                                className={`px-2.5 py-1 text-xs border rounded italic transition duration-200 cursor-pointer ${
                                  activeFormats.italic
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Italic"
                              >
                                I
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  execFormatter("underline");
                                  updateActiveFormats();
                                }}
                                className={`px-2.5 py-1 text-xs border rounded underline transition duration-200 cursor-pointer ${
                                  activeFormats.underline
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Underline"
                              >
                                U
                              </button>

                              <div className="h-4 w-px bg-white/10 mx-1"></div>

                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  toggleList();
                                }}
                                className={`px-2 py-1 text-xs border rounded transition duration-200 cursor-pointer ${
                                  activeFormats.list
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Bullet List"
                              >
                                • List
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  toggleBlock("blockquote");
                                }}
                                className={`px-2 py-1 text-xs border rounded transition duration-200 cursor-pointer italic ${
                                  activeFormats.blockquote
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                                }`}
                                title="Blockquote"
                              >
                                &ldquo; Quote
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  insertLink();
                                }}
                                className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded text-gray-300 transition duration-200 cursor-pointer"
                                title="Insert Link"
                              >
                                🔗 Link
                              </button>
                            </div>

                            {/* contentEditable WYSIWYG sheet container */}
                            <div
                              ref={wysiwygRef}
                              contentEditable
                              onInput={(e) => {
                                const htmlContent = e.currentTarget.innerHTML;
                                setEditingBlog((prev) => {
                                  if (!prev) return prev;
                                  return {
                                    ...prev,
                                    content: htmlContent,
                                  };
                                });
                              }}
                              className="w-full bg-white text-gray-800 rounded-b-lg py-4 px-6 min-h-[400px] max-h-[600px] overflow-y-auto outline-none border border-white/10 border-t-0 rounded-t-none text-left wysiwyg-editor prose prose-slate max-w-none"
                              style={{ color: "#1f2937", backgroundColor: "#ffffff" }}
                            />
                            
                            <p className="text-xs text-gray-500 mt-2">
                              Visual Editor mode: Type directly above. Highlight text to apply formatting using the toolbar.
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <textarea
                              value={editingBlog.content || ""}
                              onChange={(e) =>
                                setEditingBlog((prev) => {
                                  if (!prev) return prev;
                                  return {
                                    ...prev,
                                    content: e.target.value,
                                  };
                                })
                              }
                              required
                              rows={15}
                              placeholder="Raw HTML code will appear here..."
                              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white font-mono focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent leading-relaxed text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              HTML Source mode: Modify raw HTML markup tags directly.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3 pt-6 border-t border-white/5">
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex-grow bg-accent text-white py-3 rounded-lg font-bold shadow-lg hover:bg-accent/90 active:scale-[0.98] transition duration-200 flex items-center justify-center"
                        >
                          {isSaving ? "Saving changes..." : "Save Blog Post"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="px-6 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
