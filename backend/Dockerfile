FROM python:3.11.10-bullseye

RUN apt-get update -y && apt-get upgrade -y

ENV HOME=/app/chat-ai

ENV API_PORT=8000

ENV API_HOST=0.0.0.0

WORKDIR $HOME/backend

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

EXPOSE ${API_PORT}

CMD ["python", "main.py"]