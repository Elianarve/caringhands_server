
from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain_community.vectorstores import Chroma

from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv


def query_groq(user_input):
    
    load_dotenv()
    api_key = os.getenv("GROQ_API_KEY")

    # Inicializamos el LLM
    llm = ChatGroq(
        temperature=0,
        api_key=api_key,
        model_name='llama-3.1-70b-versatile'
    )

    # Cargamos embeddings y la vector database Chroma. La construcción de la base de datos se ha realizado previamente
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    persist_directory = "./chroma_db"
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

    # Creamos un retriever para Chroma
    retriever = vectorstore.as_retriever(search_type="mmr", search_kwargs={"k": 5, "fetch_k": 20})

    # Mensajes system y human
    system_template = """ 
    You are a medical expert. You will be asked a question in Spanish, translate precisely to English. 
    Answer the question based on the following context: {context}.
    If the context contains information about the question, do not add anything, note or clarification.
    ONLY if any  information is not available in the context, use your general knowledge but clearly indicate this.
    Once you get the right information, translate your answer to Spanish. Do not respond in English.
    Question: {question}
    Answer:
    """
    # RAG con documentos relevantes de PUBMED, referencia en el sector médico
    
    # Creamos el prompt
    prompt = ChatPromptTemplate.from_template(system_template)

    
    #  RAG chain 
    rag_chain = (
        {
            "context": retriever, 
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    # Respuesta del LLM con  RAG
    def predict(input_text):
        response = rag_chain.invoke(input_text)
        return response

    response = predict(user_input)

    return response




# Crea una instancia de FastAPI
app = FastAPI()

# Define el modelo de datos para la entrada
class Question(BaseModel):
    question: str

# Define la ruta que manejará la pregunta
@app.post("/ask")
async def answer_question(q: Question):
    # Responde a la pregunta específica

    return(query_groq(q.question))


# Ejecutar la aplicación usando Uvicorn:
# uvicorn main:app --reload

