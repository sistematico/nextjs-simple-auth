#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

[ -f .env.production ] && cp .env.production /tmp/env.auth.lucasbrum

git clean -fxd

[ -f /tmp/env.auth.lucasbrum ] && cp /tmp/env.auth.lucasbrum .env.production
sudo /usr/bin/systemctl stop auth.lucasbrum.dev.service

bash scripts/db/drop.sh
bash scripts/db/create.sh

bun install
bun run build

sudo /usr/bin/systemctl start auth.lucasbrum.dev.service