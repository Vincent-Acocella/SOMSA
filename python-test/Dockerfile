FROM python:3.8
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY . /app
# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt && \
pip install https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow_gpu-2.3.0-cp38-cp38-manylinux2010_x86_64.whl
# Make port 8000 available to the world outside this container
EXPOSE 8000
# Run app.py when the container launches
