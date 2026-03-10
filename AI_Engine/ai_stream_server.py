from flask import Flask, Response
import cv2
from ultralytics import YOLO
import requests
import time

app = Flask(__name__)

# CONFIGURATION
API_URL = "http://localhost:5000/api/incidents/report"
CONGESTION_THRESHOLD = 10  
ALERT_COOLDOWN = 15 
VIDEO_PATH = "traffic_video.mp4" 

# Load AI
model = YOLO("yolov8n.pt")

# Global variables
last_alert_time = 0

def generate_frames():
    global last_alert_time
    
    # Load the video file
    cap = cv2.VideoCapture(VIDEO_PATH)

    if not cap.isOpened():
        print(f"Error: Could not open video file '{VIDEO_PATH}'.")
        print("Make sure the file is in the same folder as this script!")
        return

    while True:
        success, frame = cap.read()
        
        #VIDEO LOOPING LOGIC
        if not success:
            print("Video ended. Looping back to start...")
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        try:
            # 1. Run Detection 
            results = model(frame, conf=0.25, stream=True)
            vehicle_count = 0

            # 2. Draw Boxes & Count
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    cls = int(box.cls[0])
                    # 2=car, 3=motorcycle, 5=bus, 7=truck
                    if cls in [2, 3, 5, 7]: 
                        vehicle_count += 1
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # 3. Handle Alerts
            color = (0, 255, 0)
            status_text = "FLOW: NORMAL"

            if vehicle_count > CONGESTION_THRESHOLD:
                color = (0, 0, 255)
                status_text = "ALERT: CONGESTION"
                
                current_time = time.time()
                if current_time - last_alert_time > ALERT_COOLDOWN:
                    try:
                        incident_data = {
                            "type": "congestion",
                            "location": "Main Highway (Simulation)",
                            "severity": "high",
                            "description": f"AI detected high density: {vehicle_count} vehicles."
                        }
                        requests.post(API_URL, json=incident_data, timeout=1)
                        print(f"Dashboard Updated! Count: {vehicle_count}")
                        last_alert_time = current_time
                    except:
                        print("Backend unreachable. Check if your Node.js server is running.")

            # UI Overlays
            cv2.putText(frame, f"Vehicles: {vehicle_count}", (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
            cv2.putText(frame, status_text, (30, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

            # 4. Encode & Stream
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret: continue
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

        except Exception as e:
            print(f"Error: {e}")
            continue

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    print(f"AI Streamer running on Video File: {VIDEO_PATH}")
    app.run(host='0.0.0.0', port=5001, debug=False)