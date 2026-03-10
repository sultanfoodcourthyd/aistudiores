import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { FoodModel } from './FoodModel';
import { SpiceParticles } from './Particles';

export const HeroScene = ({ onBurgerClick }: { onBurgerClick?: () => void }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={Math.PI / 3}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <Suspense fallback={null}>
          <group position={[0, -0.5, 0]}>
            <FoodModel type="burger" isHero onClick={onBurgerClick} />
            
            {/* Table Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
              <circleGeometry args={[4, 64]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
            </mesh>
            
            <ContactShadows 
              opacity={0.4} 
              scale={10} 
              blur={2.5} 
              far={4} 
              resolution={256} 
              color="#000000" 
            />
          </group>
          
          <SpiceParticles />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};
