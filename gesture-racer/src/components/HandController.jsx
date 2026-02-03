import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { useGameStore } from '../store';

const HandController = () => {
    const videoRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    const setHandPosition = useGameStore((state) => state.setHandPosition);
    const setHandDetected = useGameStore((state) => state.setHandDetected);
    const setGesture = useGameStore((state) => state.setGesture);

    useEffect(() => {
        let handLandmarker;
        let animationFrameId;

        const setupMediaPipe = async () => {
            try {
                console.log("Initializing MediaPipe...");
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
                );

                handLandmarker = await HandLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 1
                });

                console.log("MediaPipe initialized.");
                setLoaded(true);
                startWebcam();
            } catch (error) {
                console.error("MediaPipe Init Error:", error);
                alert("Failed to load AI Vision: " + error.message);
            }
        };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadeddata', predictWebcam);
                }
            } catch (err) {
                console.error("Error accessing webcam:", err);
            }
        };

        const predictWebcam = () => {
            if (!handLandmarker || !videoRef.current) return;

            const startTimeMs = performance.now();
            if (videoRef.current.videoWidth > 0) { // Ensure video is ready
                const results = handLandmarker.detectForVideo(videoRef.current, startTimeMs);

                if (results.landmarks && results.landmarks.length > 0) {
                    setHandDetected(true);
                    const landmarks = results.landmarks[0];

                    // Use wrist (0) or index finger MCP(5) or Palm center roughly
                    // Let's use landmark 9 (middle finger mcp) as a center point reference
                    const x = landmarks[9].x;
                    const y = landmarks[9].y;

                    // MediaPipe x is 0 (left) to 1 (right). 
                    // We want -1 (left) to 1 (right).
                    // Also, webcam is mirrored usually, so we might need to flip X.
                    // Let's assume mirrored for now: x becomes 1-x.
                    // So: (1-x) * 2 - 1

                    const normalizedX = (1 - x) * 2 - 1;
                    const normalizedY = (1 - y) * 2 - 1; // 0 is top, 1 is buttom. So (1-y)*2-1 maps 0(top) to 1 and 1(bottom) to -1. 
                    // Better: y is 0 at top. We want +1 up, -1 down? Or screen coords?
                    // Usually games: +Y is Up. MediaPipe: 0 is Top.
                    // So (1 - y) * 2 - 1 maps 0->1, 1->-1.

                    setHandPosition(normalizedX, (1 - y) * 2 - 1);

                    // Gesture Detection - Simple Fist Check
                    // Check if fingertips are close to the palm base (wrist)
                    // Landmarks: 0 (wrist), 8 (Index tip), 12 (Middle tip), 16 (Ring tip), 20 (Pinky tip)
                    const wrist = landmarks[0];
                    const tips = [landmarks[8], landmarks[12], landmarks[16], landmarks[20]];

                    // Calculate average distance from tips to wrist
                    let avgDist = 0;
                    tips.forEach(tip => {
                        const d = Math.sqrt(Math.pow(tip.x - wrist.x, 2) + Math.pow(tip.y - wrist.y, 2));
                        avgDist += d;
                    });
                    avgDist /= tips.length;

                    // Threshold: if average distance is small, it's a fist. 
                    // Normalized coords are 0-1, so 0.28 is roughly "closed hand" (relaxed)
                    const isFist = avgDist < 0.28; // Relaxed threshold
                    setGesture(isFist ? 'fist' : 'open_palm');

                    // Auto-fire if fist detected
                    if (isFist) {
                        // Trigger shot in game loop or here? 
                        // Better to just set gesture and let game loop handle firing rate
                    }

                } else {
                    setHandDetected(false);
                }
            }

            animationFrameId = requestAnimationFrame(predictWebcam);
        };

        setupMediaPipe();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(t => t.stop());
            }
            cancelAnimationFrame(animationFrameId);
            if (handLandmarker) handLandmarker.close();
        };
    }, []);

    return (
        <div style={{ position: 'absolute', bottom: 10, right: 10, width: 160, height: 120, zIndex: 1000, pointerEvents: 'none', border: '1px solid white', overflow: 'hidden', opacity: 0.5 }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}
            />
            {!loaded && <div style={{ position: 'absolute', top: 0, left: 0, color: 'white', background: 'black' }}>Loading AI...</div>}
        </div>
    );
};

export default HandController;
