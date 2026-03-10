import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Box, Cylinder } from '@react-three/drei';
import { CheckCircle2, Package, Wind, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const AnimatedBox = () => {
  const boxRef = useRef<THREE.Group>(null!);
  const lidRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lidRef.current) {
      lidRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group ref={boxRef}>
      {/* Bottom of box */}
      <Box args={[2, 0.8, 2]} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.2} />
      </Box>
      {/* Lid */}
      <group ref={lidRef} position={[0, 0, -1]}>
        <Box args={[2, 0.1, 2]} position={[0, 0.05, 1]}>
          <meshStandardMaterial color="#F9E29C" metalness={0.8} roughness={0.1} />
        </Box>
      </group>
      
      {/* Interior Glow */}
      <pointLight position={[0, 0.5, 0]} intensity={2} color="#D4AF37" />
    </group>
  );
};

export const OrderConfirmation = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl"
    >
      <div className="text-center max-w-2xl px-6">
        <div className="h-[300px] w-full mb-8">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={40} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={2} />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <AnimatedBox />
              </Float>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/20 text-gold mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif mb-6">Order Confirmed</h2>
          <p className="text-xl text-white/60 font-light mb-12">
            Your culinary journey has begun. Our chefs are crafting your masterpiece with the finest ingredients.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: Package, label: 'Preparing' },
              { icon: Sparkles, label: 'Quality Check' },
              { icon: CheckCircle2, label: 'Ready' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full glass flex items-center justify-center ${i === 0 ? 'text-gold border-gold' : 'text-white/20'}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{step.label}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="px-12 py-5 bg-gold text-black font-bold rounded-full hover:bg-gold-light transition-all transform hover:scale-105 active:scale-95"
          >
            Track Delivery
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
