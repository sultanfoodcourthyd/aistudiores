import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Box, Cylinder, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SteamParticles } from './Particles';

interface FoodModelProps {
  type: 'burger' | 'pizza' | 'pasta' | 'steak' | 'cake';
  color?: string;
  isHero?: boolean;
  onClick?: () => void;
}

export const FoodModel: React.FC<FoodModelProps> = ({ type, color = '#D4AF37', isHero = false, onClick }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (isHero) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const renderModel = () => {
    switch (type) {
      case 'burger':
        return (
          <group onClick={onClick}>
            {/* Bottom Bun - Toasted & Shiny */}
            <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.8, 0.85, 0.25, 32]} />
              <meshStandardMaterial color="#8B4513" roughness={0.4} metalness={0.2} />
            </mesh>
            
            {/* Chopped Onions at the bottom */}
            {Array.from({ length: 12 }).map((_, i) => (
              <mesh 
                key={`onion-${i}`}
                position={[
                  (Math.random() - 0.5) * 0.6,
                  -0.28,
                  (Math.random() - 0.5) * 0.6
                ]}
                rotation={[0, Math.random() * Math.PI, 0]}
              >
                <boxGeometry args={[0.1, 0.02, 0.1]} />
                <meshStandardMaterial color="#F5F5F5" roughness={0.5} />
              </mesh>
            ))}

            {/* Bottom Patty */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.8, 0.8, 0.22, 32]} />
              <meshStandardMaterial color="#3D1F1F" roughness={0.9} metalness={0.1} />
            </mesh>
            
            {/* Bottom Cheese - Melted */}
            <mesh position={[0, -0.1, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
              <boxGeometry args={[1.1, 0.04, 1.1]} />
              <meshStandardMaterial color="#FFD700" roughness={0.2} />
            </mesh>

            {/* Top Patty */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.8, 0.8, 0.22, 32]} />
              <meshStandardMaterial color="#3D1F1F" roughness={0.9} metalness={0.1} />
            </mesh>
            
            {/* Top Cheese - Melted */}
            <mesh position={[0, 0.15, 0]} rotation={[0, -Math.PI / 8, 0]} castShadow>
              <boxGeometry args={[1.1, 0.04, 1.1]} />
              <meshStandardMaterial color="#FFD700" roughness={0.2} />
            </mesh>
            
            {/* Pickles */}
            {[
              [0.2, 0.18, 0.1],
              [-0.2, 0.18, -0.1],
              [0.1, 0.18, -0.3]
            ].map((pos, i) => (
              <mesh key={`pickle-${i}`} position={pos as [number, number, number]} rotation={[0.1, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
                <meshStandardMaterial color="#228B22" roughness={0.4} />
              </mesh>
            ))}
            
            {/* Top Bun */}
            <group position={[0, 0.25, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.82, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
              </mesh>
              
              {/* Sesame Seeds - Higher Density */}
              {Array.from({ length: 80 }).map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 80);
                const theta = Math.sqrt(80 * Math.PI) * phi;
                if (phi > Math.PI / 2.5) return null; 
                return (
                  <mesh 
                    key={i}
                    position={[
                      0.83 * Math.sin(phi) * Math.cos(theta),
                      0.83 * Math.cos(phi),
                      0.83 * Math.sin(phi) * Math.sin(theta)
                    ]}
                    rotation={[phi, theta, 0]}
                  >
                    <sphereGeometry args={[0.018, 8, 8]} />
                    <meshStandardMaterial color="#FFF8DC" />
                  </mesh>
                );
              })}
            </group>
          </group>
        );
      case 'pizza':
        return (
          <group rotation={[Math.PI / 2, 0, 0]}>
            {/* Crust */}
            <mesh receiveShadow castShadow>
              <cylinderGeometry args={[1, 1.05, 0.15, 32]} />
              <meshStandardMaterial color="#D2B48C" roughness={0.8} />
            </mesh>
            {/* Sauce & Cheese */}
            <mesh position={[0, 0.05, 0]} receiveShadow>
              <cylinderGeometry args={[0.9, 0.9, 0.08, 32]} />
              <meshStandardMaterial color="#FFD700" roughness={0.4} />
            </mesh>
            {/* Sauce edge */}
            <mesh position={[0, 0.03, 0]}>
              <cylinderGeometry args={[0.92, 0.92, 0.05, 32]} />
              <meshStandardMaterial color="#FF4500" />
            </mesh>
            {/* Pepperoni Toppings */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = 0.3 + Math.random() * 0.45;
              return (
                <mesh 
                  key={i} 
                  position={[
                    Math.cos(angle) * radius,
                    0.1,
                    Math.sin(angle) * radius
                  ]}
                >
                  <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
                  <meshStandardMaterial color="#8B0000" roughness={0.5} />
                </mesh>
              );
            })}
          </group>
        );
      case 'steak':
        return (
          <group>
            {/* Plate */}
            <mesh position={[0, -0.6, 0]} receiveShadow>
              <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
            </mesh>
            {/* Steak Meat */}
            <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.25, 0.8]} />
              <meshStandardMaterial color="#3D1F1F" roughness={0.9} />
            </mesh>
            {/* Grill Marks */}
            {Array.from({ length: 5 }).map((_, i) => (
              <mesh key={i} position={[(i - 2) * 0.2, -0.27, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.02, 0.01, 0.75]} />
                <meshStandardMaterial color="#1a0f0f" />
              </mesh>
            ))}
            {/* Side: Broccoli */}
            <group position={[0.5, -0.3, 0.3]}>
              <mesh castShadow>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshStandardMaterial color="#228B22" roughness={1} />
              </mesh>
            </group>
            {/* Side: Potato */}
            <group position={[-0.5, -0.4, 0.2]}>
              <mesh castShadow>
                <sphereGeometry args={[0.2, 8, 8]} scale={[1.2, 0.8, 1]} />
                <meshStandardMaterial color="#E3C58E" roughness={0.8} />
              </mesh>
            </group>
          </group>
        );
      case 'pasta':
        return (
          <group>
            {/* Pasta Nest */}
            {Array.from({ length: 6 }).map((_, i) => (
              <mesh key={i} rotation={[Math.PI / 2, i * 0.5, 0]} position={[0, i * 0.05, 0]}>
                <torusGeometry args={[0.5, 0.05, 8, 32]} />
                <meshStandardMaterial color="#FFFACD" roughness={0.3} />
              </mesh>
            ))}
            {/* Sauce */}
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#FF0000" roughness={0.2} />
            </mesh>
            {/* Meatballs */}
            {[
              [0.2, 0.35, 0.1],
              [-0.15, 0.38, -0.2],
              [0, 0.4, 0.2]
            ].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]} castShadow>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial color="#4B2C20" roughness={0.8} />
              </mesh>
            ))}
            {/* Parsley */}
            {Array.from({ length: 10 }).map((_, i) => (
              <mesh 
                key={i} 
                position={[
                  (Math.random() - 0.5) * 0.6,
                  0.45,
                  (Math.random() - 0.5) * 0.6
                ]}
              >
                <sphereGeometry args={[0.02, 4, 4]} />
                <meshStandardMaterial color="#228B22" />
              </mesh>
            ))}
          </group>
        );
      case 'cake':
        return (
          <group>
            {/* Bottom Layer */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
              <meshStandardMaterial color="#3D1F1F" roughness={0.8} />
            </mesh>
            {/* Middle Frosting */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.72, 0.72, 0.05, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Top Layer */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
              <meshStandardMaterial color="#3D1F1F" roughness={0.8} />
            </mesh>
            {/* Top Frosting */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.72, 0.72, 0.05, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Cherry */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#FF0000" roughness={0.2} metalness={0.3} />
            </mesh>
            {/* Cherry Stem */}
            <mesh position={[0.05, 0.62, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
          </group>
        );
      default:
        return (
          <Sphere args={[0.8, 64, 64]}>
            <MeshDistortMaterial color={color} speed={2} distort={0.4} />
          </Sphere>
        );
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {renderModel()}
      </Float>
      {isHero && <SteamParticles position={[0, 0.5, 0]} />}
    </group>
  );
};
