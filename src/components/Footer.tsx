import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6">
              CraftStyle
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              Discover unique handcrafted items made by talented artisans from around the world. 
              Each piece tells a story and brings authenticity and beauty to your space.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2">
                <span>About Us</span>
              </a></li>
              <li><a href="#products" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2">
                <span>Products</span>
              </a></li>
              <li><a href="#collections" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2">
                <span>Collections</span>
              </a></li>
              <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2">
                <span>Custom Orders</span>
              </a></li>
              <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2">
                <span>Artisan Stories</span>
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">hello@craftstyle.com</p>
                  <p className="text-slate-400 text-sm">We reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">+1 (555) 123-4567</p>
                  <p className="text-slate-400 text-sm">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">123 Artisan Street</p>
                  <p className="text-slate-300">Craft City, CC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>© 2024 CraftStyle. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by artisans worldwide</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Shipping Info</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;