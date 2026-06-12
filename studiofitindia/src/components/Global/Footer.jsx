import { Link } from "react-router-dom";
import {
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4">
              STUDIO <span className="text-secondary">FIT</span> INDIA
            </h3>
            <p className="text-gray-600 mb-6">
              Where sweat, support, and success intertwine. Join our online
              fitness family today.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/studiofitindia1/"
                className="w-10 h-10 hover:opacity-90 transition-all flex items-center justify-center overflow-hidden"
                aria-label="Follow Studio FIT India on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3955/3955024.png" 
                  alt="Instagram" 
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://www.facebook.com/p/Studio-FIT-India-61554292632666/"
                className="w-10 h-10 hover:opacity-90 transition-all flex items-center justify-center overflow-hidden"
                aria-label="Follow Studio FIT India on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" 
                  alt="Facebook" 
                  className="w-full h-full object-contain"
                />
              </a>
              <a
                href="https://www.youtube.com/@STUDIOFITINDIA-xc8wv"
                className="w-10 h-10 hover:opacity-90 transition-all flex items-center justify-center overflow-hidden"
                aria-label="Subscribe to Studio FIT India on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4494/4494485.png" 
                  alt="YouTube" 
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="hover:text-secondary transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-secondary transition-colors"
                >
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-secondary transition-colors"
                >
                  Fitness Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-secondary transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Policies</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  to="/terms-and-condition"
                  className="hover:text-secondary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-and-refund"
                  className="hover:text-secondary transition-colors"
                >
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-secondary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Contact Us</h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-3 text-secondary flex-shrink-0 mt-1"
                />
                <span>
                  6th Floor Office no. 61, I-thum's Galleria Mall, Greater
                  Noida, Uttar Pradesh 201310
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-secondary flex-shrink-0" />
                <a href="tel:+919310666287" className="hover:text-secondary transition-colors">
                  +91 93106 66287
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-secondary flex-shrink-0" />
                <a
                  href={"mailto:" + "studiofitindiahelpdesk" + "@" + "gmail.com"}
                  className="hover:text-secondary transition-colors break-all"
                >
                  {"studiofitindiahelpdesk" + "@" + "gmail.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Studio Fit India. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
