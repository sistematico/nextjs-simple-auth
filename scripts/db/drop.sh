#!/usr/bin/env bash

source "$(dirname "$0")/../other/read_env.sh"

PGPASSWORD="$DB_PASS"
[ $1 ] && PGPASSWORD="$1"
export PGPASSWORD

if [ -f /etc/arch-release ] || [ "$(sw_vers -productName 2> /dev/null)" == "macOS" ]; then
    CTRL_USER="$DB_USER"
else 
    CTRL_USER="postgres"
fi

echo "🚨 ATENÇÃO: Apagando banco de dados '$DB_NAME'"
# read -p "Pressione ENTER para continuar ou CTRL+C para cancelar..." -r

echo "🔄 Desconectando usuários..."
# sudo -u postgres psql -f scripts/db/disconnect.sql
sudo -u postgres psql -v username="$DB_USER" -v password="$DB_PASSWORD" -v dbname="$DB_NAME" -f scripts/db/disconnect.sql
# psql -v username="$DB_USER" -v password="$DB_PASSWORD" -v dbname="$DB_NAME" -f scripts/db/disconnect.sql

# Apaga e recria o banco
echo "🗑️ Apagando banco de dados..."
# psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"
sudo -u postgres psql -v username="$DB_USER" -v password="$DB_PASSWORD" -v dbname="$DB_NAME" -f scripts/db/disconnect.sql

echo "🔄 Recriando banco de dados..."
# psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "CREATE DATABASE \"$DB_NAME\" WITH OWNER = \"$DB_USER\";"
# psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "CREATE DATABASE \"$DB_NAME\" WITH OWNER = \"$DB_USER\";"
sudo -u postgres psql -h "$DB_HOST" -p "$DB_PORT" -U "$CTRL_USER" -c "CREATE DATABASE \"$DB_NAME\" WITH OWNER = \"$DB_USER\";"
echo "✅ Banco '$DB_NAME' recriado com sucesso."