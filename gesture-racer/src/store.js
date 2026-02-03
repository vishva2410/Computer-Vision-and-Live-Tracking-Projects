import { create } from 'zustand';

export const useGameStore = create((set) => ({
  // Game Phase: 'menu', 'playing', 'gameover', 'victory'
  phase: 'menu',

  // Selection
  selectedShip: 'speedster', // 'speedster', 'tank', 'balanced'
  selectedCity: 'neon_city', // 'neon_city', 'mars_colony', 'retro_grid'

  // Gameplay State
  score: 0,
  health: 100,
  distance: 0,
  speed: 0,

  // Combat State
  lasers: [], // { id, x, y, z }
  enemies: [], // { id, x, y, z, active }
  lastShotTime: 0,

  // Hand Input (Normalized -1 to 1)
  handPosition: { x: 0, y: 0 },
  isHandDetected: false,
  gesture: 'none', // 'none', 'fist', 'open_palm'

  // Actions
  addLaser: (laser) => set((state) => ({ lasers: [...state.lasers, laser] })),
  removeLaser: (id) => set((state) => ({ lasers: state.lasers.filter(l => l.id !== id) })),
  updateLasers: (newLasers) => set({ lasers: newLasers }),

  spawnEnemy: (enemy) => set((state) => ({ enemies: [...state.enemies, enemy] })),
  removeEnemy: (id) => set((state) => ({ enemies: state.enemies.filter(e => e.id !== id) })),
  updateEnemies: (newEnemies) => set({ enemies: newEnemies }),

  setPhase: (phase) => set({ phase }),
  setScore: (score) => set({ score }),
  setHealth: (health) => set({ health }),
  setHandPosition: (x, y) => set({ handPosition: { x, y } }),
  setHandDetected: (isDetected) => set({ isHandDetected: isDetected }),
  setGesture: (gesture) => set({ gesture }),
  startGame: () => set({ phase: 'playing', score: 0, health: 100, distance: 0, speed: 1.0 }),
  resetGame: () => set({ phase: 'menu', score: 0, health: 100, distance: 0 }),
}));
