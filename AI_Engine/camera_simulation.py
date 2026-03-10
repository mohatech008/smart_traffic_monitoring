import requests
import time
import random
import datetime

# Configuration
API_URL = "http://localhost:5000/api/incidents/report"
LOCATIONS = ["Mombasa Road", "Thika Superhighway", "Ngong Road", "Langata Road", "Waiyaki Way"]
INCIDENT_TYPES = ["accident", "congestion", "roadblock"]
SEVERITIES = ["low", "medium", "high", "critical"]

def generate_incident():
    """Generates a random traffic incident"""
    incident = {
        "type": random.choice(INCIDENT_TYPES),
        "location": random.choice(LOCATIONS),
        "severity": random.choice(SEVERITIES),
        "description": f"Automated detection by Camera ID-{random.randint(100, 999)}"
    }
    return incident

def start_camera():
    print("AI Traffic Camera Started...")
    print(f"Connecting to Backend at: {API_URL}")
    print("------------------------------------------------")

    while True:
        # 1. Generate Data
        data = generate_incident()
        
        try:
            # 2. Send Data to Node.js Backend
            response = requests.post(API_URL, json=data)
            
            if response.status_code == 201:
                timestamp = datetime.datetime.now().strftime("%H:%M:%S")
                print(f"[{timestamp}] Sent: {data['type'].upper()} at {data['location']} ({data['severity']})")
            else:
                print(f"Error: Server returned {response.status_code}")

        except Exception as e:
            print(f"Connection Failed: Is the Node Server running? {e}")

        # 3. Wait for 10 seconds before next detection
        time.sleep(10)

if __name__ == "__main__":
    start_camera()