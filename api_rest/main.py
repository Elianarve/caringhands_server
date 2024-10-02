from fastapi import FastAPI
from pydantic import BaseModel

# Crea una instancia de FastAPI
app = FastAPI()

# Define el modelo de datos para la entrada
class Question(BaseModel):
    question: str

# Define la ruta que manejará la pregunta
@app.post("/ask")
async def answer_question(q: Question):
    # Responde a la pregunta específica
    if q.question.lower() == "hola":
        return {"response": "bien y tú?"}
    else:
        return {"response": "Lo siento, no tengo una respuesta para eso."}

# Ejecutar la aplicación usando Uvicorn:
# Iniciar el servidor desde la terminal con el siguiente comando:
# uvicorn main:app --reload
# Con la aplicación corriendo, ir al navegador e introducir: http://127.0.0.1:8000/docs. Ahi interectuamos con la API

