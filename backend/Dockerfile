# app/Dockerfile

# pull the official docker image
FROM python:3.9.5-slim

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get install gcc libmariadb-dev curl netcat -y

RUN python -m venv /py

# install dependencies
COPY requirements.txt .
RUN /py/bin/pip install -r requirements.txt
ENV PATH="/py/bin:$PATH"

# copy project
COPY . ./app

# set work directory
WORKDIR ../app

# Open up the port the server runs on
EXPOSE 8000

RUN curl -OL https://raw.githubusercontent.com/eficode/wait-for/master/wait-for
RUN chmod +x wait-for
RUN cp wait-for /usr/bin/wait-for
