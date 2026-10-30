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
        url: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1787160047/sfi_pdk6so.png",
      },
    },
    description: seo.description,
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} schema={articleSchema} />
      {/* Post Header (Clean Typography - No Images) */}
      <section className="pt-10 pb-12 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-secondary transition-colors font-medium">Home</Link>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            <Link to="/blog" className="hover:text-secondary transition-colors font-medium">Blog</Link>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
            <span className="text-secondary font-bold truncate">{post.title}</span>
          </nav>

          <div className="inline-block mb-4">
            <span className="bg-secondary text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-600 font-semibold tracking-wide border-t border-gray-200 pt-5">
            <div className="flex items-center gap-2"><User size={15} className="text-secondary"/> By {post.author}</div>
            <div className="flex items-center gap-2"><Calendar size={15} className="text-secondary"/> {post.date}</div>
            <div className="flex items-center gap-2"><Clock size={15} className="text-secondary"/> {post.readTime}</div>
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
                if (trimmed.startsWith("- ")) {
                  return (
                    <div key={i} className="flex items-start gap-3 my-2.5 pl-2">
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2.5" />
                      <p className="mb-0 text-gray-800 leading-relaxed">{trimmed.replace("- ", "")}</p>
                    </div>
                  );
                }
                return <p key={i}>{trimmed}</p>;
              })}

            </div>

            {/* Post Footer Lead-Generating CTA Box */}
            <div className="mt-16 bg-gradient-to-br from-rose-50 via-pink-50/60 to-amber-50/40 border-2 border-secondary/20 rounded-2xl p-6 sm:p-10 text-center shadow-sm">
              <span className="inline-block bg-secondary text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Live Interactive Coaching
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 mb-3">
                Experience It From Your Living Room — Just ₹1
              </h4>
              <p className="text-gray-700 mb-6 max-w-xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
                Join a live 1-hour workout with certified coaches, real-time form correction, and custom batch options. Zero card commitments.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href={`https://wa.me/918796442732?text=${encodeURIComponent(
                    `Hi Studio FIT India! I just read your article "${post.title}" and want to book a ₹1 live trial class.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Book ₹1 Trial on WhatsApp</span>
                </a>

                <Link 
                  to="/pricing" 
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-extrabold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                >
                  View Festive Plans & Offers
                </Link>
              </div>
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
