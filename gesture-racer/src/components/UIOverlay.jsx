import React from 'react';
import { useGameStore } from '../store';

const UIOverlay = () => {
    const phase = useGameStore(state => state.phase);
    const score = useGameStore(state => state.score);
    const startGame = useGameStore(state => state.startGame);
    const resetGame = useGameStore(state => state.resetGame);
    const selectedCity = useGameStore(state => state.selectedCity);
    const useStore = useGameStore; // shortcut

    const selectedShip = useGameStore(state => state.selectedShip);

    const isHandDetected = useGameStore(state => state.isHandDetected);
    const gesture = useGameStore(state => state.gesture);

    const selectCity = (city) => useStore.setState({ selectedCity: city });

    if (phase === 'menu') {
        return (
            <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.7)' }}>
                <div className="ui-layer" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '4rem', margin: 0, color: '#0ff', textShadow: '0 0 20px #0ff' }}>GESTURE RACER</h1>
                    <p>Control the ship with your hand. Move Left/Right to steer.</p>

                    <div style={{ margin: '20px 0' }}>
                        <h3>SELECT SHIP</h3>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {['speedster', 'balanced', 'tank'].map(ship => (
                                <button
                                    key={ship}
                                    onClick={() => useStore.setState({ selectedShip: ship })}
                                    style={{
                                        padding: '10px 20px',
                                        background: selectedShip === ship ? '#fff' : '#222',
                                        color: selectedShip === ship ? '#000' : '#fff',
                                        border: '1px solid #fff',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {ship}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <h3>SELECT SECTOR</h3>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {['neon_city', 'mars_colony', 'retro_grid'].map(city => (
                                <button
                                    key={city}
                                    onClick={() => selectCity(city)}
                                    style={{
                                        padding: '10px 20px',
                                        background: selectedCity === city ? '#fff' : '#222',
                                        color: selectedCity === city ? '#000' : '#fff',
                                        border: '1px solid #fff',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {city.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p style={{ color: isHandDetected ? '#0f0' : '#f00' }}>
                        {isHandDetected ? "HAND DETECTED - READY" : "Looking for hand..."}
                    </p>

                    <button
                        disabled={!isHandDetected}
                        onClick={startGame}
                        style={{
                            fontSize: '2rem',
                            padding: '15px 40px',
                            background: isHandDetected ? '#0f0' : '#555',
                            color: isHandDetected ? '#000' : '#888',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: isHandDetected ? 'pointer' : 'not-allowed',
                            marginTop: '20px'
                        }}
                    >
                        START ENGINE
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'victory') {
        return (
            <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.8)' }}>
                <div className="ui-layer" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '5rem', color: 'gold', textShadow: '0 0 30px gold' }}>MISSION COMPLETE</h1>
                    <h2 style={{ color: '#fff' }}>FINAL SCORE: {Math.floor(score)}</h2>
                    <p>The Galaxy is safe thanks to your piloting!</p>
                    <div style={{ fontSize: '3rem', margin: '20px' }}>🚀 🌟 🏆</div>
                    <button
                        onClick={resetGame}
                        style={{
                            fontSize: '1.5rem',
                            padding: '10px 30px',
                            background: '#fff',
                            color: '#000',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        PLAY AGAIN
                    </button>
                </div>
            </div>
        );
    }

    // Playing HUD
    return (
        <div className="ui-overlay" style={{ justifyContent: 'space-between', padding: '20px' }}>
            <div className="ui-layer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ margin: 0 }}>SCORE: {Math.floor(score)}</h2>
                    <div style={{ color: '#aaa', fontSize: '0.8rem' }}>SECTOR: {selectedCity.replace('_', ' ').toUpperCase()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#ff00ff' }}>
                        GESTURE: {gesture.toUpperCase()}
                    </div>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: isHandDetected ? '#0f0' : '#f00',
                        display: 'inline-block',
                        marginRight: '5px'
                    }} />
                    <span>SYSTEM STATUS</span>
                </div>
            </div>
        </div>
    );
};

export default UIOverlay;
