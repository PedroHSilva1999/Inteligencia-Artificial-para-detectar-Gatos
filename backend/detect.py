from ultralytics import YOLO
import json
import sys
import cv2
import base64
import os

def detect_cats(image_path):
    model = YOLO('yolov8n.pt')
    
    results = model(image_path, verbose=False)
    
    img = cv2.imread(image_path)
    
    detections = []
    for result in results:
        boxes = result.boxes
        for box in boxes:
            if box.cls.item() == 15:  
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                confidence = float(box.conf.item())
                
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 0, 255), 2)
                
                text = f'Cat: {confidence:.2f}'
                cv2.putText(img, text, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
                
                detections.append({
                    "class": "cat",
                    "confidence": confidence,
                    "bbox": [x1, y1, x2, y2]
                })
    
    output_path = image_path.replace('.', '_detected.')
    cv2.imwrite(output_path, img)
    
    with open(output_path, 'rb') as img_file:
        img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
    
    os.remove(output_path)
    
    result = {
        "detections": detections,
        "image": img_base64
    }
    print(json.dumps(result), flush=True)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python detect.py --source <caminho_da_imagem> --weights <caminho_dos_pesos>")
        sys.exit(1)
    
    image_path = sys.argv[2]
    detect_cats(image_path) 