import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

function TestScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <OrbitControls />
    </>
  );
}

export default function ThreeTest() {
  return (
    <div className="w-full h-screen">
      <h1 className="text-white text-4xl text-center p-8">Three.js Test</h1>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <TestScene />
      </Canvas>
    </div>
  );
}
