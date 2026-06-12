import { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Global/Navbar";
import Footer from "./components/Global/Footer";
import ScrollToTop from "./components/Global/ScrollToTop";

import WhatsAppButton from "./components/Global/WhatsAppButton";
import StickyMobileCTA from "./components/Global/StickyMobileCTA";
import ExitIntentPopup from "./components/Global/ExitIntentPopup";
import BatchFinderQuiz from "./components/BatchFinderQuiz";
import Home from "./pages/Home";

const Programs = lazy(() => import("./pages/Programs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Refund = lazy(() => import("./pages/Refund"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Schedule = lazy(() => import("./pages/Schedule"));
const ProgramDetails = lazy(() => import("./pages/ProgramDetails"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function AnimatedRoutes({ onStartQuiz }) {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home onStartQuiz={onStartQuiz} />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/program" element={<Navigate to="/programs" replace />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-condition" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/cancellation-and-refund" element={<Refund />} />
        <Route path="/shipping-policy" element={<Shipping />} />
        <Route path="/schedule" element={<Schedule />} />
        {/* SEO Program Landing Pages */}
        <Route path="/yoga-classes-online" element={<ProgramDetails />} />
        <Route path="/hiit-training-online" element={<ProgramDetails />} />
        <Route path="/zumba-classes-online" element={<ProgramDetails />} />
        <Route path="/strength-training-online" element={<ProgramDetails />} />
        <Route path="/weight-loss-program-online" element={<ProgramDetails />} />
        <Route path="/personal-training-online" element={<ProgramDetails />} />

        {/* SEO Blog Routing */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white font-body text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes onStartQuiz={() => setIsQuizOpen(true)} />
        </main>
        <Footer />
        <WhatsAppButton />
        <StickyMobileCTA onStartQuiz={() => setIsQuizOpen(true)} />
        <ExitIntentPopup />
        <BatchFinderQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
