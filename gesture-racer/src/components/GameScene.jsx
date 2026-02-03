import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGameStore } from '../store';
import { Box, Center, Stars, Trail } from '@react-three/drei';
import Track from './Track';
import GameLogic from './GameLogic';
import { Lasers, Enemies } from './CombatElements';

const Ship = () => {
    const ref = useRef();
    const handPosition = useGameStore((state) => state.handPosition);
    const selectedShip = useGameStore((state) => state.selectedShip);

    useFrame((state, delta) => {
        if (ref.current) {
            // Map hand x (-1 to 1) to world x (-12 to 12) - increased range
            const targetX = handPosition.x * 12;
            const targetY = handPosition.y * 7;

            // Ultra-responsive movement (LERP factor 12)
            ref.current.position.x += (targetX - ref.current.position.x) * 12 * delta;
            ref.current.position.y += (targetY - ref.current.position.y) * 12 * delta;

            // Aggressive Banking
            const xDiff = targetX - ref.current.position.x;
            ref.current.rotation.z = -xDiff * 0.8;

            const yDiff = targetY - ref.current.position.y;
            ref.current.rotation.x = -yDiff * 0.8;
        }
    });

    return (
        <group ref={ref} position={[0, 0, 0]}>
            <Trail width={1.5} color="#00ffff" length={4} decay={1}>
                {selectedShip === 'speedster' && (
                    <mesh rotation={[0, 0, -Math.PI / 2]}>
                        <coneGeometry args={[0.5, 2, 8]} />
                        <meshStandardMaterial color="#ff0055" roughness={0.4} metalness={0.6} />
                    </mesh>
                )}
                {selectedShip === 'tank' && (
                    <mesh>
                        <boxGeometry args={[1.5, 0.8, 1.5]} />
                        <meshStandardMaterial color="#00ff00" roughness={0.8} metalness={0.2} />
                    </mesh>
                )}
                {(selectedShip === 'balanced' || !selectedShip) && (
                    <mesh>
                        <boxGeometry args={[1, 0.4, 2]} />
                        <meshStandardMaterial color="#00ffff" roughness={0.2} metalness={0.8} />
                        <mesh position={[0, 0, 1.2]}>
                            <boxGeometry args={[0.2, 0.2, 0.5]} />
                            <meshBasicMaterial color="orange" />
                        </mesh>
                    </mesh>
                )}
            </Trail>
        </group>
    );
};



const GameScene = () => {
    return (
        <Canvas camera={{ position: [0, 4, 10], fov: 60 }} gl={{ antialias: true }}>
            <GameLogic />
            {/* Environment */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 5]} intensity={1} castShadow />
            <pointLight position={[0, 5, 0]} intensity={2} color="purple" distance={20} />

            <Track />
            <Lasers />
            <Enemies />

            <Ship />

            {/* Post Processing could be added here later */}
        </Canvas>
    );
};

export default GameScene;
