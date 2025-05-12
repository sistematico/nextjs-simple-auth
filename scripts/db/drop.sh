#!/usr/bin/env bash

source "$(dirname "$0")/../other/read_env.sh"

PGPASSWORD="$DB_PASS"
[ $1 ] && PGPASSWORD="$1"
export PGPASSWORD

if [ -f /etc/arch-release ]; then
    CTRL_USER="$DB_USER"
else 
    CTRL_USER="postgres"
fi

echo "🚨 ATENÇÃO: Apagando banco de dados '$DB_NAME'"
# read -p "Pressione ENTER para continuar ou CTRL+C para cancelar..." -r

echo "🔄 Desconectando usuários..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -d "postgres" -c "
  SELECT pg_terminate_backend(pid) 
  FROM pg_stat_activity 
  WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();
"

# Apaga e recria o banco
echo "🗑️ Apagando banco de dados..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"

echo "🔄 Recriando banco de dados..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "CREATE DATABASE \"$DB_NAME\" WITH OWNER = \"$DB_USER\";"
echo "✅ Banco '$DB_NAME' recriado com sucesso."