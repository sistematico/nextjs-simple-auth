#!/usr/bin/env bash

source "$(dirname "$0")/other/env.sh"

CONTAINER_NAME=lucasbrum-postgres
POSTGRES_VERSION=16
POSTGRES_DB=$DB_NAME
POSTGRES_USER=$DB_USER
POSTGRES_PASS="$DB_PASS"
IMAGE_NAME=postgres:$POSTGRES_VERSION

rm -rf drizzle/meta drizzle/*.sql

function create_image() {
  if podman image exists $IMAGE_NAME && test -f /etc/arch-release; then
    echo "🗑️ Apagando a imagem ${IMAGE_NAME}..."
    podman rmi $IMAGE_NAME
  fi

  if ! podman image exists $IMAGE_NAME; then
    echo "✅ Criando a imagem ${IMAGE_NAME}..."
    podman pull $IMAGE_NAME
  fi
}

function create_container() {
  if podman container exists $CONTAINER_NAME; then
    if podman ps --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
      echo "🛑 parando o container ${CONTAINER_NAME}..."
      podman stop $CONTAINER_NAME
    fi
    echo "🗑️ Apagando o container ${CONTAINER_NAME}..."
    podman rm $CONTAINER_NAME
  fi

  if ! podman container exists $CONTAINER_NAME; then
    echo "✅ Criando o container ${CONTAINER_NAME}..."
    podman run -d \
      --name $CONTAINER_NAME \
      -e POSTGRES_DB=$POSTGRES_DB \
      -e POSTGRES_USER=$POSTGRES_USER \
      -e POSTGRES_PASSWORD=$POSTGRES_PASS \
      -p 5432:5432 \
      $IMAGE_NAME
  fi
}

function run_container() {
  if ! podman ps --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
    echo "🎉 Iniciando o container ${CONTAINER_NAME}..."
    podman start $CONTAINER_NAME
  fi
}

if [ ! $1 ]; then
  create_image
  create_container
  run_container
elif [ "$1" == "-c" ]; then
  create_image
  create_container
fi