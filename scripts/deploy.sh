#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

[ -f .env.production ] && cp .env.production /tmp/env.auth.lucasbrum

git clean -fxd

[ -f /tmp/env.auth.lucasbrum ] && cp /tmp/env.auth.lucasbrum .env.production
cp .env.production .env

sudo /usr/bin/systemctl stop auth.lucasbrum.dev.service

sudo /bin/bash scripts/db/drop.sh
sudo /bin/bash scripts/db/create.sh

bun install
bun run build

bun run db:push
bun run db:generate
bun run db:seed

sudo /usr/bin/systemctl start auth.lucasbrum.dev.service