import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// ============================================================
// MASTERCLASS 3D SCENE FOR FLOW REACH - ACTIVETHEORY INSPIRED
// ============================================================

// Advanced Instanced Particle System (200+ particles for performance)
function DataFlowParticles({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create random particle positions
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      speed: 0.5 + Math.random() * 0.5,
      size: 0.05 + Math.random() * 0.1
    }));
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      const t = time * particle.speed;
      
      // Create flowing motion
      const x = particle.position.x + Math.sin(t + i) * 0.05;
      const y = particle.position.y + Math.cos(t * 0.8 + i) * 0.05;
      const z = particle.position.z + Math.sin(t * 0.6 + i) * 0.05;
      
      // Mouse interaction
      const mouseInfluence = 0.1;
      const mx = mousePos.x * mouseInfluence;
      const my = mousePos.y * mouseInfluence;
      
      dummy.position.set(x + mx, y + my, z);
      
      // Scale based on scroll
      const scale = particle.size * (1 + scrollProgress * 0.3);
      dummy.scale.set(scale, scale, scale);
      
      dummy.rotation.x = t * 0.5;
      dummy.rotation.y = t * 0.3;
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// AI Automation Workflow Visualization
function WorkflowVisualization({ 
  industry, 
  progress 
}: { 
  industry: string; 
  progress: number 
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
    }
  });
  
  const workflows = {
    sales: ["Lead Gen", "Qualify", "Nurture", "Close", "Expand"],
    marketing: ["Create", "Campaign", "Analyze", "Optimize", "Scale"],
    operations: ["Plan", "Execute", "Monitor", "Optimize", "Deliver"],
    "customer-service": ["Receive", "Route", "Resolve", "Follow-up", "Improve"],
    data: ["Collect", "Clean", "Analyze", "Visualize", "Automate"]
  };
  
  const steps = workflows[industry as keyof typeof workflows] || workflows.sales;
  const activeStep = Math.floor(progress * steps.length);
  
  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {steps.map((step, i) => {
        const angle = (i / steps.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isActive = i <= activeStep;
        
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Step Node */}
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <MeshDistortMaterial
                color={isActive ? "#06b6d4" : "#374151"}
                emissive={isActive ? "#06b6d4" : "#1f2937"}
                emissiveIntensity={isActive ? 0.5 : 0.1}
                distort={isActive ? 0.3 : 0}
                speed={2}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            
            {/* Step Label */}
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {step}
            </Text>
            
            {/* Connection Line */}
            {i < steps.length - 1 && (
              <mesh rotation={[0, angle + Math.PI / steps.length, 0]} position={[radius * 0.4, 0, 0]}>
                <boxGeometry args={[radius * 0.8, 0.05, 0.05]} />
                <meshStandardMaterial
                  color={isActive ? "#06b6d4" : "#4b5563"}
                  emissive={isActive ? "#06b6d4" : "#000000"}
                  emissiveIntensity={isActive ? 0.3 : 0}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// ROI Visualization with Dynamic Growth
function ROIVisualization({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const roiValue = Math.round(scrollProgress * 1000);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      groupRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Central ROI Sphere */}
      <mesh>
        <icosahedronGeometry args={[1.2, 2]} />
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3 + scrollProgress * 0.4}
          distort={0.4}
          speed={3}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* ROI Text */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.6}
        color="#06b6d4"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {roiValue}% ROI
      </Text>
      
      {/* Orbiting Data Points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Main Scene Controller
function Scene({ 
  scrollProgress, 
  industry,
  mousePos 
}: { 
  scrollProgress: number; 
  industry: string;
  mousePos: { x: number; y: number };
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);
    
    // GSAP camera animation based on scroll
    gsap.to(camera.position, {
      y: 3 - scrollProgress * 5,
      z: 10 - scrollProgress * 6,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [camera, scrollProgress]);
  
  return (
    <>
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#06b6d4" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#06b6d4"
        castShadow
      />
      
      {/* 3D Elements */}
      <DataFlowParticles scrollProgress={scrollProgress} mousePos={mousePos} />
      <WorkflowVisualization industry={industry} progress={scrollProgress} />
      <ROIVisualization scrollProgress={scrollProgress} />
      
      {/* Subtle Auto-Rotate Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={false}
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

// Main Component Export
export default function AdvancedThreeScene({
  scrollProgress,
  industry,
  mousePos
}: {
  scrollProgress: number;
  industry: string;
  mousePos: { x: number; y: number };
}) {
  return (
    <div className="w-full h-full absolute inset-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 3, 10], fov: 75 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Pixel ratio for performance
      >
        <Scene scrollProgress={scrollProgress} industry={industry} mousePos={mousePos} />
      </Canvas>
    </div>
  );
}

