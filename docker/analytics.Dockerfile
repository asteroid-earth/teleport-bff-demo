FROM python:3.9

WORKDIR /app

COPY backend/analyticsapi/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/analyticsapi/ ./

CMD ["python", "app.py"]