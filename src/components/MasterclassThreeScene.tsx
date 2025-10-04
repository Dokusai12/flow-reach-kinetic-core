import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// ============================================================
// MASTERCLASS 3D SCENE - ACTIVETHEORY INSPIRED
// Custom Shaders, Post-Processing, Advanced Particles
// ============================================================

// Custom Shader Material for Glow Effects
const GlowShader = {
  vertexShader: `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float time;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;
      
      vec3 pos = position;
      pos.y += sin(time + position.x * 0.1) * 0.1;
      pos.z += cos(time + position.z * 0.1) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    void main() {
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      float wave = sin(time * 2.0 + vPosition.x * 0.1) * 0.5 + 0.5;
      float pulse = sin(time * 3.0) * 0.3 + 0.7;
      
      vec3 glow = color * fresnel * wave * pulse * intensity;
      float alpha = fresnel * 0.8 + 0.2;
      
      gl_FragColor = vec4(glow, alpha);
    }
  `,
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color('#06b6d4') },
    intensity: { value: 1.0 }
  },
  transparent: true,
  side: THREE.DoubleSide
};

// Advanced Particle System (1000+ particles)
function MasterclassParticles({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1000; // 5x more particles than before
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create particle data with advanced properties
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 50, // Larger space
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      size: 0.02 + Math.random() * 0.08,
      color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
      phase: Math.random() * Math.PI * 2
    }));
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      // Advanced particle movement with mouse interaction
      const mouseInfluence = 0.3;
      const mx = (mousePos.x / window.innerWidth - 0.5) * mouseInfluence;
      const my = (mousePos.y / window.innerHeight - 0.5) * mouseInfluence;
      
      // Update position with velocity and mouse influence
      particle.position.add(particle.velocity);
      particle.position.x += mx;
      particle.position.y += my;
      
      // Add wave motion
      particle.position.y += Math.sin(time * 0.5 + particle.phase) * 0.01;
      particle.position.z += Math.cos(time * 0.3 + particle.phase) * 0.01;
      
      // Boundary checking with smooth wrapping
      if (particle.position.x > 25) particle.position.x = -25;
      if (particle.position.x < -25) particle.position.x = 25;
      if (particle.position.y > 25) particle.position.y = -25;
      if (particle.position.y < -25) particle.position.y = 25;
      if (particle.position.z > 25) particle.position.z = -25;
      if (particle.position.z < -25) particle.position.z = 25;
      
      // Scale based on scroll and time
      const scale = particle.size * (1 + scrollProgress * 0.8 + Math.sin(time * 2 + i) * 0.2);
      dummy.scale.set(scale, scale, scale);
      
      // Position and rotation
      dummy.position.copy(particle.position);
      dummy.rotation.x = time * 0.5 + i;
      dummy.rotation.y = time * 0.3 + i;
      dummy.rotation.z = time * 0.2 + i;
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <shaderMaterial
        vertexShader={GlowShader.vertexShader}
        fragmentShader={GlowShader.fragmentShader}
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color('#06b6d4') },
          intensity: { value: 0.8 }
        }}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

// AI Workflow Visualization with Advanced Materials
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
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5;
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
    <group ref={groupRef} position={[0, -3, 0]}>
      {steps.map((step, i) => {
        const angle = (i / steps.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isActive = i <= activeStep;
        
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Step Node with Custom Shader */}
            <mesh>
              <icosahedronGeometry args={[1, 1]} />
              <shaderMaterial
                vertexShader={GlowShader.vertexShader}
                fragmentShader={GlowShader.fragmentShader}
                uniforms={{
                  time: { value: 0 },
                  color: { value: new THREE.Color(isActive ? "#06b6d4" : "#374151") },
                  intensity: { value: isActive ? 1.2 : 0.3 }
                }}
                transparent
                opacity={isActive ? 0.9 : 0.4}
              />
            </mesh>
            
            {/* Step Label */}
            <Text
              position={[0, -2, 0]}
              fontSize={0.4}
              color={isActive ? "#06b6d4" : "#ffffff"}
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
                <boxGeometry args={[radius * 0.8, 0.1, 0.1]} />
                <meshStandardMaterial
                  color={isActive ? "#06b6d4" : "#4b5563"}
                  emissive={isActive ? "#06b6d4" : "#000000"}
                  emissiveIntensity={isActive ? 0.5 : 0}
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
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
      groupRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      {/* Central ROI Sphere with Custom Shader */}
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <shaderMaterial
          vertexShader={GlowShader.vertexShader}
          fragmentShader={GlowShader.fragmentShader}
          uniforms={{
            time: { value: 0 },
            color: { value: new THREE.Color('#06b6d4') },
            intensity: { value: 0.8 + scrollProgress * 0.4 }
          }}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* ROI Text */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="#06b6d4"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {roiValue}% ROI
      </Text>
      
      {/* Orbiting Data Points */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.8,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Cinematic Camera Controller
function CinematicCamera({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth camera movement based on scroll and mouse
    const targetX = (mousePos.x / window.innerWidth - 0.5) * 3;
    const targetY = (mousePos.y / window.innerHeight - 0.5) * 2;
    
    // Cinematic camera path
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5 - scrollProgress * 8 + targetY, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15 - scrollProgress * 10, 0.02);
    
    // Look at target with smooth interpolation
    const lookTarget = new THREE.Vector3(0, 0, 0);
    lookTarget.x += targetX * 0.3;
    lookTarget.y += targetY * 0.3;
    
    camera.lookAt(lookTarget);
  });
  
  return null;
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
  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.2} />
      <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={0.8} color="#06b6d4" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1.0}
        color="#06b6d4"
        castShadow
      />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#ffffff"
        castShadow
      />
      
      {/* 3D Elements */}
      <MasterclassParticles scrollProgress={scrollProgress} mousePos={mousePos} />
      <WorkflowVisualization industry={industry} progress={scrollProgress} />
      <ROIVisualization scrollProgress={scrollProgress} />
      <CinematicCamera scrollProgress={scrollProgress} mousePos={mousePos} />
      
      {/* Subtle Auto-Rotate Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={false}
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

// Main Component Export
export default function MasterclassThreeScene({
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
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          precision: "highp"
        }}
        dpr={[1, 2]} // Adaptive pixel ratio
        performance={{ min: 0.5 }} // Maintain 60fps
      >
        <Scene scrollProgress={scrollProgress} industry={industry} mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
