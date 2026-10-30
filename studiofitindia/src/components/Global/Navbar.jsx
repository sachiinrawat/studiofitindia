import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* ── Route → category mapping ─────────────────────────────────────── */
const FITNESS_PATHS = ["/", "/programs", "/pricing", "/reviews", "/blog", "/about", "/contact"];
const TRANSFORMATION_PATHS = ["/transformation"];
const DIET_PATHS = ["/diet"];

function getActiveCategory(pathname) {
  if (TRANSFORMATION_PATHS.some((p) => pathname.startsWith(p))) return "TRANSFORMATION";
  if (DIET_PATHS.some((p) => pathname.startsWith(p))) return "DIET";
  return "FITNESS";
}

/* ── Sub-nav links for FITNESS ─────────────────────────────────────── */
const FITNESS_LINKS = [
  { name: "Home",     path: "/" },
  { name: "Programs", path: "/programs" },
  { name: "Pricing",  path: "/pricing" },
  { name: "Reviews",  path: "/reviews" },
  { name: "Results",  path: "/results" },
  { name: "Blog",     path: "/blog" },
  { name: "About",    path: "/about" },
  { name: "Contact",  path: "/contact" },
];

const PRIMARY_CATEGORIES = [
  { id: "FITNESS",        label: "FITNESS",        path: "/" },
  { id: "TRANSFORMATION", label: "TRANSFORMATION", path: "/transformation" },
];

const BRAND = "#D3365F";

const Navbar = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  const activeCategory = getActiveCategory(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  /* close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── render ──────────────────────────────────────────────────────── */
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">

      {/* ══ PRIMARY BAR ═══════════════════════════════════════════════ */}
      <div
        className={`w-full transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
        style={{ background: "#1a1a1a" }}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" aria-label="Studio FIT India — Home" className="flex items-center shrink-0">
            <img
              src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1787160047/sfi_pdk6so.png"
              alt="Studio FIT India"
              width="160"
              height="44"
              fetchPriority="high"
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop: primary category tabs */}
          <nav className="hidden md:flex items-center gap-0" aria-label="Primary navigation">
            {PRIMARY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="relative flex items-center px-6 py-1 text-[13px] font-black tracking-[0.12em] transition-colors duration-200"
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                    letterSpacing: "0.12em",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {cat.label}
                  {/* Active underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
                      style={{ background: BRAND }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop: CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/pricing"
              className="text-[11px] font-black tracking-widest px-5 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: BRAND, color: "#fff" }}
            >
              JOIN NOW
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden p-1 text-white focus:outline-none"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ══ SECONDARY BAR (FITNESS only, desktop) ═════════════════════ */}
      {activeCategory === "FITNESS" && (
        <div
          className="hidden md:block w-full border-b border-gray-100"
          style={{ background: "#fff", boxShadow: "0 1px 0 0 #f0f0f0" }}
        >
          <div className="container mx-auto px-6 flex items-center justify-center gap-0">
            {FITNESS_LINKS.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-3 text-[12.5px] font-semibold tracking-wide transition-colors duration-200"
                  style={{
                    color: isActive ? BRAND : "#444",
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: BRAND }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ MOBILE MENU ════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-14 left-0 right-0 z-50 shadow-xl border-t border-gray-100"
          style={{ background: "#fff" }}
        >
          {/* Primary categories */}
          <div className="flex border-b border-gray-100" style={{ background: "#1a1a1a" }}>
            {PRIMARY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={cat.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-3 text-[11px] font-black tracking-widest transition-colors"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                >
                  {cat.label}
                  {isActive && (
                    <div className="mx-auto mt-1.5 h-[2px] w-8 rounded-full" style={{ background: BRAND }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sub-links for active category */}
          <div className="flex flex-col p-5 gap-1">
            {activeCategory === "FITNESS" &&
              FITNESS_LINKS.map((link) => {
                const isActive =
                  link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 rounded-lg text-[15px] font-semibold transition-colors"
                    style={{
                      color:      isActive ? BRAND : "#222",
                      background: isActive ? "#fff0f4" : "transparent",
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

            {activeCategory === "TRANSFORMATION" && (
              <Link
                to="/transformation"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-[15px] font-semibold"
                style={{ color: BRAND }}
              >
                Transformation Program →
              </Link>
            )}

            {activeCategory === "DIET" && (
              <Link
                to="/diet"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-[15px] font-semibold"
                style={{ color: BRAND }}
              >
                Diet & Nutrition →
              </Link>
            )}

            {/* CTA */}
            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block text-center py-3 rounded-xl text-[12px] font-black tracking-widest transition-all"
              style={{ background: BRAND, color: "#fff" }}
            >
              JOIN NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
