import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeaturedCollections: React.FC = () => {
  const collections = [
    {
      id: 1,
      title: "Ceramic\nMasterpieces",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starting from $35",
      buttonText: "Shop Now",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      id: 2,
      title: "Handmade\nJewelry",
      image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Best Sellers",
      buttonText: "Explore",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      id: 3,
      title: "Artisan\nTextiles",
      image: "https://images.pexels.com/photos/6333409/pexels-photo-6333409.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Limited Edition",
      buttonText: "Discover",
      gradient: "from-green-500/20 to-teal-500/20"
    }
  ];

  return (
    <section id="collections" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Collections</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover our carefully curated collections of handcrafted items, each telling its own unique story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
              className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-500 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl bg-slate-800 shadow-2xl">
                <img 
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:${collection.gradient} transition-all duration-500`}></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <p className="text-amber-400 text-sm font-medium uppercase tracking-wider">{collection.category}</p>
                  </div>
                  <h3 className="text-white text-2xl lg:text-3xl font-bold mb-6 whitespace-pre-line leading-tight">
                    {collection.title}
                  </h3>
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 group-hover:shadow-xl">
                    <span>{collection.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;