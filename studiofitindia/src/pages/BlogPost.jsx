import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import SEO from "../components/SEO";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const { seo } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seo.title,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Studio FIT India",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png",
      },
    },
    description: seo.description,
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} schema={articleSchema} />
      {/* Post Header */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 z-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-secondary transition-colors font-medium">Home</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link to="/blog" className="hover:text-secondary transition-colors font-medium">Blog</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-secondary font-bold truncate">{post.title}</span>
          </nav>

          <div className="inline-block mb-4">
            <span className="bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 font-semibold tracking-wide border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2"><User size={16} className="text-secondary"/> By {post.author}</div>
            <div className="flex items-center gap-2"><Calendar size={16} className="text-secondary"/> {post.date}</div>
            <div className="flex items-center gap-2"><Clock size={16} className="text-secondary"/> {post.readTime}</div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-12 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-12 shadow-sm">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-10 italic border-l-4 border-secondary pl-6">
              {post.description}
            </p>

            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-body
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
              prose-p:mb-6 prose-strong:text-gray-900 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline font-medium">
              
              {post.content.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("### ")) {
                  return <h3 key={i}>{trimmed.replace("### ", "")}</h3>;
                }
                return <p key={i}>{trimmed}</p>;
              })}

            </div>

            {/* Post Footer CTA */}
            <div className="mt-16 bg-secondary/5 border border-secondary/15 rounded-xl p-8 text-center">
              <h4 className="text-2xl font-bold font-heading text-gray-900 mb-3">Ready to transform your body?</h4>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto font-medium">Join Studio FIT India today and get access to expert coaches, personalized feedback, and a community that pushes you to excel.</p>
              <a 
                href="/pricing" 
                className="inline-block bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                View Plans & Enroll
              </a>
            </div>

            <div className="mt-12 text-center">
              <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-secondary transition-colors font-bold uppercase text-xs tracking-wider">
                <ArrowLeft size={16} /> Back to all articles
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
