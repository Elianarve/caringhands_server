
from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq


from langchain.embeddings import HuggingFaceEmbeddings
from langchain.schema import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain_community.vectorstores import Chroma

from fastapi import FastAPI
from pydantic import BaseModel


def query_groq(user_input):
    # Set API key for LLM (replace this with environment variable in production)
    api_key = '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'

    # Initialize the language model
    llm = ChatGroq(
        temperature=0,
        api_key=api_key,
        model_name='llama-3.1-70b-versatile'
    )

    # Load embeddings and Chroma vector store
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    persist_directory = "./chroma_db"
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

    # Create retriever from Chroma vector store
    retriever = vectorstore.as_retriever(search_type="mmr", search_kwargs={"k": 5, "fetch_k": 20})

    # Define the system and human messages
    system_template = """ 
    You are a medical expert. You will be asked a question in Spanish, translate precisely to English. 
    Answer the question based on the following context: {context}.
    If the context contains information about the question, do not add anything, note or clarification.
    ONLY if any  information is not available in the context, use your general knowledge but clearly indicate this.
    Once you get the right information, translate your answer to Spanish. Do not respond in English.
    Question: {question}
    Answer:
    """
    
    # Initialize prompt with system and human message
    prompt = ChatPromptTemplate.from_template(system_template)

    
    # Define RAG chain using retriever and prompt
    rag_chain = (
        {
            "context": retriever, 
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    # Function to handle predictions with RAG
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
# Iniciar el servidor desde la terminal con el siguiente comando:
# uvicorn main:app --reload
# Con la aplicación corriendo, ir al navegador e introducir: http://127.0.0.1:8000/docs. Ahi interectuamos con la API

