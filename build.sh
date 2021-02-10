#!/usr/bin/env bash
mvn clean package
docker rm -f pg
docker build -t q/pg -f src/main/docker/Dockerfile.jvm .
docker run --rm -p 8081:8080 --name pg q/pg
