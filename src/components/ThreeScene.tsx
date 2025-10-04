import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Torus, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// 3D Data Flow Particles
function DataParticles({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1000;
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      colors[i * 3] = 0.2 + Math.random() * 0.8; // R
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i * 3 + 2] = 1; // B
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.01) * 0.01 * scrollProgress;
        positions[i3] += Math.cos(time + i * 0.01) * 0.005 * scrollProgress;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// 3D Business Process Visualization
function BusinessProcess({ industry, progress }: { industry: string; progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  const processSteps = [
    { position: [0, 0, 0], color: '#ef4444', label: 'Manual' },
    { position: [2, 0, 0], color: '#f97316', label: 'Analysis' },
    { position: [4, 0, 0], color: '#eab308', label: 'Automation' },
    { position: [6, 0, 0], color: '#22c55e', label: 'Optimized' }
  ];

  return (
    <group ref={groupRef}>
      {processSteps.map((step, index) => (
        <group key={index} position={step.position as [number, number, number]}>
          <Box args={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color={step.color} />
          </Box>
          <Text
            position={[0, -1, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {step.label}
          </Text>
          {index < processSteps.length - 1 && (
            <Box args={[1.5, 0.1, 0.1]} position={[1, 0, 0]}>
              <meshStandardMaterial 
                color={progress > index ? '#06b6d4' : '#374151'} 
                transparent 
                opacity={progress > index ? 1 : 0.3}
              />
            </Box>
          )}
        </group>
      ))}
    </group>
  );
}

// 3D ROI Visualization
function ROIVisualization({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Money flowing up */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.3, 0.1]}
          position={[
            (Math.random() - 0.5) * 10,
            -5 + (scrollProgress * 10) + (i * 0.5),
            (Math.random() - 0.5) * 10
          ]}
        >
          <meshStandardMaterial color="#22c55e" transparent opacity={0.8} />
        </Box>
      ))}
      
      {/* Central ROI sphere */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.7}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ROI: {Math.round(scrollProgress * 1000)}%
      </Text>
    </group>
  );
}

// Main 3D Scene
function Scene({ scrollProgress, industry }: { scrollProgress: number; industry: string }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      <DataParticles scrollProgress={scrollProgress} />
      <BusinessProcess industry={industry} progress={scrollProgress} />
      <ROIVisualization scrollProgress={scrollProgress} />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Three.js Canvas Component
export default function ThreeScene({ 
  scrollProgress, 
  industry 
}: { 
  scrollProgress: number; 
  industry: string; 
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} industry={industry} />
      </Canvas>
    </div>
  );
}
