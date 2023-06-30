FROM python:3.9-slim-buster

# Set the working directory in the container
# WORKDIR /app

# Copy the requirements file into the container
COPY . /app
WORKDIR /app
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the server script and database file into the container
# COPY server.py crypto_exchange.db ./

# Expose the port that the server will listen on
EXPOSE 893

# Run the server script when the container starts
CMD ["python", "app.py"]
