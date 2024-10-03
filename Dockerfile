FROM python:3.11-slim




WORKDIR /app

# instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Exporner Uvicorn
EXPOSE 8000

# Lanzar aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000",  "--workers", "2", "--proxy-headers", "--forwarded-allow-ips", "*"]
