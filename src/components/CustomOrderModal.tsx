import React, { useState } from 'react';
import { X, Send, Upload, FileText, CheckCircle, Palette } from 'lucide-react';

interface CustomOrderModalProps {
  onClose: () => void;
}

const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    budget: '',
    timeline: '',
    inspiration: '',
    materials: '',
    dimensions: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending email to admin
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setLoading(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (submitted) {
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-slate-800 rounded-3xl max-w-md w-full p-8 text-center border border-slate-700 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Request Sent!</h2>
          <p className="text-slate-300 mb-6 text-lg leading-relaxed">
            Thank you for your custom order request! Our artisans will review your requirements and get back to you within 24 hours with a detailed proposal.
          </p>
          
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <p className="text-slate-400 text-sm mb-2">What happens next?</p>
            <ul className="text-slate-300 text-sm space-y-1 text-left">
              <li>• Artisan review (within 24 hours)</li>
              <li>• Custom quote & timeline</li>
              <li>• Design consultation</li>
              <li>• Creation begins upon approval</li>
            </ul>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Palette className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Custom Order Request</h2>
              <p className="text-slate-400 text-sm">Create something uniquely yours</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <FileText className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-amber-400 font-bold text-lg mb-2">Bring Your Vision to Life</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Our skilled artisans specialize in creating one-of-a-kind handcrafted pieces tailored to your exact specifications. 
                    Share your ideas, and we'll work together to create something truly special that reflects your personal style and needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                >
                  <option value="">Select a category</option>
                  <option value="pottery">Pottery & Ceramics</option>
                  <option value="jewelry">Jewelry & Accessories</option>
                  <option value="textiles">Textiles & Fabrics</option>
                  <option value="woodwork">Woodwork & Furniture</option>
                  <option value="metalwork">Metalwork & Sculptures</option>
                  <option value="leather">Leather Goods</option>
                  <option value="glass">Glasswork</option>
                  <option value="other">Other (please specify)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                placeholder="Describe your vision in detail. What do you want created? What's the purpose or occasion? Include any specific requirements, style preferences, or special features you'd like..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Materials</label>
                <input
                  type="text"
                  value={formData.materials}
                  onChange={(e) => setFormData({...formData, materials: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="e.g., oak wood, sterling silver, organic cotton"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Dimensions</label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder='e.g., 12" x 8" x 4", or approximate size'
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                >
                  <option value="">Select your budget range</option>
                  <option value="under-100">Under $100</option>
                  <option value="100-250">$100 - $250</option>
                  <option value="250-500">$250 - $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-plus">$2,500+</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                >
                  <option value="">When do you need this?</option>
                  <option value="1-2-weeks">1-2 weeks (Rush order)</option>
                  <option value="3-4-weeks">3-4 weeks</option>
                  <option value="1-2-months">1-2 months</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="flexible">I'm flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Inspiration & References</label>
              <textarea
                value={formData.inspiration}
                onChange={(e) => setFormData({...formData, inspiration: e.target.value})}
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                placeholder="Share any inspiration, reference images, or examples that capture the style or feeling you're looking for. You can describe colors, textures, or similar pieces you admire..."
              />
            </div>
          </form>
        </div>

        <div className="border-t border-slate-700 p-6 bg-slate-800/50">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Request...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Custom Order Request</span>
              </>
            )}
          </button>
          
          <p className="text-slate-400 text-sm text-center mt-4 leading-relaxed">
            Our artisans will review your request and respond within 24 hours with a detailed quote, timeline, and any questions about your project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderModal;