import React, { useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { X, Plus, ShoppingCart, Check } from 'lucide-react';
import * as THREE from 'three';

const ToppingItem = ({ color, position, delay }: { color: string, position: [number, number, number], delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [currentY, setCurrentY] = useState(2);
  const [opacity, setOpacity] = useState(0);

  useFrame((state) => {
    if (currentY > position[1]) {
      const delta = (currentY - position[1]) * 0.1;
      setCurrentY(prev => Math.max(position[1], prev - delta));
      setOpacity(prev => Math.min(1, prev + 0.1));
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], currentY, position[2]]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

interface Topping {
  id: string;
  name: string;
  price: number;
  color: string;
}

const TOPPINGS: Topping[] = [
  { id: 'pepperoni', name: 'Pepperoni', price: 2, color: '#8B0000' },
  { id: 'mushrooms', name: 'Mushrooms', price: 1.5, color: '#D2B48C' },
  { id: 'peppers', name: 'Bell Peppers', price: 1, color: '#228B22' },
  { id: 'olives', name: 'Black Olives', price: 1, color: '#1A1A1A' },
  { id: 'onions', name: 'Red Onions', price: 1, color: '#800080' },
];

export const PizzaCustomizer = ({ onClose }: { onClose: () => void }) => {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const basePrice = 20;
  const totalPrice = basePrice + selectedToppings.reduce((acc, id) => {
    const topping = TOPPINGS.find(t => t.id === id);
    return acc + (topping?.price || 0);
  }, 0);

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/10 transition-colors z-50"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-7xl h-full lg:h-[85vh] gap-8 overflow-y-auto lg:overflow-hidden">
        {/* 3D Canvas */}
        <div className="lg:col-span-2 relative glass rounded-3xl overflow-hidden h-[400px] lg:h-full">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 3, 5]} fov={40} />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            
            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <group rotation={[-Math.PI / 6, 0, 0]}>
                  {/* Pizza Base */}
                  <mesh receiveShadow castShadow>
                    <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
                    <meshStandardMaterial color="#F4A460" />
                  </mesh>
                  <mesh position={[0, 0.06, 0]}>
                    <cylinderGeometry args={[1.4, 1.4, 0.05, 64]} />
                    <meshStandardMaterial color="#FF4500" />
                  </mesh>
                  <mesh position={[0, 0.1, 0]}>
                    <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
                    <meshStandardMaterial color="#FFFACD" />
                  </mesh>

                  {/* Dynamic Toppings */}
                  <AnimatePresence>
                    {selectedToppings.map((toppingId, index) => {
                      const topping = TOPPINGS.find(t => t.id === toppingId);
                      return (
                        <group key={toppingId}>
                          {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i / 12) * Math.PI * 2;
                            const radius = 0.4 + Math.random() * 0.7;
                            return (
                              <ToppingItem
                                key={`${toppingId}-${i}`}
                                color={topping?.color || '#fff'}
                                delay={i * 0.05}
                                position={[
                                  Math.cos(angle) * radius,
                                  0.15,
                                  Math.sin(angle) * radius
                                ]}
                              />
                            );
                          })}
                        </group>
                      );
                    })}
                  </AnimatePresence>
                </group>
              </Float>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
          <div className="absolute top-8 left-8">
            <h2 className="text-4xl font-serif">Craft Your <br /><span className="text-gold italic">Masterpiece</span></h2>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col glass rounded-3xl p-8 overflow-y-auto">
          <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-8">Select Toppings</h3>
          
          <div className="space-y-4 flex-1">
            {TOPPINGS.map((topping) => (
              <button
                key={topping.id}
                onClick={() => toggleTopping(topping.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  selectedToppings.includes(topping.id)
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'glass border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: topping.color }} 
                  />
                  <span className="font-medium">{topping.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono opacity-60">+${topping.price}</span>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    selectedToppings.includes(topping.id) ? 'bg-gold border-gold text-black' : 'border-white/20'
                  }`}>
                    {selectedToppings.includes(topping.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/40 font-mono uppercase tracking-widest text-xs">Total Price</span>
              <span className="text-3xl font-serif text-gold">${totalPrice}</span>
            </div>
            <button className="w-full bg-gold text-black py-5 rounded-full font-bold hover:bg-gold-light transition-all flex items-center justify-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              Add Custom Pizza
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
