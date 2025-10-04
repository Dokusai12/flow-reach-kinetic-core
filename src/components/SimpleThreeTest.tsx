import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

function SimpleScene() {
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

export default function SimpleThreeTest() {
  return (
    <div className="w-full h-screen bg-black">
      <h1 className="text-white text-4xl text-center p-8">Simple Three.js Test</h1>
      <div className="w-full h-96">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <SimpleScene />
        </Canvas>
      </div>
    </div>
  );
}
