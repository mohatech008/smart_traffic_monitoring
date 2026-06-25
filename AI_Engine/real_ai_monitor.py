import cv2
from ultralytics import YOLO
import requests
import time
import os
import random 

# --- CONFIGURATION ---
script_dir = os.path.dirname(os.path.abspath(__file__))
VIDEO_PATH = os.path.join(script_dir, "traffic_video.mp4") 
BACKEND_BASE_URL = "http://localhost:5000" 

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
    """Helper function to send data to your Cloud Backend"""
    location = random.choice(LOCATIONS) 
    
    incident_data = {
        "type": alert_type,
        "location": location,
        "severity": severity,
        "description": description
    }
    
    try:
        print(f"Sending {alert_type.upper()} at {location} to Cloud Database...")
        response = requests.post(API_URL, json=incident_data)
        if response.status_code in [200, 201]:
            print("Alert Saved to Cloud Successfully!")
        else:
            print(f"Failed to save. Server responded: {response.status_code}")
    except Exception as e:
        print(f"API Error: {e}")

print("\n" + "="*50)
print("AI Traffic Monitor Started (Local Mode connected to Cloud).")
print("="*50)
print("KEYBOARD CONTROLS (CLICK THE VIDEO WINDOW FIRST!):")
print("   [ A ] - Simulate ACCIDENT (Critical)")
print("   [ R ] - Simulate ROADBLOCK (Medium)")
print("   [ C ] - Force CONGESTION Alert (High)")
print("   [ Q ] - Quit")
print("="*50 + "\n")

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0) 
        continue

    # 1. Run YOLO Detection
    results = model(frame, stream=True)
    vehicle_count = 0
    
    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls = int(box.cls[0])
            if cls in [2, 5, 7]:
                vehicle_count += 1
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # 2. Display Count
    cv2.putText(frame, f"Vehicles: {vehicle_count}", (30, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)

    # 3. AUTOMATIC Congestion Detection
    current_time = time.time()
    if vehicle_count > CONGESTION_THRESHOLD:
        cv2.putText(frame, "STATUS: HIGH TRAFFIC", (30, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        
        if current_time - last_alert_time > ALERT_COOLDOWN:
            send_alert("congestion", "high", f"AI Detected high density: {vehicle_count} vehicles.")
            last_alert_time = current_time

    # 4. MANUAL TRIGGERS (Keyboard)
    key = cv2.waitKey(10) & 0xFF
    if key == ord('q') or key == ord('Q'): 
        break
    elif key == ord('a') or key == ord('A'): 
        print(">>> KEY 'A' PRESSED: Accident Detected <<<")
        cv2.putText(frame, "SIMULATING ACCIDENT...", (50, 200), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
        cv2.imshow("FlowSense AI Vision", frame)
        send_alert("accident", "critical", "AI Detected vehicle collision.")
        time.sleep(1)
        
    elif key == ord('r') or key == ord('R'): 
        print(">>> KEY 'R' PRESSED: Roadblock Detected <<<")
        cv2.putText(frame, "SIMULATING ROADBLOCK...", (50, 200), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 165, 255), 3)
        cv2.imshow("FlowSense AI Vision", frame)
        send_alert("roadblock", "medium", "Stationary obstruction detected.")
        time.sleep(1)
        
    elif key == ord('c') or key == ord('C'): 
        print(">>> KEY 'C' PRESSED: Congestion Forced <<<")
        cv2.putText(frame, "FORCING CONGESTION...", (50, 200), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
        cv2.imshow("FlowSense AI Vision", frame)
        send_alert("congestion", "high", f"Manual Traffic Report: {vehicle_count} vehicles.")
        time.sleep(1)
        
    # Show Video
    cv2.imshow("FlowSense AI Vision", frame)
    
cap.release()
cv2.destroyAllWindows()