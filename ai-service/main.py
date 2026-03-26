from fastapi import FastAPI, UploadFile, File, HTTPException
from insightface.app import FaceAnalysis
import cv2
import numpy as np
from db import users_collection
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


face_app = FaceAnalysis(name='buffalo_l')
face_app.prepare(ctx_id=-1)



def read_image(file) -> np.ndarray:
    contents = file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img



def get_embedding(img):
    faces = face_app.get(img)

    if len(faces) == 0:
        return None

    return faces[0].embedding 


@app.post("/register-face")
def register_face(name: str, file: UploadFile = File(...)):
    img = read_image(file.file)
    embedding = get_embedding(img)

    if embedding is None:
        raise HTTPException(status_code=400, detail="No face detected")

    user = {
        "name": name,
        "embedding": embedding.tolist()
    }

    users_collection.insert_one(user)

    return {"message": "User registered successfully"}


@app.post("/login-face")
def login_face(file: UploadFile = File(...)):
    img = read_image(file.file)
    embedding = get_embedding(img)

    if embedding is None:
        raise HTTPException(status_code=400, detail="No face detected")

    users = list(users_collection.find())

    for user in users:
        stored_embedding = np.array(user["embedding"]).reshape(1, -1)
        input_embedding = embedding.reshape(1, -1)

        similarity = cosine_similarity(input_embedding, stored_embedding)[0][0]

        if similarity > 0.5:  
            return {
                "message": "Login successful",
                "user": user["name"],
                "similarity": float(similarity)
            }

    raise HTTPException(status_code=401, detail="Face not recognized")