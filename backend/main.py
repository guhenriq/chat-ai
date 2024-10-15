import os
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv(override=True)

API_HOST = os.environ.get('API_HOST', '127.0.0.1')
API_PORT = os.environ.get('API_PORT', 8000)

origins = ['*']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatBody(BaseModel):
    message: str

@app.post('/chat')
def chat(body: ChatBody):
    llm = ChatGroq(model='gemma2-9b-it', max_tokens=1024)

    prompt = [
        ('system', 'You are a greatest AI assistant in the world.'),
        ('human', body.message),
    ]
    return llm.invoke(prompt)

if __name__ == '__main__':
    uvicorn.run('__main__:app', host=API_HOST, port=int(API_PORT), reload=True)