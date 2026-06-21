import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogs } from "@/app/admin/actions";
import LeadForm from "@/components/LeadForm";
import BlogCoverImage from "@/components/BlogCoverImage";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for Next.js builds/exports
export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for blogs:", error);
    return [];
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blogs = await getBlogs();
    const blog = blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
    
    if (!blog) {
      return { title: "Article Not Found | RTGS PACK LLP" };
    }

    return {
      title: `${blog.title} | RTGS PACK LLP Blog`,
      description: blog.excerpt,
      keywords: blog.keywords ? blog.keywords.join(", ") : undefined,
    };
  } catch (error) {
    return { title: "RTGS PACK LLP Blog" };
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase());

  if (!blog) {
    notFound();
  }

  // Calculate reading time helper
  const wordsPerMinute = 200;
  const words = blog.content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-secondary hover:text-primary font-bold mb-8 group transition-colors duration-200 text-sm md:text-base"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Articles
        </Link>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Article Panel */}
          <article className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-10 shadow-premium border border-gray-100 overflow-hidden">
            {/* Category badge & read time */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-secondary/15 text-secondary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {blog.category}
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                {readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Author and Date bar */}
            <div className="flex items-center space-x-3 mb-8 border-y border-gray-100 py-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                {blog.author.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{blog.author}</p>
                <p className="text-xs text-gray-500">Published on {blog.date}</p>
              </div>
            </div>

            {/* Cover Image */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10 relative bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
              <BlogCoverImage src={blog.coverImage} title={blog.title} />
            </div>

            {/* Excerpt panel */}
            <div className="border-l-4 border-secondary bg-gray-50/50 p-6 rounded-r-xl mb-10 italic text-gray-600 text-lg leading-relaxed">
              &ldquo;{blog.excerpt}&rdquo;
            </div>

            {/* Main Rich text body */}
            <div 
              className="prose prose-slate max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Keywords / Tags tags */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Topic Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.keywords.map((word) => (
                    <span
                      key={word}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-md"
                    >
                      #{word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Lead Form Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm title="Request Packaging Customization" />
              <div className="bg-primary text-white rounded-3xl p-8 shadow-premium mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-12 -translate-y-12 blur-xl"></div>
                <h3 className="text-xl font-bold mb-3">Need Custom PP Packaging?</h3>
                <p className="text-sm text-gray-200 mb-6 leading-relaxed">
                  Our engineering team designs and manufactures reusable corrugated boxes, inserts, and ESD crates to protect your goods during material handling and shipment.
                </p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="mr-3 text-lg">🏭</span>
                    <span>Direct Factory Prices</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-3 text-lg">📐</span>
                    <span>100% Tailored Designs</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-3 text-lg">♻️</span>
                    <span>100% Recyclable Material</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
