# #!/usr/bin/env bash

# CONTAINER_NAME="devapp-mongodb"
# DATABASE_NAME="devapp"

# docker container stop $CONTAINER_NAME
# docker container rm $CONTAINER_NAME

# mkdir -p .vol-data.mongo

# docker run -d \
#   --rm -it \
#   --name $CONTAINER_NAME \
#   -v ./.vol-data.mongo:/data/db \
#   -p 27017:27017 \
#   -e MONGO_INITDB_ROOT_USERNAME=user \
#   -e MONGO_INITDB_ROOT_PASSWORD=pass \
#   -e MONGO_INITDB_DATABASE=$DATABASE_NAME \
#   mongo:6.0

CONTAINER_NAME=dev_pg

docker container stop $CONTAINER_NAME
docker container rm $CONTAINER_NAME

docker run -d \
  --rm -it \
  --name $CONTAINER_NAME \
  -v ./postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  -e POSTGRES_USER=user1 \
  -e POSTGRES_PASSWORD=user1 \
  -e POSTGRES_DB=user1 \
  postgres:latest
