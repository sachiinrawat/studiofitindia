import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAssetUrl } from "../../utils/assets";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Plans & Pricing", path: "/pricing" },
    { name: "About Us", path: "/about" },
    { name: "Reviews", path: "/reviews" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full">

      <nav
        className={`transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-white py-4 shadow-sm"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center"
            aria-label="Studio FIT India — Home"
          >
            <img
              src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png"
              alt="Studio FIT India"
              width="180"
              height="50"
              fetchPriority="high"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${link.highlight ? "text-secondary font-extrabold" : location.pathname === link.path ? "text-secondary" : "text-gray-900 hover:text-secondary"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/pricing"
              className="bg-secondary hover:bg-secondary/95 text-white px-6 py-2 rounded-full font-bold transition-all shadow-sm text-xs tracking-wider"
            >
              JOIN NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-nav"
            className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {links.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className={`block text-lg font-bold uppercase tracking-wider transition-colors ${link.highlight ? "text-secondary" : "text-gray-900 hover:text-secondary"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
              <div>
                <Link
                  to="/pricing"
                  className="block text-center bg-secondary text-white py-3 rounded-lg font-bold mt-4 uppercase tracking-wider text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  JOIN NOW
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
