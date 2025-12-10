// src/components/HabitacionBox.jsx
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges, Line, Text } from "@react-three/drei";
import * as THREE from "three";

function Box({ ancho, alto, largo }) {
  const mesh = useRef();

  /*// Animación ligera opcional
  useFrame(() => {
    mesh.current.rotation.y += 0.002;
  });*/

  // Medidas de la puerta
  const doorWidth = ancho * 0.3;
  const doorHeight = alto * 0.55;
  const positionDoor = [
          0,                    
          -(alto / 2) + doorHeight / 2, 
          largo / 2 - 0.01 ];
  const pointsProdundidad = [
          [ancho / 2, -alto / 2 - 0.1, -largo / 2],
          [ancho / 2, -alto / 2 - 0.1,  largo / 2] ];
  const pointsAncho = [
          [-ancho / 2, -alto / 2 - 0.1, largo / 2],
          [ ancho / 2, -alto / 2 - 0.1, largo / 2] ];
  const pointsAlto = [
          [ancho / 2 + 0.1, -alto / 2, largo / 2],
          [ancho / 2 + 0.1,  alto / 2, largo / 2] ];
  const positionTextAlto        = [ancho / 2 + 0.2, 0,                largo / 2];
  const positionTextAncho       = [0,               -alto / 2 - 0.15, largo / 2];
  const positionTextProfundidad = [ancho / 2 + 0.15,   -alto / 2 - 0.15, 0];
  const fontSize = Math.max(ancho, alto, largo)*0.15;

  return (
    <group>
      {/* HABITACIÓN (caja invertida) */}
      <mesh ref={mesh}>
        <boxGeometry args={[ancho, alto, largo]} />
        <meshToonMaterial
          color="#dddddd"
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      <Edges color="white" />

        {/* PUERTA */}
      <mesh position={positionDoor} >
        <planeGeometry args={[doorWidth, doorHeight]} />
        <meshStandardMaterial color="gray" 
        side={THREE.DoubleSide} /> {/* marrón madera */}
      </mesh>
      <Edges color="white" threshold={15} />
      </mesh>

      {/* COTA VERTICAL (ALTO) */}
      <Line points={pointsAlto} color="green" />
      <Text position={positionTextAlto} fontSize={fontSize} color="white"   rotation={[0, 0, Math.PI / 2]}> {alto} m </Text>

      {/* COTA HORIZONTAL (ANCHO) */}
      <Line points={pointsAncho} color="blue" />
      <Text position={positionTextAncho} fontSize={fontSize} color="white" > {ancho} m </Text>

      {/* COTA PROFUNDIDAD (LARGO) */}
      <Line points={pointsProdundidad} color="red" />
      <Text position={positionTextProfundidad} fontSize={fontSize} color="white" rotation={[0, Math.PI / 2, 0]}> {largo} m </Text>
    </group>  
  );
}

export default function HabitacionBox({ ancho = 2, alto = 2, largo = 2 }) {
  return (
    <div className="w-full h-40 border border-gray-600 rounded-xl overflow-hidden bg-gray-600">
      <Canvas camera={{ position: [2, 1, 2] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Box ancho={ancho} alto={alto} largo={largo} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
