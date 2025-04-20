import { Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Activities", href: "#activities" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" }
  ];
  
  const resourceLinks = [
    { name: "Events", href: "#" },
    { name: "Workshops", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Research", href: "#" },
    { name: "Blog", href: "#" }
  ];
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" }
  ];
  
  return (
    <footer className="bg-somaiya-black text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-poppins">DataZen</h3>
            <p className="text-gray-400 mb-4">
              The official Data Science council of Somaiya Vidyavihar University.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 font-poppins">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 font-poppins">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on events and initiatives.
            </p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none bg-gray-800 border-gray-700 focus:outline-none focus:ring-1 focus:ring-power-red text-white"
              />
              <Button type="submit" className="rounded-l-none bg-power-red hover:bg-red-700">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} DataZen - Somaiya Vidyavihar University. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
