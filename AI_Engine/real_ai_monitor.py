import cv2
from ultralytics import YOLO
import requests
import time
import os
import random 

# --- CONFIGURATION ---
script_dir = os.path.dirname(os.path.abspath(__file__))
VIDEO_PATH = os.path.join(script_dir, "traffic_video.mp4") 

# Use Environment Variable for Backend URL, fallback to localhost for testing
BACKEND_BASE_URL = os.environ.get("BACKEND_URL", "http://localhost:5000")
API_URL = f"{BACKEND_BASE_URL}/api/incidents/report"

CONGESTION_THRESHOLD = 15  
ALERT_COOLDOWN = 15 

LOCATIONS = [
    "Mombasa Road (Near Airport)", 
    "Thika Superhighway (Survey)", 
    "Waiyaki Way (Westlands)", 
    "Langata Road (T-Mall)", 
    "Ngong Road (Junction)"
]

# Load AI
print("Loading AI Model...")
model = YOLO("yolov8n.pt") 

cap = cv2.VideoCapture(VIDEO_PATH)
last_alert_time = 0

def send_alert(alert_type, severity, description):
    """Helper function to send data to Node.js"""
    location = random.choice(LOCATIONS) 
    
    incident_data = {
        "type": alert_type,
        "location": location,
        "severity": severity,
        "description": description
    }
    
    try:
        print(f"Sending {alert_type.upper()} at {location} to {API_URL}...")
        requests.post(API_URL, json=incident_data)
        print("Alert Sent Successfully!")
    except Exception as e:
        print(f"API Error: {e}")

print("\n" + "="*50)
print("AI Cloud Traffic Monitor Started in Background.")
print("GUI and Manual Keyboard Triggers are DISABLED for cloud deployment.")
print("="*50 + "\n")

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("Video ended. Restarting video loop...")
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0) 
        continue

    # 1. Run YOLO Detection
    results = model(frame, stream=True)
    vehicle_count = 0
    
    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls = int(box.cls[0])
            if cls in [2, 5, 7]: # cars, buses, trucks
                vehicle_count += 1

    # 2. AUTOMATIC Congestion Detection
    current_time = time.time()
    if vehicle_count > CONGESTION_THRESHOLD:
        print(f"HIGH TRAFFIC DETECTED: {vehicle_count} vehicles.")
        
        if current_time - last_alert_time > ALERT_COOLDOWN:
            send_alert("congestion", "high", f"AI Detected high density: {vehicle_count} vehicles.")
            last_alert_time = current_time

    # NOTE: cv2.imshow() and cv2.waitKey() have been REMOVED.
    # They will cause fatal crashes on Render.

cap.release()
print("Process Terminated.")