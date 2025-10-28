#!/bin/bash

ENV_FILE=".env.production"

if [ -f /etc/arch-release ] || [ "$(sw_vers -productName 2> /dev/null)" == "macOS" ]; then
    [ -f ".env" ] && ENV_FILE=".env"
fi

if [ ! -f "$ENV_FILE" ]; then
    echo "Erro: Arquivo $ENV_FILE não encontrado."
    exit 1
fi

DB_URL=$(grep -E "^DATABASE_URL=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")

POSGRES_USER=$(grep -E "^POSGRES_USER=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
POSGRES_PASS=$(grep -E "^POSGRES_PASS=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")

if [ -z "$DB_URL" ]; then
    echo "Erro: DATABASE_URL não encontrada no arquivo $ENV_FILE."
    exit 1
fi

# Extrai os componentes da string de conexão, formato: postgres://username:password@host:port/database

# Extrai o usuário
DB_USER=$(echo "$DB_URL" | sed -n 's/^postgres:\/\/\([^:]*\):.*/\1/p')

# Extrai a senha
DB_PASS=$(echo "$DB_URL" | sed -n 's/^postgres:\/\/[^:]*:\([^@]*\)@.*/\1/p')

# Extrai o host
DB_HOST=$(echo "$DB_URL" | sed -n 's/^postgres:\/\/[^@]*@\([^:]*\):.*/\1/p')

# Extrai a porta
DB_PORT=$(echo "$DB_URL" | sed -n 's/^postgres:\/\/[^:]*:[^@]*@[^:]*:\([^/]*\)\/.*/\1/p')

# Extrai o nome do banco de dados
DB_NAME=$(echo "$DB_URL" | sed -n 's/^postgres:\/\/[^/]*\/\([^?]*\).*/\1/p')

# App Name
APP_NAME=$(grep -E "^NEXT_PUBLIC_APP_NAME=" "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")

export POSGRES_USER
export POSGRES_PASS

export DB_USER
export DB_PASS
export DB_HOST
export DB_PORT
export DB_NAME
export APP_NAME
export ENV_FILE