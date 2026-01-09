# 🖐️ Hand Gesture Recognition System

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-green)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Hand%20Tracking-orange)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

## 📖 Overview

This project implements a real-time **Hand Gesture Recognition** system using **Google's MediaPipe** framework and **OpenCV**. It detects hand landmarks via a webcam feed, tracks movements, and classifies specific gestures (e.g., Open Palm, Closed Fist, Thumbs Up, etc.) with high accuracy and low latency.

This is a lightweight solution ideal for touchless interfaces, sign language translation prototypes, or human-computer interaction (HCI) research.

## 🚀 Features

* **Real-time Tracking:** Detects single or multiple hands with low latency.
* **21 Landmark Detection:** visualizes the skeletal structure of the hand.
* **Gesture Classification:** Logic to identify specific hand poses.
* **FPS Counter:** Displays real-time frames per second to monitor performance.
* **Robust:** Works reasonably well in varying lighting conditions.

## 🛠️ Tech Stack

* **Language:** Python
* **Computer Vision:** OpenCV (`cv2`)
* **ML Pipeline:** MediaPipe (`mediapipe`)
* **Math:** NumPy (for vector calculations, if applicable)

## ⚙️ Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/repo-name.git](https://github.com/your-username/repo-name.git)
    cd repo-name
    ```

2.  **Create a Virtual Environment (Optional but Recommended)**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install opencv-python mediapipe numpy
    ```

## 🏃 Usage

1.  Connect your webcam.
2.  Run the main script:
    ```bash
    python [your_script_name.py]
    ```
    *(Replace `[your_script_name.py]` with your actual filename, e.g., `main.py` or `hand_gesture.py`)*

3.  **Controls:**
    * Press **'q'** or **'Esc'** to exit the application.

## 🧠 How It Works

1.  **Frame Capture:** OpenCV captures video frames from the webcam.
2.  **RGB Conversion:** Frames are converted from BGR (OpenCV default) to RGB (MediaPipe requirement).
3.  **Processing:** MediaPipe processes the frame to identify hand landmarks.
4.  **Drawing & Logic:**
    * If hands are detected, landmarks are drawn on the frame.
    * The relative coordinates of the fingertips and knuckles are compared to determine the gesture (e.g., if the tip of the index finger is below the knuckle, the finger is folded).
5.  **Display:** The processed frame with overlays is shown to the user.



## 📂 Project Structure

```text
├── [your_script_name.py]    # Main source code
├── requirements.txt         # List of dependencies
├── README.md                # Project documentation
└── output/                  # (Optional) Screenshots or recordings
