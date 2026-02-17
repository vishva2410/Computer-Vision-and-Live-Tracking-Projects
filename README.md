# Computer Vision & Real-Time Tracking Suite 

[![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![YOLOv11](https://img.shields.io/badge/YOLO-v11-purple?style=for-the-badge&logo=ultralytics)](https://github.com/ultralytics/ultralytics)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tracking-orange?style=for-the-badge&logo=mediapipe)](https://google.github.io/mediapipe/)
[![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-green?style=for-the-badge&logo=opencv)](https://opencv.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com/vishva2410/Computer-Vision-and-Live-Tracking-Projects)

Welcome to the **Computer Vision & Live Tracking Suite**! This repository showcases advanced real-time Human-Computer Interaction (HCI) and biometric analysis projects using state-of-the-art AI models like YOLOv11 and MediaPipe.

---

##  Project Portfolio

### 1. TitanPose Advanced (YOLOv11) 
A high-performance human behavior analysis system designed for gym analytics and safety monitoring. It uses vector geometry to analyze posture and movement in real-time.

*   ** Tech Stack:** `YOLOv11`, `OpenCV`, `NumPy`, `Vector Math`.
*   ** Key Features:**
    *   ** Squat Counter:** Automated exercise tracking using knee flexion analysis.
    *   ** Fall Detection:** Real-time monitoring of spinal inclination with "Red Alert" HUD.
    *   **Cyberpunk HUD:** Futuristic overlay with FPS logging and system status.
*   ** Entry Point:** [`main.py`](./main.py)

####  Logic Flow
```mermaid
graph TD
    A[Start Webcam] --> B[Capture Frame]
    B --> C[YOLOv11 Pose Detection & Tracking]
    C --> D{Person Detected?}
    D -- Yes --> E[Extract Keypoints]
    E --> F[Calculate Torso Inclination]
    E --> G[Calculate Knee Angle]
    F --> H{Inclination > 45°?}
    H -- Yes --> I[Trigger Fall Alert]
    G --> K{Knee Angle < 110°?}
    K -- Yes --> L[State: DOWN]
    K -- No --> M{Angle > 160° & Prev State: DOWN?}
    M -- Yes --> N[Increment Squat Count & State: UP]
    I --> P[Draw Cyberpunk HUD]
    L --> P
    N --> P
    P --> Q[Display Frame]
    Q --> B
    D -- No --> P
```

---

### 2. Hand Gesture Recognition 
A lightweight gesture control system that tracks 21 hand landmarks to identify specific poses and directional movement.

*   ** Tech Stack:** `MediaPipe Hands`, `OpenCV`.
*   ** Key Features:**
    *   **Real-time Tracking:** Low-latency detection of single/multiple hands.
    *   **Pose Logic:** Geometric analysis to distinguish "Open Palm" vs "Fist".
*   ** Entry Point:** [`hand_gesture.py`](./hand_gesture.py)

---

### 3. Gesture Racer 3D 
An immersive web-based infinite racing game where you control a spaceship using hand gestures.

*   ** Tech Stack:** `Three.js` (R3F), `MediaPipe` (Web), `React`, `Zustand`.
*   ** Key Features:**
    *   **Hand Steering:** Move palm to fly the spaceship.
    *   **Combat:** Close your hand into a **FIST** to shoot lasers.
    *   **Procedural World:** Infinite cities and dynamic enemy encounters.
*   ** Location:** [`/gesture-racer`](./gesture-racer)

####  Game Flow
```mermaid
graph TD
    A[Start Game] --> B[Access Webcam]
    B --> C[MediaPipe Hand Tracking]
    C --> D{Hand Detected?}
    D -- Yes --> E[Analyze Hand Pose]
    E --> F{Palm Open?}
    F -- Yes --> G[Steer Spaceship]
    E --> H{Fist?}
    H -- Yes --> I[Fire Lasers]
    G --> J[Update 3D Scene - Three.js]
    I --> J
    J --> K[Render Frame]
    K --> B
    D -- No --> J
```

---

##  Installation & Setup

### Prerequisites
*   Python 3.11+
*   Node.js (for Gesture Racer)

### 1. Clone the Repository
```bash
git clone https://github.com/vishva2410/Computer-Vision-and-Live-Tracking-Projects.git
cd Computer-Vision-and-Live-Tracking-Projects
```

### 2. Python Setup (TitanPose & Hand Gesture)
```bash
pip install -r requirements.txt
```

### 3. Web Setup (Gesture Racer)
```bash
cd gesture-racer
npm install
npm run dev
```

---

##  How to Run

**Run TitanPose Body Tracker:**
```bash
python main.py
```

**Run Hand Gesture Tracker:**
```bash
python hand_gesture.py
```

---
**Author:** [Vishva](https://github.com/vishva2410)
**Focus:** Real-time Human-Computer Interaction (HCI) & Biometric Analysis.
