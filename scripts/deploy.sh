#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

if [ -f .env.production ] && [ ! -f .env ]; then 
    cp .env.production /tmp/env.lucasbrum
fi

git clean -fxd

[ -f /tmp/env.lucasbrum ] && cp /tmp/env.lucasbrum .env.production

sudo /usr/bin/systemctl stop lucasbrum
bun install
bun run build
sudo /usr/bin/systemctl start lucasbrum