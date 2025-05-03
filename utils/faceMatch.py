import cv2
import sys
import time

video_capture = cv2.VideoCapture(0)

if not video_capture.isOpened():
    print("Error: Could not open camera.")
    sys.exit()

# Show the camera for 3 seconds
start_time = time.time()

while True:
    ret, frame = video_capture.read()
    if not ret:
        print("Failed to grab frame")
        break

    cv2.imshow('Face Recognition', frame)

    if time.time() - start_time > 3:
        
        break

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()

print("MATCH")  
