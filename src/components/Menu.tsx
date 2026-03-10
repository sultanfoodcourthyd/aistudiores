import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DISHES, Dish } from '../data/menu';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

interface MenuCardProps {
  dish: Dish;
  onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ dish, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
      whileHover={{ y: -10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl" />
      
      <div className="relative glass rounded-3xl p-6 h-full flex flex-col border border-white/5 group-hover:border-gold/30 transition-colors">
        <div className="relative h-48 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotateY: isHovered ? 180 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center shadow-2xl"
          >
            {/* Simple representation of the dish icon */}
            <div className="w-20 h-20 rounded-full" style={{ backgroundColor: dish.color, opacity: 0.5 }} />
          </motion.div>
          
          <div className="absolute top-0 right-0 glass px-3 py-1 rounded-full text-xs font-mono text-gold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {dish.rating}
          </div>
        </div>

        <div className="flex-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{dish.category}</span>
          <h3 className="text-2xl font-serif mt-1 group-hover:text-gold transition-colors">{dish.name}</h3>
          <p className="text-sm text-white/50 mt-2 line-clamp-2 font-light">{dish.description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xl font-serif text-gold">${dish.price}</span>
          <div className="p-3 rounded-full glass group-hover:bg-gold group-hover:text-black transition-all">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Menu = ({ onSelectDish }: { onSelectDish: (dish: Dish) => void }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Appetizer', 'Main', 'Pizza', 'Dessert'];

  const filteredDishes = activeCategory === 'All' 
    ? DISHES 
    : DISHES.filter(d => d.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gold font-mono text-sm uppercase tracking-[0.4em]"
          >
            Exquisite Selection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mt-4"
          >
            The Menu
          </motion.h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-mono uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-gold text-black font-bold' 
                  : 'glass hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {filteredDishes.map((dish) => (
          <MenuCard 
            key={dish.id} 
            dish={dish} 
            onClick={() => onSelectDish(dish)} 
          />
        ))}
      </motion.div>
    </section>
  );
};
