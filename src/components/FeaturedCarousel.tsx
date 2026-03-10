import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { DISHES, Dish } from '../data/menu';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

const CarouselItem = ({ dish, index, activeIndex }: { dish: Dish, index: number, activeIndex: number }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const isActive = index === activeIndex;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const position: [number, number, number] = [
    Math.sin((index - activeIndex) * (Math.PI / 2)) * 3,
    0,
    Math.cos((index - activeIndex) * (Math.PI / 2)) * 3 - 3
  ];

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position} scale={isActive ? 1.2 : 0.8}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial 
            color={dish.color} 
            speed={isActive ? 3 : 1} 
            distort={isActive ? 0.4 : 0.2} 
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        {isActive && (
          <pointLight intensity={2} color={dish.color} />
        )}
      </group>
    </Float>
  );
};

export const FeaturedCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredDishes = DISHES.slice(0, 4);

  const next = () => setActiveIndex((prev) => (prev + 1) % featuredDishes.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <span className="text-gold font-mono text-sm uppercase tracking-[0.4em]">Chef's Specials</span>
          <h2 className="text-5xl md:text-7xl font-serif mt-4">Featured <br /> Creations</h2>
        </div>
        <div className="flex gap-4">
          <button onClick={prev} className="p-4 rounded-full glass hover:bg-gold hover:text-black transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="p-4 rounded-full glass hover:bg-gold hover:text-black transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="h-[500px] relative">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={2} />
          <Suspense fallback={null}>
            {featuredDishes.map((dish, i) => (
              <CarouselItem key={dish.id} dish={dish} index={i} activeIndex={activeIndex} />
            ))}
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              <h3 className="text-4xl font-serif text-gold">{featuredDishes[activeIndex].name}</h3>
              <p className="text-white/40 font-mono uppercase tracking-widest text-xs">
                Starting from ${featuredDishes[activeIndex].price}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
