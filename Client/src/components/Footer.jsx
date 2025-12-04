import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

const socialIcons = [
  { icon: <Instagram />, name: "Instagram", link: "#" },
  { icon: <Facebook />, name: "Facebook", link: "#" },
  { icon: <Twitter />, name: "Twitter", link: "#" },
  { icon: <Youtube />, name: "Youtube", link: "#" },
];

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Subscribed with:", email);
    setSubscribed(true);
    e.target.reset();
    setTimeout(() => setSubscribed(false), 3000); 
  };

  return (
    <footer className="bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Link
                to="/"
                className="group text-4xl font-semibold tracking-wide transition-all duration-300 hover:scale-110"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="text-white">SOLE</span>
                <span
                  className="ml-1 text-[#ddb445] group-hover:text-yellow-400 transition duration-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "1px",
                  }}
                >
                  MATE
                </span>
              </Link>
            </div>
            <p className="text-sm text-gray-300">
              Your ultimate destination for premium footwear from the world’s top brands. Step into excellence with every stride.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((s, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="hover:text-yellow-400 hover:scale-110 transition"
                  as="a"
                  href={s.link}
                  aria-label={s.name}
                >
                  {s.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["New Arrivals", "Best Sellers", "Sale", "Gift Cards", "Size Guide"].map((item, i) => (
                <li key={i} className="cursor-pointer">
                  <a
                    href="#"
                    className="group inline-flex items-center gap-x-2 hover:text-yellow-400 transition-all"
                  >
                    <span className="text-yellow-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <ChevronsRight className="w-4 h-4" />
                    </span>
                    <span className="transition-all duration-300 group-hover:translate-x-1">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Contact Us", "Shipping Info", "Returns", "FAQ", "Track Order"].map((item, i) => (
                <li key={i} className="cursor-pointer">
                  <a
                    href="#"
                    className="group inline-flex items-center gap-x-2 hover:text-yellow-400 transition-all"
                  >
                    <span className="text-yellow-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <ChevronsRight className="w-4 h-4" />
                    </span>
                    <span className="transition-all duration-300 group-hover:translate-x-1">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe for exclusive offers and product news.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className="w-full bg-yellow-400 text-black hover:bg-yellow-300 transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              {subscribed && (
                <p className="text-green-400 text-sm mt-1">Subscribed successfully!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© 2024 SoleMate. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
