import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { FoodModel } from './3d/FoodModel';
import { Dish } from '../data/menu';
import { X, Star, ShoppingCart, Plus, Minus } from 'lucide-react';

interface DishViewerProps {
  dish: Dish;
  onClose: () => void;
  onAddToCart: (dish: Dish) => void;
}

export const DishViewer: React.FC<DishViewerProps> = ({ dish, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/10 transition-colors z-50"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-full lg:h-[80vh] gap-8 overflow-y-auto lg:overflow-hidden">
        {/* 3D Viewer */}
        <div className="relative h-[400px] lg:h-full glass rounded-3xl overflow-hidden">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
            <OrbitControls enableZoom={true} />
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <Suspense fallback={null}>
              <FoodModel type={dish.modelType} isHero />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-mono uppercase tracking-widest">
            Drag to rotate • Scroll to zoom
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center space-y-8 py-8 lg:py-0">
          <div>
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-gold font-mono text-sm uppercase tracking-[0.3em]"
            >
              {dish.category}
            </motion.span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif mt-2"
            >
              {dish.name}
            </motion.h2>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mt-4"
            >
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold">{dish.rating}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/60">120+ Reviews</span>
            </motion.div>
          </div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/70 leading-relaxed font-light"
          >
            {dish.description}
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-4">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass text-sm font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-white/10"
          >
            <div className="text-4xl font-serif text-gold">${dish.price}</div>
            
            <div className="flex items-center gap-4 glass rounded-full p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-8 text-center font-mono text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={() => onAddToCart(dish)}
              className="flex-1 w-full sm:w-auto flex items-center justify-center gap-3 bg-gold text-black px-8 py-5 rounded-full font-bold hover:bg-gold-light transition-all transform hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-6 h-6" />
              Add to Order
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
