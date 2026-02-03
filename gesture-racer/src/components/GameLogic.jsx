import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store';
import { useEffect, useRef } from 'react';

const GameLogic = () => {
    const phase = useGameStore(state => state.phase);
    const setScore = useGameStore(state => state.setScore);
    const score = useGameStore(state => state.score);
    const setPhase = useGameStore(state => state.setPhase);
    const setHandDetected = useGameStore(state => state.setHandDetected); // Actually set in HandController

    // Game Constants
    const WIN_SCORE = 2000;

    const lasers = useGameStore(state => state.lasers);
    const enemies = useGameStore(state => state.enemies);
    const updateLasers = useGameStore(state => state.updateLasers);
    const updateEnemies = useGameStore(state => state.updateEnemies);
    const gesture = useGameStore(state => state.gesture);
    const handPosition = useGameStore(state => state.handPosition);
    const addLaser = useGameStore(state => state.addLaser);
    const spawnEnemy = useGameStore(state => state.spawnEnemy);

    // Refs for throttling
    const lastShot = useRef(0);
    const lastEnemySpawn = useRef(0);

    useFrame((state, delta) => {
        if (phase === 'playing') {
            const time = state.clock.elapsedTime;

            // Shooting Logic - Unlimited Auto-fire if fist held
            if (gesture === 'fist' && time - lastShot.current > 0.15) { // Faster fire rate
                lastShot.current = time;
                addLaser({
                    id: Math.random(),
                    x: handPosition.x * 12, // Match new physics range
                    y: handPosition.y * 7,
                    z: 0
                });
            }

            // Move Lasers
            const movedLasers = lasers.map(l => ({ ...l, z: l.z - 30 * delta })).filter(l => l.z > -100);
            updateLasers(movedLasers);

            // Spawn Enemies with diverse paths
            if (time - lastEnemySpawn.current > 1.5) { // Spawn faster (1.5s)
                lastEnemySpawn.current = time;
                const startX = (Math.random() - 0.5) * 40; // Wide spawn
                spawnEnemy({
                    id: Math.random(),
                    x: startX,
                    y: (Math.random() - 0.5) * 10 + 5,
                    z: -120,
                    drift: -startX * 0.02 // Drift towards center
                });
            }

            // Move Enemies with curve
            let movedEnemies = enemies.map(e => ({
                ...e,
                z: e.z + 25 * delta, // Faster enemies
                x: e.x + (e.drift || 0)
            }));

            // Collision Detection (Laser vs Enemy)
            movedLasers.forEach(laser => {
                movedEnemies.forEach(enemy => {
                    const dx = laser.x - enemy.x;
                    const dy = laser.y - enemy.y;
                    const dz = laser.z - enemy.z;
                    if (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5 && Math.abs(dz) < 2) {
                        // HIT!
                        // Remove enemy
                        enemy.dead = true;
                        // Add Score
                        setScore(useGameStore.getState().score + 500);
                    }
                });
            });

            // Cleanup dead or passed enemies
            movedEnemies = movedEnemies.filter(e => !e.dead && e.z < 10);
            updateEnemies(movedEnemies);

            // Increment score based on time
            const newScore = score + (delta * 100);
            setScore(newScore);

            if (newScore >= WIN_SCORE) {
                setPhase('victory');
            }
        }
    });

    return null;
};

export default GameLogic;
