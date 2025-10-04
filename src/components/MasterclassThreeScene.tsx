import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Text, MeshDistortMaterial, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
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

// Ultra-Advanced Particle System (2000+ particles with multiple layers)
function MasterclassParticles({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000; // Even more particles for density
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create particle data with advanced properties and multiple layers
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const layer = Math.floor(i / (count / 3)); // 3 layers
      const layerOffset = layer * 20; // Space layers apart
      
      return {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 80 + layerOffset, // Much larger space
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
        size: 0.03 + Math.random() * 0.12,
        color: new THREE.Color().setHSL(
          (Math.random() * 0.3 + 0.5), // Blue-cyan range
          0.9, 
          0.7 + Math.random() * 0.3
        ),
        phase: Math.random() * Math.PI * 2,
        layer: layer,
        speed: 0.5 + Math.random() * 1.5
      };
    });
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      // Enhanced mouse interaction with scroll influence
      const mouseInfluence = 0.4 + scrollProgress * 0.3;
      const mx = (mousePos.x / window.innerWidth - 0.5) * mouseInfluence;
      const my = (mousePos.y / window.innerHeight - 0.5) * mouseInfluence;
      
      // Layer-based movement patterns
      const layerSpeed = particle.speed * (1 + particle.layer * 0.3);
      
      // Update position with enhanced velocity and mouse influence
      particle.position.add(particle.velocity.clone().multiplyScalar(layerSpeed));
      particle.position.x += mx * (1 + particle.layer * 0.2);
      particle.position.y += my * (1 + particle.layer * 0.2);
      
      // Complex wave motion based on layer
      const waveIntensity = 0.02 + particle.layer * 0.01;
      particle.position.y += Math.sin(time * 0.8 + particle.phase) * waveIntensity;
      particle.position.z += Math.cos(time * 0.6 + particle.phase) * waveIntensity;
      particle.position.x += Math.sin(time * 0.4 + particle.phase * 0.7) * waveIntensity * 0.5;
      
      // Scroll-based particle behavior
      const scrollInfluence = scrollProgress * 2;
      particle.position.y += Math.sin(time * 0.3 + i * 0.1) * scrollInfluence * 0.1;
      
      // Enhanced boundary checking with layer-based wrapping
      const boundary = 40 + particle.layer * 10;
      if (particle.position.x > boundary) particle.position.x = -boundary;
      if (particle.position.x < -boundary) particle.position.x = boundary;
      if (particle.position.y > boundary) particle.position.y = -boundary;
      if (particle.position.y < -boundary) particle.position.y = boundary;
      if (particle.position.z > boundary) particle.position.z = -boundary;
      if (particle.position.z < -boundary) particle.position.z = boundary;
      
      // Dynamic scaling based on scroll, time, and layer
      const baseScale = particle.size * (1 + scrollProgress * 1.2);
      const timeScale = 1 + Math.sin(time * 3 + i * 0.1) * 0.3;
      const layerScale = 1 + particle.layer * 0.2;
      const scale = baseScale * timeScale * layerScale;
      
      dummy.scale.set(scale, scale, scale);
      
      // Enhanced rotation with layer-based patterns
      dummy.position.copy(particle.position);
      dummy.rotation.x = time * (0.8 + particle.layer * 0.2) + i * 0.1;
      dummy.rotation.y = time * (0.6 + particle.layer * 0.1) + i * 0.15;
      dummy.rotation.z = time * (0.4 + particle.layer * 0.05) + i * 0.2;
      
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

// AI Workflow Visualization with Advanced Materials and Dynamic Connections
function WorkflowVisualization({ 
  industry, 
  progress 
}: { 
  industry: string; 
  progress: number 
}) {
  const groupRef = useRef<THREE.Group>(null);
  const connectionRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.3;
    }
    
    // Animate connection lines
    connectionRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const time = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(time * 2 + i) * 0.1;
        mesh.scale.setScalar(scale);
      }
    });
  });
  
  const workflows = {
    sales: ["Lead Gen", "Qualify", "Nurture", "Close", "Expand", "Retain", "Upsell", "Referral"],
    marketing: ["Create", "Campaign", "Analyze", "Optimize", "Scale", "Convert", "Retarget", "Grow"],
    operations: ["Plan", "Execute", "Monitor", "Optimize", "Deliver", "Track", "Improve", "Scale"],
    "customer-service": ["Receive", "Route", "Resolve", "Follow-up", "Improve", "Learn", "Predict", "Prevent"],
    data: ["Collect", "Clean", "Analyze", "Visualize", "Automate", "Predict", "Optimize", "Scale"]
  };
  
  const steps = workflows[industry as keyof typeof workflows] || workflows.sales;
  const activeStep = Math.floor(progress * steps.length);
  const radius = 8; // Increased radius for better spacing
  
  return (
    <group ref={groupRef} position={[0, -4, 0]}>
      {steps.map((step, i) => {
        const angle = (i / steps.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isActive = i <= activeStep;
        const isNext = i === activeStep + 1;
        
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Step Node with Enhanced Custom Shader */}
            <mesh>
              <icosahedronGeometry args={[1.2, 2]} />
              <shaderMaterial
                vertexShader={GlowShader.vertexShader}
                fragmentShader={GlowShader.fragmentShader}
                uniforms={{
                  time: { value: 0 },
                  color: { value: new THREE.Color(isActive ? "#06b6d4" : isNext ? "#8b5cf6" : "#374151") },
                  intensity: { value: isActive ? 1.5 : isNext ? 0.8 : 0.2 }
                }}
                transparent
                opacity={isActive ? 0.95 : isNext ? 0.6 : 0.3}
              />
            </mesh>
            
            {/* Glow Ring around active nodes */}
            {isActive && (
              <mesh>
                <torusGeometry args={[1.8, 0.1, 8, 32]} />
                <meshStandardMaterial
                  color="#06b6d4"
                  emissive="#06b6d4"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            )}
            
            {/* Step Label with better positioning */}
            <Text
              position={[0, -2.5, 0]}
              fontSize={0.35}
              color={isActive ? "#06b6d4" : isNext ? "#8b5cf6" : "#ffffff"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#000000"
            >
              {step}
            </Text>
            
            {/* Enhanced Connection Lines - Much longer and more dynamic */}
            {i < steps.length - 1 && (
              <mesh 
                ref={(el) => {
                  if (el) connectionRefs.current[i] = el;
                }}
                rotation={[0, angle + Math.PI / steps.length, 0]} 
                position={[radius * 0.5, 0, 0]}
              >
                <boxGeometry args={[radius * 1.2, 0.08, 0.08]} />
                <meshStandardMaterial
                  color={isActive ? "#06b6d4" : isNext ? "#8b5cf6" : "#4b5563"}
                  emissive={isActive ? "#06b6d4" : isNext ? "#8b5cf6" : "#000000"}
                  emissiveIntensity={isActive ? 0.8 : isNext ? 0.4 : 0}
                  transparent
                  opacity={isActive ? 0.9 : isNext ? 0.6 : 0.3}
                />
              </mesh>
            )}
            
            {/* Data flow particles between nodes */}
            {isActive && i < steps.length - 1 && (
              <mesh position={[radius * 0.25, 0, 0]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshStandardMaterial
                  color="#22c55e"
                  emissive="#22c55e"
                  emissiveIntensity={1.0}
                />
              </mesh>
            )}
          </group>
        );
      })}
      
      {/* Central Hub with pulsing effect */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.8, 1]} />
        <shaderMaterial
          vertexShader={GlowShader.vertexShader}
          fragmentShader={GlowShader.fragmentShader}
          uniforms={{
            time: { value: 0 },
            color: { value: new THREE.Color('#ffffff') },
            intensity: { value: 1.0 }
          }}
          transparent
          opacity={0.8}
        />
      </mesh>
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

// Cinematic Camera Controller with Extended Scroll Journey
function CinematicCamera({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Enhanced mouse influence
    const targetX = (mousePos.x / window.innerWidth - 0.5) * 4;
    const targetY = (mousePos.y / window.innerHeight - 0.5) * 3;
    
    // Extended cinematic camera path - much longer journey
    const scrollPhase = scrollProgress * 3; // Extend scroll range
    
    // Multi-stage camera movement
    let cameraX, cameraY, cameraZ;
    
    if (scrollPhase < 1) {
      // Stage 1: Overview - High and wide
      cameraX = THREE.MathUtils.lerp(0, targetX * 0.5, scrollPhase);
      cameraY = THREE.MathUtils.lerp(8, 6 + targetY, scrollPhase);
      cameraZ = THREE.MathUtils.lerp(20, 18, scrollPhase);
    } else if (scrollPhase < 2) {
      // Stage 2: Approach - Moving closer to workflow
      const localProgress = (scrollPhase - 1);
      cameraX = THREE.MathUtils.lerp(targetX * 0.5, targetX * 1.5, localProgress);
      cameraY = THREE.MathUtils.lerp(6 + targetY, 2 + targetY, localProgress);
      cameraZ = THREE.MathUtils.lerp(18, 12, localProgress);
    } else {
      // Stage 3: Immersive - Inside the workflow
      const localProgress = (scrollPhase - 2);
      cameraX = THREE.MathUtils.lerp(targetX * 1.5, targetX * 2, localProgress);
      cameraY = THREE.MathUtils.lerp(2 + targetY, -1 + targetY, localProgress);
      cameraZ = THREE.MathUtils.lerp(12, 8, localProgress);
    }
    
    // Smooth camera transitions
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraX, 0.015);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraY, 0.015);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, 0.015);
    
    // Dynamic look-at target based on scroll progress
    const lookTarget = new THREE.Vector3(0, 0, 0);
    lookTarget.x += targetX * 0.2;
    lookTarget.y += targetY * 0.2;
    
    // Add subtle camera shake for cinematic effect
    const shakeIntensity = 0.02;
    lookTarget.x += Math.sin(time * 10) * shakeIntensity;
    lookTarget.y += Math.cos(time * 8) * shakeIntensity;
    
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

// Main Component Export with Post-Processing
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
        camera={{ position: [0, 8, 20], fov: 50 }}
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
        
        {/* Post-Processing Effects for Cinematic Look */}
        <EffectComposer>
          <Bloom
            intensity={0.8 + scrollProgress * 0.4}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.025}
            mipmapBlur={true}
          />
          <ChromaticAberration
            offset={[0.002, 0.002]}
            radialModulation={true}
            modulationOffset={0.15}
          />
          <Vignette
            eskil={false}
            offset={0.1}
            darkness={0.3 + scrollProgress * 0.2}
          />
          <Noise
            opacity={0.02}
            premultiply={true}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
