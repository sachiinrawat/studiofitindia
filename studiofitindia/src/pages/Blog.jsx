import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar, Search, User, ChevronRight, TrendingUp } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import SEO from "../components/SEO";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const seoProps = {
    title: "Fitness Advice & Workout Tips | Studio FIT India Blog",
    description: "Read the latest fitness tips, workout advice, and weight loss strategies from the certified coaching team at Studio FIT India. Expert guides on yoga, HIIT, weight loss, and home workout motivation.",
    keywords: ["fitness blog India", "workout tips at home", "online training advice", "Studio FIT blog"]
  };

  const categories = ["All", "Yoga", "Weight Loss", "Motivation", "Nutrition"];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost.id);

  return (
    <div className="w-full bg-white min-h-screen">
      <SEO {...seoProps} />
      {/* Search & Category Header (Sticky) */}
      <div className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between gap-8">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedCategory === cat 
                    ? "bg-gray-900 text-white" 
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Featured Post (Pure Typography Card - No Images) */}
        {!searchQuery && selectedCategory === "All" && (
          <div className="mb-14">
            <Link 
              to={`/blog/${featuredPost.slug}`} 
              className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-8 sm:p-12 border border-gray-800 shadow-xl hover:border-secondary/40 transition-all duration-300"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="bg-secondary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                    Featured Article
                  </span>
                  <span className="bg-white/10 text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                    <Calendar size={13} className="text-secondary" /> {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                    <Clock size={13} className="text-secondary" /> {featuredPost.readTime}
                  </div>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-4 leading-tight group-hover:text-rose-100 transition-colors">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed line-clamp-3 max-w-2xl">
                  {featuredPost.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary font-black text-xs">
                      SF
                    </div>
                    <div>
                      <span className="block text-white font-bold uppercase tracking-wider text-xs">{featuredPost.author}</span>
                      <span className="block text-gray-400 text-[10px]">Studio FIT India Coach</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-secondary font-black uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform">
                    Read Full Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
              <TrendingUp size={24} className="text-secondary" />
              Latest Insights
            </h3>

            <div className="space-y-6">
              {otherPosts.length > 0 ? (
                otherPosts.map(post => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-secondary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-secondary/10 text-secondary text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Calendar size={13} className="text-gray-400" /> {post.date}
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock size={13} className="text-gray-400" /> {post.readTime}
                      </div>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 mb-3 group-hover:text-secondary transition-colors leading-snug">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400 font-medium">By {post.author}</span>
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="inline-flex items-center gap-1.5 text-secondary font-bold uppercase tracking-wider text-xs group/link hover:underline"
                      >
                        Read Article <ChevronRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-500">No articles found matching your criteria.</h4>
                  <button 
                    onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                    className="mt-4 text-secondary font-bold uppercase tracking-wider text-xs hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            {/* Newsletter CTA */}
            <div className="bg-gray-950 p-8 rounded-2xl relative overflow-hidden group border border-gray-800">
              <div className="relative z-10">
                <h4 className="text-white text-xl font-bold font-heading mb-3 leading-tight">
                  Get Fitness Hacks <br /> 
                  <span className="text-secondary">Direct to Inbox</span>
                </h4>
                <p className="text-gray-400 text-sm mb-6 font-medium">Join 25,000+ members getting weekly workout guides and nutrition tips.</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="yourname@gmail.com"
                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  />
                  <button className="w-full py-3 bg-secondary text-white font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-secondary/90 btn-pop">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="text-lg font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-secondary rounded-full" />
                Categories
              </h4>
              <div className="space-y-1">
                {categories.slice(1).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                  >
                    <span className={`font-semibold text-sm uppercase tracking-wider ${selectedCategory === cat ? 'text-secondary font-bold' : 'text-gray-600'}`}>{cat}</span>
                    <ChevronRight size={16} className={`group-hover:translate-x-1 transition-transform ${selectedCategory === cat ? 'text-secondary' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Join CTA Widget */}
            <div className="bg-secondary/5 p-8 rounded-2xl border border-secondary/10">
              <h4 className="text-xl font-bold font-heading text-gray-900 mb-3">
                Ready to <span className="text-secondary">Start?</span>
              </h4>
              <p className="text-gray-600 text-sm mb-6 font-medium">"Stop reading about results, start feeling them."</p>
              <a 
                href="https://wa.me/918796442732?text=Hi!%20I%20just%20visited%20your%20website%20and%20I%20want%20to%20book%20a%20trial%20at%20just%20₹1." 
                className="flex items-center justify-center gap-2 w-full py-4 bg-secondary text-white font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-secondary/90 btn-pop"
              >
                Join Studio FIT <ArrowRight size={16} />
              </a>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-32px)]">
        <a 
          href="https://wa.me/918796442732?text=Hi!%20I%20just%20visited%20your%20website%20and%20I%20want%20to%20book%20a%20trial%20at%20just%20₹1." 
          className="flex items-center justify-center gap-2 w-full py-4 bg-secondary text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-lg hover:bg-secondary/90 btn-pop"
        >
          Book a Trial at Just ₹1 <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default Blog;
