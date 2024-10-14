# docker/api.Dockerfile
FROM python:3.9

WORKDIR /app

COPY backend/main_api/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/main_api/ ./

CMD ["python", "app.py"]