import cv2
import sys
import face_recognition

stored_image_path = sys.argv[1]

# Load stored image
stored_image = face_recognition.load_image_file(stored_image_path)
stored_encoding = face_recognition.face_encodings(stored_image)[0]

# Start webcam
video_capture = cv2.VideoCapture(0)

matched = False

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    rgb_frame = frame[:, :, ::-1]
    faces = face_recognition.face_encodings(rgb_frame)

    if faces:
        match_results = face_recognition.compare_faces([stored_encoding], faces[0])
        matched = match_results[0]
        break

video_capture.release()
cv2.destroyAllWindows()

if matched:
    print("MATCH")
else:
    print("NO MATCH")

