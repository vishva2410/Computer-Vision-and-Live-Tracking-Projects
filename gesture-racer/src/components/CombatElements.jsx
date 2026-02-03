import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store';
import { Instance, Instances } from '@react-three/drei';

export const Lasers = () => {
    const lasers = useGameStore(state => state.lasers);
    return (
        <group>
            {lasers.map(laser => (
                <mesh key={laser.id} position={[laser.x, laser.y, laser.z]}>
                    <boxGeometry args={[0.2, 0.2, 2]} />
                    <meshBasicMaterial color="#ff00ff" />
                </mesh>
            ))}
        </group>
    );
};

export const Enemies = () => {
    const enemies = useGameStore(state => state.enemies);
    return (
        <group>
            {enemies.map(enemy => (
                <group key={enemy.id} position={[enemy.x, enemy.y, enemy.z]}>
                    {/* Simple Enemy Ship Shape */}
                    <mesh rotation={[0, Math.PI, 0]}>
                        <coneGeometry args={[1, 3, 4]} />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </group>
            ))}
        </group>
    );
};
