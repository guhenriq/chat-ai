import os
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_mongodb import MongoDBChatMessageHistory

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

history = MongoDBChatMessageHistory('mongodb://root:password@localhost:27017/', '2')

class ChatBody(BaseModel):
    message: str

@app.post('/chat')
def chat(body: ChatBody):
    llm = ChatGroq(model='gemma2-9b-it', max_tokens=1024)

    print(history.messages)

    history.add_user_message(body.message)

    # prompt = [
    #     ('system', """
    #         You are a greatest AI assistant in the world. 
    #         You must identify in which language this message is being sent and respond in the same language.
    #         You not must inform the language you are using.
    #         You must only use the language that the user is using.
    #      """),
    #     ('human', body.message),
    # ]
    response = llm.invoke([message.content for message in history.messages])

    history.add_ai_message(response.content)

    return response

if __name__ == '__main__':
    uvicorn.run('__main__:app', host=API_HOST, port=int(API_PORT), reload=True)