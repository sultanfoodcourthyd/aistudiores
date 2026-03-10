import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Box, Cylinder, Sphere } from '@react-three/drei';
import { MapPin, Navigation, Clock, ShieldCheck, X } from 'lucide-react';
import * as THREE from 'three';

const Scooter = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 10) * 0.05;
    group.current.rotation.z = Math.sin(t * 5) * 0.02;
  });

  return (
    <group ref={group}>
      {/* Body */}
      <Box args={[0.8, 0.4, 0.3]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#D4AF37" />
      </Box>
      {/* Wheels */}
      <Cylinder args={[0.15, 0.15, 0.1, 16]} position={[-0.3, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111" />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 0.1, 16]} position={[0.3, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111" />
      </Cylinder>
      {/* Handlebar */}
      <Box args={[0.05, 0.6, 0.05]} position={[0.35, 0.5, 0]}>
        <meshStandardMaterial color="#333" />
      </Box>
    </group>
  );
};

export const DeliveryTracker = ({ onClose }: { onClose: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 0.5 : 100));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6"
    >
      <div className="w-full max-w-4xl glass rounded-[40px] overflow-hidden flex flex-col md:flex-row">
        {/* Map View */}
        <div className="flex-1 h-[400px] md:h-[600px] relative bg-premium-gray">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={40} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            <Suspense fallback={null}>
              <group position={[0, 0, 0]}>
                {/* Road */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[20, 2]} />
                  <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                
                {/* Path Line */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                  <planeGeometry args={[20, 0.05]} />
                  <meshStandardMaterial color="#D4AF37" transparent opacity={0.3} />
                </mesh>

                {/* Moving Scooter */}
                <group position={[-8 + (progress / 100) * 16, 0, 0]}>
                  <Scooter />
                  <pointLight position={[0, 1, 0]} intensity={1} color="#D4AF37" />
                </group>

                {/* Destination */}
                <group position={[8, 0, 0]}>
                  <Sphere args={[0.1, 16, 16]} position={[0, 0.5, 0]}>
                    <meshStandardMaterial color="#D4AF37" />
                  </Sphere>
                  <Cylinder args={[0.02, 0.02, 1, 8]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#D4AF37" />
                  </Cylinder>
                </group>
              </group>
              <Environment preset="city" />
            </Suspense>
          </Canvas>

          <div className="absolute top-8 left-8 glass px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Live Tracking</span>
          </div>
        </div>

        {/* Status Info */}
        <div className="w-full md:w-[350px] p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif">Delivery Status</h3>
              <button onClick={onClose} className="p-2 glass rounded-full hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40">Estimated Time</div>
                  <div className="text-xl font-serif">12 - 18 Mins</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40">Current Location</div>
                  <div className="text-xl font-serif">Luxury Ave, 5th St</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40">Courier</div>
                  <div className="text-xl font-serif">James Wilson</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <button className="w-full mt-8 py-4 glass border border-gold/20 text-gold rounded-full font-bold hover:bg-gold hover:text-black transition-all">
              Contact Courier
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
