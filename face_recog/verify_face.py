
import sys
import cv2
import face_recognition

def verify(stored_img_path):
    try:
        known_image = face_recognition.load_image_file("uploads/" + stored_img_path)
        known_encoding = face_recognition.face_encodings(known_image)[0]

        cap = cv2.VideoCapture(0)
        ret, frame = cap.read()
        cap.release()

        if not ret:
            print("no_camera")
            return

        unknown_encoding = face_recognition.face_encodings(frame)[0]
        results = face_recognition.compare_faces([known_encoding], unknown_encoding)
        print("match" if results[0] else "no_match")

    except:
        print("error")

if __name__ == "__main__":
    verify(sys.argv[1])
