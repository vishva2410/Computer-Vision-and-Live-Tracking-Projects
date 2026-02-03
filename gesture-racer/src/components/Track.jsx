import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store';
import { Box, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const CITY_THEMES = {
    neon_city: {
        groundColor: '#111',
        buildingColors: ['#0ff', '#f0f', '#ff0', '#00f'],
        fogColor: '#000020'
    },
    mars_colony: {
        groundColor: '#532',
        buildingColors: ['#a44', '#d66', '#833', '#c55'],
        fogColor: '#843'
    },
    retro_grid: {
        groundColor: '#000',
        buildingColors: ['#f0f', '#0ff'], // Wireframes handled via material
        fogColor: '#102'
    }
};

const BuildingBlock = ({ position, color, speed }) => {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.position.z += speed * delta;

            // Reset if behind camera
            if (ref.current.position.z > 10) {
                ref.current.position.z = -100 - Math.random() * 50;
                ref.current.position.x = (Math.random() - 0.5) * 40;
                // Ensure we leave a gap in the middle for the player
                if (Math.abs(ref.current.position.x) < 5) ref.current.position.x += 10 * Math.sign(ref.current.position.x || 1);
            }
        }
    });

    return (
        <Box ref={ref} args={[2, Math.random() * 10 + 5, 2]} position={position}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </Box>
    );
};

const Track = () => {
    const selectedCity = useGameStore(state => state.selectedCity);
    const speed = useGameStore(state => state.speed); // 0 or 1 usually

    // Base speed multiplier
    const currentSpeed = speed * 20;

    // Generate initial buildings
    const buildingCount = 50;
    const buildings = useMemo(() => {
        const temp = [];
        for (let i = 0; i < buildingCount; i++) {
            const x = (Math.random() - 0.5) * 40;
            const finalX = Math.abs(x) < 5 ? x + 10 * Math.sign(x || 1) : x;

            temp.push({
                position: [finalX, 0, -Math.random() * 200],
                color: CITY_THEMES[selectedCity].buildingColors[Math.floor(Math.random() * CITY_THEMES[selectedCity].buildingColors.length)]
            });
        }
        return temp;
    }, [selectedCity]);

    const nature = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 30; i++) {
            const x = (Math.random() - 0.5) * 80;
            // Keep nature on outskirts
            if (Math.abs(x) < 15) continue;

            temp.push({
                position: [x, -1, -Math.random() * 200],
                scale: Math.random() * 2 + 1,
                type: Math.random() > 0.5 ? 'tree' : 'rock'
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[100, 200]} />
                <meshStandardMaterial color={CITY_THEMES[selectedCity].groundColor} />
            </mesh>

            {/* Moving Buildings */}
            {buildings.map((data, i) => (
                <BuildingBlock key={`b-${i}`} position={data.position} color={data.color} speed={currentSpeed} />
            ))}

            {/* Moving Nature */}
            {nature.map((data, i) => (
                <BuildingBlock key={`n-${i}`} position={data.position} color={data.type === 'tree' ? '#0f4' : '#888'} speed={currentSpeed} />
            ))}

            {/* Fog for Immersion */}
            <fog attach="fog" args={[CITY_THEMES[selectedCity].fogColor, 10, 100]} />
        </group>
    );
};

export default Track;
