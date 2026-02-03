<<<<<<< HEAD
# 👁️ Computer Vision & Live Tracking Projects

![Python](https://img.shields.io/badge/Python-3.11-blue)
![YOLOv11](https://img.shields.io/badge/YOLO-v11-purple)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Tracking-orange)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

**Author:** Vishva  
**Focus:** Real-time Human-Computer Interaction (HCI) & Biometric Analysis.

---

## 📂 Project Portfolio

### 1. [TitanPose Advanced (YOLOv11)](./TitanFocus_YOLO) ⚡
**Military-Grade Human Behavior Analysis System.** A high-performance tracking engine designed for gym analytics and safety monitoring. unlike standard trackers, this uses vector geometry to analyze specific spinal and knee angles in real-time.

* **🧠 Tech Stack:** `YOLOv11` (Ultralytics), `OpenCV`, `Vector Math`, `NumPy`.
* **🔥 Key Features:**
    * **🏋️ Squat Counter:** Tracks knee flexion/extension (Up/Down logic) for automated exercise counting.
    * **🚨 Fall Detection:** Monitors spinal inclination; triggers a "Red Alert" HUD if a fall is detected (>45° tilt).
    * **🖥️ Cyberpunk HUD:** Custom-drawn futuristic overlay with high-contrast visibility and FPS logging.
* **📍 Location:** `TitanFocus_YOLO/main.py`

### 2. [Hand Gesture Recognition](./Hand_Gesture_Recognition) 🖐️
**Touchless Virtual Interface Prototype.** A lightweight gesture control system capable of tracking 21 hand landmarks to identify specific poses. Ideal for kiosk control or sign language translation.

* **🧠 Tech Stack:** `MediaPipe Hands`, `OpenCV`.
* **✨ Key Features:**
    * **Real-time Tracking:** Low-latency detection of single/multiple hands.
    * **Gesture Logic:** Geometric analysis to distinguish "Open Palm," "Fist," and directional pointing.
* **📍 Location:** `Hand_Gesture_Recognition/hand_gesture.py`

---

## 🛠️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/vishva2410/Computer-Vision-and-Live-Tracking-Projects.git](https://github.com/vishva2410/Computer-Vision-and-Live-Tracking-Projects.git)
    cd Computer-Vision-and-Live-Tracking-Projects
    ```

2.  **Install Dependencies**
    This repo supports both YOLO (TitanPose) and MediaPipe (Hand Gesture).
    ```bash
    pip install opencv-python numpy ultralytics mediapipe
    ```

## 🚀 How to Run

**To run the Advanced Body Tracker:**
```bash
python TitanFocus_YOLO/main.py
=======
# Gesture Racer 🚀

A 3D immersive racing game controlled entirely by hand movements using your webcam. Built with React, Three.js (R3F), and MediaPipe.

## 🎮 How to Play
1.  **Allow Camera Access**: The game needs to see your hand.
2.  **Steer**: Move your open palm to fly the ship.
3.  **Shoot**: **Make a FIST** to fire lasers at enemies.
    - **Hold Fist** for rapid fire!

## 🌟 Features
- **Hand Tracking**: Control the ship without a mouse or keyboard.
- **Combat System**: Dogfight against smart enemies that flank and attack.
- **3D World**: Infinite procedural track with multiple City Themes (Neon, Mars, Retro).
- **Customization**: Select from 3 unique spaceships.

## 🛠️ Tech Stack
- **React + Vite**
- **Three.js / React Three Fiber**: 3D Rendering.
- **MediaPipe Tasks Vision**: Real-time hand tracking.
- **Zustand**: State management.

## 🚀 Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/vishva2410/Computer-Vision-and-Live-Tracking-Projects.git
    ```
2.  Navigate to the folder:
    ```bash
    cd gesture-racer
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run local server:
    ```bash
    npm run dev
    ```
>>>>>>> 6bb3f66 (Initial commit of Gesture Racer game)
